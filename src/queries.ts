import { supabase } from './supabase';
import { StockItem } from './types';

export async function fetchItems() {
  const { data, error } = await supabase.from('items').select('*');
  if (error) {
    console.error('Error fetching items:', error);
    return [];
  }
  if (!data || !Array.isArray(data)) {
    console.warn("fetchItems expected array but got:", data);
    return [];
  }
  return data.map((d: any) => {
    let parsedPool = d.gacha_pool;
    if (typeof d.gacha_pool === 'string') {
      try {
        parsedPool = JSON.parse(d.gacha_pool);
      } catch (e) {
        // Leave as string if not JSON, handled below or it isn't JSON
      }
    }

    let pool = parsedPool;
    let initialQty = d.initial_quantity;
    let pieces = d.pieces_per_unit;
    let accCreds = undefined;
    let pinned = d.is_pinned || false;
    let jsonSaleFormat = undefined;

    if (parsedPool && !Array.isArray(parsedPool) && typeof parsedPool === 'object') {
      pool = parsedPool.pool || undefined;
      accCreds = parsedPool.accountCredentials || undefined;
      jsonSaleFormat = parsedPool.saleFormat;
      if (initialQty === undefined) initialQty = parsedPool.initialQuantity;
      if (pieces === undefined) pieces = parsedPool.piecesPerUnit;
      if (parsedPool.isPinned) pinned = parsedPool.isPinned;
    } else if (typeof parsedPool === 'string') {
       // if it failed to parse and is still a string
       try {
         pool = JSON.parse(parsedPool);
         if (!Array.isArray(pool)) {
            jsonSaleFormat = pool.saleFormat;
            pool = undefined;
         }
       } catch(e) {
         pool = undefined;
       }
    }

    let imgUrls: string[] = [];
    if (d.image) {
      if (d.image.startsWith('[')) {
        try { imgUrls = JSON.parse(d.image); } catch(e) { imgUrls = [d.image]; }
      } else {
        imgUrls = d.image.split(',').map((s: string) => s.trim()).filter((s: string) => s);
      }
    }

    return {
      ...d,
      saleFormat: jsonSaleFormat || d.rarity || d.saleFormat || 'ขายรหัส',
      imageUrl: imgUrls.length > 0 ? imgUrls[0] : undefined,
      imageUrls: imgUrls.length > 0 ? imgUrls : undefined,
      gachaPool: pool,
      accountCredentials: accCreds,
      initialQuantity: initialQty,
      piecesPerUnit: pieces,
      isPopular: d.popular === true || d.popular === "true" || d.popular === 1 || d.isPopular === true || d.isPopular === "true" || d.isPopular === 1,
      isPinned: d.is_pinned === true || d.is_pinned === "true" || d.is_pinned === 1 || pinned === true || pinned === "true" || false,
      updatedAt: d.created_at
    };
  }) as StockItem[];
}

export async function fetchUser(username: string) {
  const { data, error } = await supabase.from('profiles').select('*').eq('username', username).single();
  if (error) {
    console.error('Error fetching user:', username, error);
    return null;
  }
  return data;
}

export async function createUser(username: string, passwordHash: string) {
  const { data, error } = await supabase.from('profiles').insert([
    { username, password: passwordHash, balance: 0, is_admin: false }
  ]).select().single();
  if (error) throw error;
  return data;
}

export async function fetchLiveActivities() {
  const { data, error } = await supabase.from('activities').select('*').order('timestamp', { ascending: false }).limit(50);
  if (error) return [];
  return data.map((d: any) => ({
    id: d.id,
    type: d.type,
    username: d.username,
    itemName: d.item_name,
    quantity: d.quantity,
    price: d.price,
    remainingStock: d.remaining_stock,
    game: d.game,
    gachaDrops: d.gacha_drops,
    timestamp: d.timestamp
  }));
}

export async function fetchUserPurchases(username: string) {
  const { data, error } = await supabase.from('purchases').select('*').eq('username', username).order('created_at', { ascending: false });
  if (error) return [];
  return data.map((d: any) => ({
    id: d.id,
    itemId: d.item_id,
    itemName: d.item_name,
    price: parseFloat(d.price),
    quantity: d.quantity,
    date: d.created_at,
    gachaDrops: d.gacha_drops,
    credentialData: d.credential_data,
    game: d.game
  }));
}

export async function fetchUserTopups(username: string) {
  const { data, error } = await supabase.from('topups').select('*').eq('username', username).order('created_at', { ascending: false });
  if (error) return [];
  return data.map((d: any) => ({
    id: d.id,
    amount: parseFloat(d.amount),
    method: d.method,
    date: d.created_at,
    game: d.game
  }));
}

export async function getSystemConfig() {
  const { data, error } = await supabase.from('system_config').select('*').eq('id', 'main').single();
  if (error) return null;
  if (data?.announcement_settings && typeof data.announcement_settings === 'string') {
    try {
      data.announcement_settings = JSON.parse(data.announcement_settings);
    } catch(e) {}
  }
  return data;
}
