const fs = require('fs');
let content = fs.readFileSync('src/components/UserProfileDashboard.tsx', 'utf8');

const target = /<div className="bg-indigo-500\/10 border border-indigo-500\/20 rounded-xl p-3 flex justify-between items-center">\s*<span className="text-xs text-indigo-300 font-medium whitespace-nowrap">\s*ยอดคงเหลือ\s*<\/span>\s*<span className="text-indigo-400 font-bold">\s*฿\{\(currentUser\?\.balance \|\| 0\)\.toLocaleString\(\)\}\s*<\/span>\s*<\/div>/g;
const replacement = `
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 flex justify-between items-center">
                <span className="text-xs text-indigo-300 font-medium whitespace-nowrap">
                  พ้อยสินค้า
                </span>
                <span className="text-indigo-400 font-bold">
                  ฿{(currentUser?.balance || 0).toLocaleString()}
                </span>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-3 flex justify-between items-center">
                <span className="text-xs text-cyan-300 font-medium whitespace-nowrap">
                  พ้อยเติมเกม
                </span>
                <span className="text-cyan-400 font-bold">
                  ฿{(currentUser?.balance_rov || 0).toLocaleString()}
                </span>
              </div>
`;
content = content.replace(target, replacement);

fs.writeFileSync('src/components/UserProfileDashboard.tsx', content);
