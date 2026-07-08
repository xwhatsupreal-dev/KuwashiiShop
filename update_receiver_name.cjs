const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = /if \(configName && receiverName !== "ไม่ทราบชื่อ" && topupTarget !== 'balance_rov'\) \{([\s\S]*?)\n            \}/g;

const replacement = `if (receiverName !== "ไม่ทราบชื่อ") {
              if (topupTarget === 'balance_rov') {
                const requiredRovName = "บริษัท วันดีดี คอร์ปอเรชั่น จำกัด";
                const cleanReceiver = receiverName.toLowerCase().replace(/\\s/g, "");
                const cleanRequired = requiredRovName.toLowerCase().replace(/\\s/g, "");
                
                if (!cleanReceiver.includes(cleanRequired) && !cleanRequired.includes(cleanReceiver)) {
                   setTopupError(\`ชื่อบัญชีผู้รับไม่ถูกต้อง (ต้องเป็น: \${requiredRovName})\`);
                   showToast(\`สลิปนี้ถูกโอนไปยัง: \${receiverName}\`, "error");
                   setIsProcessingTopup(false);
                   return;
                }
              } else if (configName) {
$1
              }
            }`;

content = content.replace(target, replacement);

fs.writeFileSync('src/App.tsx', content);
