const fs = require('fs');
let appCode = fs.readFileSync('src/App.tsx', 'utf8');

appCode = appCode.replace(/setTopupSuccessMessage\(\`เติมเงินสำเร็จ \$\{amount\.toFixed\(2\)\} บาท\`\);/g, 'setTopupSuccessMessage(`เติมเงินสำเร็จ ${amount.toFixed(2)} บาท`);\n                  window.dispatchEvent(new Event("sync-update"));');

fs.writeFileSync('src/App.tsx', appCode);
console.log("Added sync-update to topup");
