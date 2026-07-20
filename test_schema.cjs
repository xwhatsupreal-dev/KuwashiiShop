const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// We need to parse supabase.ts to get the url and key
const content = fs.readFileSync('src/supabase.ts', 'utf8');
const urlMatch = content.match(/supabaseUrl\s*=\s*['"]([^'"]+)['"]/);
const keyMatch = content.match(/supabaseAnonKey\s*=\s*['"]([^'"]+)['"]/);

if (urlMatch && keyMatch) {
  const supabase = createClient(urlMatch[1], keyMatch[1]);
  supabase.from('profiles').select('*').limit(1).then(({ data, error }) => {
    console.log("Data:", data);
    console.log("Error:", error);
  });
}
