const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

app = app.replace(
  /showToast\([\s\S]*?`ใช้คูปองสำเร็จ! ได้รับ \$\{coupon.amount.toLocaleString\(\)\} เครดิต`,[\s\S]*?"success",[\s\S]*?\);/,
  `showToast(\`ใช้คูปองสำเร็จ! ได้รับ \${coupon.amount.toLocaleString()} เครดิต\`, "success"); sendDiscordTopupEmbed(activeUsername, coupon.amount, "coupon", newBalance, true);`
);

fs.writeFileSync('src/App.tsx', app);
console.log("Fixed coupon.");
