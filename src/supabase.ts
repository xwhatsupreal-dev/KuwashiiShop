import { v4 as uuidv4 } from 'uuid';

class MockQueryBuilder {
  table: string;
  queryType: 'select' | 'insert' | 'update' | 'upsert' | 'delete' = 'select';
  selectCols: string = '*';
  wheres: { col: string, op: string, val: any }[] = [];
  orderCol: string | null = null;
  orderAsc: boolean = true;
  limitCount: number | null = null;
  dataToInsertOrUpdate: any = null;
  singleRow: boolean = false;
  returnsData: boolean = false;

  countMode: boolean = false;

  constructor(table: string) {
    this.table = table;
  }

  select(cols: string = '*', options?: { count?: string, head?: boolean }) {
    if (this.queryType === 'select') {
       this.queryType = 'select'; // already select
    } else {
       this.returnsData = true; 
    }
    this.selectCols = cols;
    if (options?.count) {
       this.countMode = true;
       this.selectCols = 'COUNT(*) as count';
    }
    return this;
  }

  insert(data: any | any[]) {
    this.queryType = 'insert';
    this.dataToInsertOrUpdate = Array.isArray(data) ? data : [data];
    return this;
  }

  update(data: any) {
    this.queryType = 'update';
    this.dataToInsertOrUpdate = [data]; // Actually just one row usually
    return this;
  }

  upsert(data: any | any[]) {
    this.queryType = 'upsert';
    this.dataToInsertOrUpdate = Array.isArray(data) ? data : [data];
    return this;
  }

  delete() {
    this.queryType = 'delete';
    return this;
  }

  eq(col: string, val: any) { this.wheres.push({ col, op: '=', val }); return this; }
  neq(col: string, val: any) { this.wheres.push({ col, op: '!=', val }); return this; }
  gt(col: string, val: any) { this.wheres.push({ col, op: '>', val }); return this; }
  lt(col: string, val: any) { this.wheres.push({ col, op: '<', val }); return this; }
  gte(col: string, val: any) { this.wheres.push({ col, op: '>=', val }); return this; }
  lte(col: string, val: any) { this.wheres.push({ col, op: '<=', val }); return this; }

  order(col: string, options?: { ascending?: boolean }) {
    this.orderCol = col;
    this.orderAsc = options?.ascending ?? true;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  single() {
    this.singleRow = true;
    this.limitCount = 1;
    return this;
  }

  maybeSingle() {
    this.singleRow = true;
    this.limitCount = 1;
    return this;
  }

  async execute() {
    let sql = '';
    let params: any[] = [];

    const buildWhere = () => {
      if (this.wheres.length === 0) return '';
      const clauses = this.wheres.map(w => {
        params.push(w.val);
        return `${w.col} ${w.op} ?`;
      });
      return ` WHERE ${clauses.join(' AND ')}`;
    };

    if (this.queryType === 'select') {
      sql = `SELECT ${this.selectCols} FROM ${this.table}`;
      sql += buildWhere();
      if (this.orderCol) {
        sql += ` ORDER BY ${this.orderCol} ${this.orderAsc ? 'ASC' : 'DESC'}`;
      }
      if (this.limitCount !== null) {
        sql += ` LIMIT ${this.limitCount}`;
      }
    } else if (this.queryType === 'delete') {
      sql = `DELETE FROM ${this.table}`;
      sql += buildWhere();
    } else if (this.queryType === 'update') {
      const data = this.dataToInsertOrUpdate[0];
      const keys = Object.keys(data);
      const setClauses = keys.map(k => {
        let val = data[k];
        if (val !== null && typeof val === 'object' && !(val instanceof Date)) {
           val = JSON.stringify(val);
        }
        params.push(val);
        return `${k} = ?`;
      });
      sql = `UPDATE ${this.table} SET ${setClauses.join(', ')}`;
      sql += buildWhere();
    } else if (this.queryType === 'insert' || this.queryType === 'upsert') {
      const rows = this.dataToInsertOrUpdate;
      if (rows.length === 0) return { data: [], error: null };
      
      const keys = Object.keys(rows[0]);
      for(let r of rows) {
          if (this.table !== 'profiles' && this.table !== 'system_config' && !r.id) {
              r.id = uuidv4();
          }
      }

      const valuesStrs = rows.map((r: any) => {
        keys.forEach(k => {
          let val = r[k];
          if (val !== null && typeof val === 'object' && !(val instanceof Date)) {
             val = JSON.stringify(val);
          }
          params.push(val);
        });
        return `(${keys.map(() => '?').join(', ')})`;
      });

      sql = `INSERT INTO ${this.table} (${keys.join(', ')}) VALUES ${valuesStrs.join(', ')}`;

      if (this.queryType === 'upsert') {
        const pk = this.table === 'profiles' ? 'username' : 'id';
        const updateSets = keys.filter(k => k !== pk).map(k => `${k} = excluded.${k}`);
        if (updateSets.length > 0) {
           sql += ` ON CONFLICT(${pk}) DO UPDATE SET ${updateSets.join(', ')}`;
        } else {
           sql += ` ON CONFLICT(${pk}) DO NOTHING`;
        }
      }
    }

    if ((this.queryType === 'insert' || this.queryType === 'update' || this.queryType === 'upsert' || this.queryType === 'delete') && this.returnsData) {
      sql += ` RETURNING ${this.selectCols}`;
    }

    try {
      const res = await fetch('/api/d1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql, params })
      });
      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(JSON.stringify(result.error));
      }

      let data = result.data || [];
      if (this.singleRow) {
        if (data.length === 0) return { data: null, error: null, count: 0 };
        return { data: data[0], error: null, count: 0 };
      }
      
      let count = data.length;
      if (this.countMode) { count = data.length > 0 ? (data[0].count || 0) : 0; }
      return { data, error: null, count };
    } catch (error: any) {
      console.error("D1 Query Error:", error);
      return { data: null, error, count: 0 };
    }
  }

  // To make it thenable
  then(onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any) {
    return this.execute().then(onfulfilled, onrejected);
  }
}

export const supabase = {
  from: (table: string) => new MockQueryBuilder(table),
  channel: (name?: string) => ({ on: (event?: any, filter?: any, callback?: any) => ({ subscribe: () => ({}) }) }),
  removeChannel: (channel?: any) => {},
  rpc: (fn: string) => new MockQueryBuilder('rpc') // Ignore RPC for now
};

// Initialize D1 once
fetch('/api/d1/init', { method: 'POST' }).catch(console.error);
