const fs = require('fs');
let content = fs.readFileSync('src/components/MobileDrawer.tsx', 'utf8');

const target = /<span className="px-2 py-0.5 rounded-md bg-indigo-500\/10 text-indigo-400 text-\[11px\] font-semibold inline-flex items-center gap-1">\s*<Wallet className="w-3 h-3" \/> ฿\{\(currentUser\.balance \|\| 0\)\.toLocaleString\(\)\}\s*<\/span>/g;
const replacement = `
                            <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-[11px] font-semibold inline-flex items-center gap-1">
                              <Wallet className="w-3 h-3" /> ฿{(currentUser.balance || 0).toLocaleString()}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 text-[11px] font-semibold inline-flex items-center gap-1">
                              <Wallet className="w-3 h-3" /> ฿{(currentUser.balance_rov || 0).toLocaleString()} (เกม)
                            </span>
`;
content = content.replace(target, replacement);

fs.writeFileSync('src/components/MobileDrawer.tsx', content);
