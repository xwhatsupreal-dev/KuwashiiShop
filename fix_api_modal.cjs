const fs = require('fs');
let content = fs.readFileSync('src/components/ApiStatusModal.tsx', 'utf8');

const replacement1 = `apiStatus.angpao === 'online' ? (
                           <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">Online</span>
                         ) : apiStatus.angpao === 'blocked' ? (
                           <span className="px-3 py-1.5 bg-amber-500/20 text-amber-500 text-xs font-bold rounded-full">ถูกบล็อก (Cloudflare)</span>
                         ) : (
                           <span className="px-3 py-1.5 bg-red-500/20 text-red-500 text-xs font-bold rounded-full">Offline</span>
                         )`;
const target1 = /apiStatus\.angpao === 'online' \? \([\s\S]*?Offline<\/span>\s*\)\s*\)/;
content = content.replace(target1, replacement1);

const replacement2 = `apiStatus.checkslip === 'online' ? (
                           <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">Online</span>
                         ) : apiStatus.checkslip === 'blocked' ? (
                           <span className="px-3 py-1.5 bg-amber-500/20 text-amber-500 text-xs font-bold rounded-full">ถูกบล็อก (Cloudflare)</span>
                         ) : (
                           <span className="px-3 py-1.5 bg-red-500/20 text-red-500 text-xs font-bold rounded-full">Offline</span>
                         )`;
const target2 = /apiStatus\.checkslip === 'online' \? \([\s\S]*?Offline<\/span>\s*\)\s*\)/;
content = content.replace(target2, replacement2);

fs.writeFileSync('src/components/ApiStatusModal.tsx', content);
