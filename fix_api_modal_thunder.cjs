const fs = require('fs');
let content = fs.readFileSync('src/components/ApiStatusModal.tsx', 'utf8');

content = content.replace(/API รับซองอั่งเปา/g, 'API ตรวจสอบสลิป TrueMoney');
content = content.replace(/www\.planariashop\.com\/api\/truewallet\.php/g, 'api.thunder.in.th/v2/verify/truewallet');
content = content.replace(/API ตรวจสอบสลิปธนาคาร/g, 'API ตรวจสอบสลิปธนาคาร');
content = content.replace(/www\.planariashop\.com\/api\/checkslip\.php/g, 'api.thunder.in.th/v2/verify/bank');

fs.writeFileSync('src/components/ApiStatusModal.tsx', content);
