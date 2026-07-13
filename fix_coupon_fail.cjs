const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

app = app.replace(
  /showToast\("คุณได้ใช้งานโค้ดนี้ไปแล้ว", "error"\);\s*setIsProcessingTopup\(false\);\s*return;/g,
  `handleTopupError("คุณได้ใช้งานโค้ดนี้ไปแล้ว", "coupon"); return;`
);

app = app.replace(
  /showToast\("โค้ดไม่ถูกต้องหรือไม่มีในระบบ", "error"\);\s*setIsProcessingTopup\(false\);\s*return;/g,
  `handleTopupError("โค้ดไม่ถูกต้องหรือไม่มีในระบบ", "coupon"); return;`
);

fs.writeFileSync('src/App.tsx', app);
console.log("Fixed coupon failures.");
