const fs = require('fs');
let content = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

content = content.replace(/\{topupTarget === 'balance_rov' \? 'เติมเงิน ROV' : 'เติมเงินเข้าระบบ'\}/g, `'เติมเงินเข้าระบบ'`);
content = content.replace(/const isRov = topupTarget === 'balance_rov';/g, `const isRov = false;`);

fs.writeFileSync('src/components/TopupPage.tsx', content);
