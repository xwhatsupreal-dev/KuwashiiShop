const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

// For Coupon Success:
app = app.replace(
  /showToast\(`ใช้คูปองสำเร็จ ได้รับ \$\{coupon.amount.toFixed\(2\)\} บาท`, "success"\);/g,
  `showToast(\`ใช้คูปองสำเร็จ ได้รับ \${coupon.amount.toFixed(2)} บาท\`, "success"); sendDiscordTopupEmbed(activeUsername, coupon.amount, "coupon", userBalance + coupon.amount, true);`
);

// For Angpao Success:
// Inside processAngpaoSlip:
// setTopupSuccessMessage(`เติมเงินสำเร็จ ${amount.toFixed(2)} บาท`);
// showToast(`เติมเงินสำเร็จ ${amount.toFixed(2)} บาท`, "success");
app = app.replace(
  /showToast\(`เติมเงินสำเร็จ \$\{amount.toFixed\(2\)\} บาท`, "success"\);/g,
  `showToast(\`เติมเงินสำเร็จ \${amount.toFixed(2)} บาท\`, "success"); sendDiscordTopupEmbed(activeUsername, amount, topupModalStep, userBalance + amount, true);`
);

fs.writeFileSync('src/App.tsx', app);
console.log("Replaced success messages.");
