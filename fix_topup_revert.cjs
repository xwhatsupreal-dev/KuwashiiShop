const fs = require('fs');
let content = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

// 1. Remove the selection button for bank_generate
const generateSelectPattern = /\s*\{\s*qrActive\s*&&\s*\(\s*<div\s*onClick=\{\(\)\s*=>\s*setTopupModalStep\("bank_generate"\)\}[^]*?ฟรีค่าธรรมเนียม<\/p>\s*<\/div>\s*<\/div>\s*\)\s*\}/;
content = content.replace(generateSelectPattern, '');

// 2. Fix the header text
content = content.replace(
  /topupModalStep === "bank" \? "แนบสลิปโอนเงินธนาคาร" : topupModalStep === "bank_generate" \? "สแกน QR แบบระบุยอด"\s*: topupModalStep === "coupon"/g,
  `topupModalStep === "bank" ? "แนบสลิปโอนเงินธนาคาร" : topupModalStep === "coupon"`
);

// 3. Remove the bank_generate UI block
const generateUiPattern = /\s*\{topupModalStep === "bank_generate" && \([^]*?\{topupModalStep === "bank" && \(/;
content = content.replace(generateUiPattern, '\n             {topupModalStep === "bank" && (');

fs.writeFileSync('src/components/TopupPage.tsx', content);
