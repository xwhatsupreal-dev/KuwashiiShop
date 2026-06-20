import { supabase } from './src/supabase';

async function test() {
  const updates = [{
    id: "test",
    name: "test string",
    price: 15,
    quantity: 1,
    gacha_pool: { pool: null }
  }];
  
  const { data, error } = await supabase.from('items').upsert(updates);
  console.log("data:", data, "error:", error);
}

test();
