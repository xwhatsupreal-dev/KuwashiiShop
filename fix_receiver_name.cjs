const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = /if \(configName && receiverName !== "ไม่ทราบชื่อ"\) \{/g;
const replacement = `if (configName && receiverName !== "ไม่ทราบชื่อ" && topupTarget !== 'balance_rov') {`;

content = content.replace(target, replacement);

fs.writeFileSync('src/App.tsx', content);
