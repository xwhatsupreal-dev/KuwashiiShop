const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

// Inside handleTopupSubmit:
app = app.replace(
  /const activeUsername = currentUser.username.trim\(\);/,
  `const activeUsername = currentUser.username.trim();
    const handleTopupError = (errMessage: string, channel: string) => {
      showToast(errMessage, "error");
      sendDiscordTopupEmbed(activeUsername, 0, channel, 0, false, errMessage);
      setIsProcessingTopup(false);
    };`
);

// Now replace specific angpao errors:
app = app.replace(
  /showToast\("สลิปนี้ไม่ได้โอนเงินเข้าเบอร์ 092-888-6584 ของร้านครับ", "error"\);\s*setIsProcessingTopup\(false\);\s*return;/g,
  `handleTopupError("สลิปนี้ไม่ได้โอนเงินเข้าเบอร์ 092-888-6584 ของร้านครับ", "angpao"); return;`
);

app = app.replace(
  /showToast\(data\.message \|\| data\.error\?\.message \|\| "สลิปไม่ถูกต้อง หรือเช็คไม่ได้", "error"\);/g,
  `handleTopupError(data.message || data.error?.message || "สลิปไม่ถูกต้อง หรือเช็คไม่ได้", "angpao");`
);

app = app.replace(
  /showToast\("การเชื่อมต่อมีปัญหา กรุณาลองใหม่", "error"\);/g,
  `handleTopupError("การเชื่อมต่อมีปัญหา กรุณาลองใหม่", "angpao");`
); // Note: this might affect bank slip too if they are identical. Let's be careful.

fs.writeFileSync('src/App.tsx', app);
console.log("Replaced angpao errors.");
