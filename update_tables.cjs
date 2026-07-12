const fs = require('fs');
let appCode = fs.readFileSync('src/App.tsx', 'utf8');

appCode = appCode.replace(/supabase\.from\("users"\)/g, 'supabase.from("profiles")');
appCode = appCode.replace(/supabase\.from\("topup_history"\)/g, 'supabase.from("topups")');

fs.writeFileSync('src/App.tsx', appCode);
console.log("Updated App.tsx with correct tables");
