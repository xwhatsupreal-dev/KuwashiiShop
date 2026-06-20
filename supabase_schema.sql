-- ก๊อปปี้โค้ดทั้งหมดนี้ไปวางในเมนู SQL Editor ของ Supabase แล้วกด Run
-- สร้างตาราง kv_store เพื่อใช้เก็บข้อมูลทั้งหมดของร้าน

CREATE TABLE IF NOT EXISTS kv_store (
  key TEXT PRIMARY KEY,
  value JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตั้งค่า Security (RLS)
ALTER TABLE kv_store ENABLE ROW LEVEL SECURITY;

-- อนุญาตให้ทุกคนสามารถอ่านข้อมูลได้ (Public Read)
CREATE POLICY "Allow public read access"
  ON kv_store FOR SELECT
  USING (true);

-- อนุญาตให้ทุกคนสามารถเขียนข้อมูลได้ (Public Write/Update/Insert)
-- หมายเหตุ: สำหรับร้านค้าจริง แนะนำให้เปิดเฉพาะ Admin แต่สำหรับการตั้งค่าเบื้องต้นให้เปิดทั้งหมดก่อน
CREATE POLICY "Allow public insert"
  ON kv_store FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update" 
  ON kv_store FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete" 
  ON kv_store FOR DELETE
  USING (true);

-- หากต้องการปิดรับข้อมูล ให้เปลี่ยนคำสั่งด้านบนเป็น
-- CREATE POLICY "Allow admin write" ON kv_store FOR INSERT/UPDATE/DELETE TO authenticated USING (true);
