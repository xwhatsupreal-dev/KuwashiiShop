const fs = require('fs');
let content = fs.readFileSync('src/components/CustomerDatabaseModal.tsx', 'utf8');

// Remove the whole block for "(เกม)"
content = content.replace(
  /<div className="flex items-center gap-1\.5 bg-cyan-500\/10 border border-cyan-500\/20 px-2 py-1 rounded-lg">\s*<DollarSign className="w-3 h-3 text-cyan-400" \/>\s*<span className="text-cyan-400 font-mono text-xs font-bold">\{\(user\.balance_rov \|\| 0\)\.toLocaleString\(\)\} \(เกม\)<\/span>\s*<\/div>/g,
  ``
);

// Remove the edit button for "พ้อยเติมเกม"
content = content.replace(
  /<motion\.button whileTap=\{\{ scale: 0\.95 \}\}\s*onClick=\{\(\) => \{ setEditingBalanceUser\(user\.username\); setEditingBalanceType\("balance_rov"\); setNewBalance\(String\(user\.balance_rov \|\| 0\)\); \}\}\s*className="p-1\.5 rounded-lg hover:bg-cyan-900\/30 text-cyan-500\/70 hover:text-cyan-400 transition-colors cursor-pointer shrink-0"\s*title="แก้ไขพ้อยเติมเกม"\s*>\s*<Edit2 className="w-3 h-3" \/>\s*<\/motion\.button>/g,
  ``
);

fs.writeFileSync('src/components/CustomerDatabaseModal.tsx', content);
