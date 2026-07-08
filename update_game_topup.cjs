const fs = require('fs');
let content = fs.readFileSync('src/components/GameTopupPage.tsx', 'utf8');

content = content.replace(/const userBalance = Number\(user.balance \|\| 0\);/g, 'const userBalance = Number(user.balance_rov || 0);');
content = content.replace(/\.update\(\{ balance: newBalance \}\)/g, '.update({ balance_rov: newBalance })');

fs.writeFileSync('src/components/GameTopupPage.tsx', content);
