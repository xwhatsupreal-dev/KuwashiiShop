const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
    'setTopupError("สลิปนี้ไม่ได้โอนเงินเข้าเบอร์ 092-888-6584 ของร้านครับ");',
    'setTopupError("สลิปนี้ไม่ได้โอนเงินเข้าเบอร์ 092-888-6584 ของร้านครับ");\n                     showToast("สลิปนี้ไม่ได้โอนเงินเข้าเบอร์ 092-888-6584 ของร้านครับ", "error");'
);

code = code.replace(
    'setTopupError("สลิปนี้ไม่ได้โอนเงินเข้าบัญชีของร้าน (ธีรสิทธิ์ สุวรรณศรี) ครับ");',
    'setTopupError("สลิปนี้ไม่ได้โอนเงินเข้าบัญชีของร้าน (ธีรสิทธิ์ สุวรรณศรี) ครับ");\n                     showToast("สลิปนี้ไม่ได้โอนเงินเข้าบัญชีของร้าน (ธีรสิทธิ์ สุวรรณศรี) ครับ", "error");'
);

code = code.replace(
    /setTopupError\(data\.message \|\| data\.error\?\.message \|\| "สลิปไม่ถูกต้อง หรือเช็คไม่ได้"\);/g,
    'setTopupError(data.message || data.error?.message || "สลิปไม่ถูกต้อง หรือเช็คไม่ได้");\n                  showToast(data.message || data.error?.message || "สลิปไม่ถูกต้อง หรือเช็คไม่ได้", "error");'
);

code = code.replace(
    /setTopupError\("การเชื่อมต่อมีปัญหา กรุณาลองใหม่"\);/g,
    'setTopupError("การเชื่อมต่อมีปัญหา กรุณาลองใหม่");\n                showToast("การเชื่อมต่อมีปัญหา กรุณาลองใหม่", "error");'
);

code = code.replace(
    /setTopupError\(data\.message \|\| data\.error\?\.message \|\| "ข้อมูลสลิปไม่ถูกต้อง หรือเช็คไม่ได้"\);/g,
    'setTopupError(data.message || data.error?.message || "ข้อมูลสลิปไม่ถูกต้อง หรือเช็คไม่ได้");\n                  showToast(data.message || data.error?.message || "ข้อมูลสลิปไม่ถูกต้อง หรือเช็คไม่ได้", "error");'
);

code = code.replace(
    /setTopupSuccessMessage\(\`เติมเงินสำเร็จ \$\{amount\.toFixed\(2\)\} บาท\`\);/g,
    'setTopupSuccessMessage(`เติมเงินสำเร็จ ${amount.toFixed(2)} บาท`);\n                  showToast(`เติมเงินสำเร็จ ${amount.toFixed(2)} บาท`, "success");'
);

fs.writeFileSync('src/App.tsx', code);
