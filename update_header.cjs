const fs = require('fs');
let content = fs.readFileSync('src/components/ShopHeader.tsx', 'utf8');

const target = /<span className="text-\[10px\] text-\[#0ea5e9\] font-semibold">ยอดคงเหลือ: ฿\{\(currentUser\.balance \|\| 0\)\.toLocaleString\(\)\}<\/span>/g;
const replacement = `
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-[#0ea5e9] font-semibold">สินค้า: ฿{(currentUser.balance || 0).toLocaleString()}</span>
                    <span className="text-[10px] text-cyan-500 font-semibold">เติมเกม: ฿{(currentUser.balance_rov || 0).toLocaleString()}</span>
                  </div>
`;
content = content.replace(target, replacement);

fs.writeFileSync('src/components/ShopHeader.tsx', content);
