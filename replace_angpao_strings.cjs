const fs = require('fs');
let content = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

content = content.replace(/ซองอั่งเปา \(Angpao\)/g, 'โอนผ่านทรูมันนี่ (TrueMoney)');
content = content.replace(/True Money Wallet • ใช้ลิงค์ซองอั่งเปาเพื่อเติมเงิน/g, 'TrueMoney Wallet • แนบสลิปเพื่อยืนยันการเติมเงิน');

fs.writeFileSync('src/components/TopupPage.tsx', content);
