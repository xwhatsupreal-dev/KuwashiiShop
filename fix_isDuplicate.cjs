const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add isDuplicate check for TrueMoney
content = content.replace(
  /(\/\/ Receiver Validation for TrueMoney)/,
  `if (slipData.isDuplicate) {\n                      handleTopupError("สลิปนี้ถูกใช้งานไปแล้ว!", "angpao"); return;\n                  }\n\n                  $1`
);

// Add isDuplicate check for Bank
content = content.replace(
  /(\/\/ Receiver Validation for Bank)/,
  `if (slipData.isDuplicate) {\n                      handleTopupError("สลิปนี้ถูกใช้งานไปแล้ว!", "bank"); return;\n                  }\n\n                  $1`
);

fs.writeFileSync('src/App.tsx', content);
