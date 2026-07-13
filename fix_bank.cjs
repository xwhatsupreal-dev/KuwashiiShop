const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

app = app.replace(
  /showToast\("สลิปนี้ไม่ได้โอนเงินเข้าบัญชีของร้าน \(ธีรสิทธิ์ สุวรรณศรี\) ครับ", "error"\);\s*setIsProcessingTopup\(false\);\s*return;/g,
  `handleTopupError("สลิปนี้ไม่ได้โอนเงินเข้าบัญชีของร้าน (ธีรสิทธิ์ สุวรรณศรี) ครับ", "bank"); return;`
);

app = app.replace(
  /showToast\(data\.message \|\| data\.error\?\.message \|\| "ข้อมูลสลิปไม่ถูกต้อง หรือเช็คไม่ได้", "error"\);/g,
  `handleTopupError(data.message || data.error?.message || "ข้อมูลสลิปไม่ถูกต้อง หรือเช็คไม่ได้", "bank");`
);

// We need to fix the line 1084 which wrongly got replaced with angpao.
// Let's use string split/join to replace the second instance of handleTopupError("การเชื่อมต่อมีปัญหา กรุณาลองใหม่", "angpao")
const parts = app.split('handleTopupError("การเชื่อมต่อมีปัญหา กรุณาลองใหม่", "angpao");');
if(parts.length === 3) { // It means there are 2 occurrences
  app = parts[0] + 'handleTopupError("การเชื่อมต่อมีปัญหา กรุณาลองใหม่", "angpao");' + parts[1] + 'handleTopupError("การเชื่อมต่อมีปัญหา กรุณาลองใหม่", "bank");' + parts[2];
}

fs.writeFileSync('src/App.tsx', app);
console.log("Replaced bank errors.");
