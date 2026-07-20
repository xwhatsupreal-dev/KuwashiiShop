const fs = require('fs');

let content = fs.readFileSync('src/components/CustomerDatabaseModal.tsx', 'utf8');

// Change placeholder
content = content.replace(
  /placeholder="ค้นหาชื่อผู้ใช้..."/,
  'placeholder="ค้นหาชื่อผู้ใช้ หรือ ID..."'
);

// Add member ID in the list
const regex = /<h3 className="font-bold text-white text-base flex items-center gap-2">[\s\S]*?<\/h3>/;
const replacement = `<h3 className="font-bold text-white text-base flex items-center gap-2">
                               {user.username || 'Unknown'}
                               {user.username === 'Kuwashii_admin' && <span className="bg-amber-500/20 text-amber-400 text-[10px] px-1.5 py-0.5 rounded-md border border-amber-500/30">Admin</span>}
                               {user.member_id && <span className="bg-indigo-500/20 text-indigo-400 text-[10px] px-1.5 py-0.5 rounded-md border border-indigo-500/30">ID: {user.member_id}</span>}
                            </h3>`;
                            
content = content.replace(regex, replacement);

fs.writeFileSync('src/components/CustomerDatabaseModal.tsx', content);
