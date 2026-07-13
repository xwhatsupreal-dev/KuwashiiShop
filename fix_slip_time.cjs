const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacement = `                  // Time Limit Check
                  let slipDateStr = null;
                  if (slipData.transDate && slipData.transTime) {
                     const dateStr = slipData.transDate.toString();
                     const timeStr = slipData.transTime.toString();
                     if (dateStr.length === 8) {
                        slipDateStr = \`\${dateStr.substring(0,4)}-\${dateStr.substring(4,6)}-\${dateStr.substring(6,8)}T\${timeStr}+07:00\`;
                     } else if (dateStr.includes('-')) {
                        slipDateStr = \`\${dateStr}T\${timeStr}+07:00\`;
                     }
                  } else if (slipData.timestamp) {
                     slipDateStr = slipData.timestamp;
                  } else if (slipData.date) {
                     slipDateStr = slipData.date;
                  } else if (slipData.rawSlip?.transDate && slipData.rawSlip?.transTime) {
                     const dateStr = slipData.rawSlip.transDate.toString();
                     const timeStr = slipData.rawSlip.transTime.toString();
                     if (dateStr.length === 8) {
                        slipDateStr = \`\${dateStr.substring(0,4)}-\${dateStr.substring(4,6)}-\${dateStr.substring(6,8)}T\${timeStr}+07:00\`;
                     }
                  }

                  if (slipDateStr) {
                     const slipTime = new Date(slipDateStr).getTime();
                     if (!isNaN(slipTime)) {
                        const now = Date.now();
                        const diffMinutes = (now - slipTime) / (1000 * 60);
                        if (diffMinutes > 5) {
                           handleTopupError("สลิปหมดอายุ (ทำรายการเกิน 5 นาที)", "bank"); return;
                        }
                     }
                  }
                  
                  const transactionId = slipData.transRef || slipData.transactionId || slipData.rawSlip?.transactionId || slipData.rawSlip?.transRef || null;`;

content = content.replace(/const transactionId = slipData\.transRef[^]*?\|\| null;/g, replacement);

fs.writeFileSync('src/App.tsx', content);
