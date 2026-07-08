const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// Update TrueWallet Proxy
const walletTarget = /const response = await fetch\('https:\/\/www\.planariashop\.com\/api\/truewallet\.php'[\s\S]*?const data = await response\.json\(\);\s*res\.json\(data\);/g;

// Check if we already did something like this. The original code has `const data = await response.json();`
let walletMatch = content.match(/const response = await fetch\('https:\/\/www\.planariashop\.com\/api\/truewallet\.php', \{[\s\S]*?body: params\s*\}\);\s*const data = await response\.json\(\);\s*res\.json\(data\);/);

if (walletMatch) {
    const replacement = walletMatch[0].replace('const data = await response.json();\n    res.json(data);', `const text = await response.text();
    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch(err) {
      console.error("TrueWallet API returned non-JSON:", text.substring(0, 200));
      res.status(502).json({ status: 'error', message: 'API เติมเงินขัดข้อง กรุณาติดต่อผู้ดูแลระบบ' });
    }`);
    content = content.replace(walletMatch[0], replacement);
}

// Update Bank Slip Proxy
let bankMatch = content.match(/const response = await fetch\('https:\/\/www\.planariashop\.com\/api\/checkslip\.php', \{[\s\S]*?body: params\s*\}\);\s*const data = await response\.json\(\);/);

if (bankMatch) {
    const replacement = bankMatch[0].replace('const data = await response.json();', `const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch(err) {
      console.error("CheckSlip API returned non-JSON:", text.substring(0, 200));
      return res.status(502).json({ status: 'error', message: 'API ตรวจสอบสลิปขัดข้อง กรุณาติดต่อผู้ดูแลระบบ' });
    }`);
    content = content.replace(bankMatch[0], replacement);
}

fs.writeFileSync('server.ts', content);
