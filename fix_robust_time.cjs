const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const parseLogic = `
                  let slipTime = NaN;
                  
                  // Attempt 1: Direct full ISO string
                  if (slipData.timestamp) {
                      let tsStr = slipData.timestamp.toString();
                      if (tsStr.includes(' ')) tsStr = tsStr.replace(' ', 'T');
                      if (!tsStr.includes('+') && !tsStr.includes('Z')) {
                          tsStr += "+07:00";
                      }
                      slipTime = new Date(tsStr).getTime();
                  }
                  
                  // Attempt 2: date & time fields
                  if (isNaN(slipTime) && slipData.date) {
                      let ds = slipData.date.toString();
                      let tsStr = slipData.time ? slipData.time.toString() : "00:00:00";
                      if (ds.includes('/')) {
                         const parts = ds.split(' ')[0].split('/'); 
                         if (parts.length >= 3 && parts[0].length === 2 && parts[2].length >= 4) {
                             ds = \`\${parts[2].substring(0,4)}-\${parts[1]}-\${parts[0]}\`;
                         }
                      } else if (ds.match(/^\\d{2}-\\d{2}-\\d{4}$/)) {
                         const parts = ds.split('-');
                         ds = \`\${parts[2]}-\${parts[1]}-\${parts[0]}\`;
                      } else if (ds.includes(' ')) {
                         const parts = ds.split(' ');
                         ds = parts[0];
                         if (parts[1]) tsStr = parts[1];
                      }
                      
                      let fullStr = \`\${ds}T\${tsStr}\`;
                      if (!fullStr.includes('+') && !fullStr.includes('Z')) {
                          fullStr += "+07:00";
                      }
                      slipTime = new Date(fullStr).getTime();
                  }
                  
                  // Attempt 3: transDate & transTime (common for Thunder)
                  if (isNaN(slipTime) && slipData.transDate) {
                      const ds = slipData.transDate.toString();
                      const ts = slipData.transTime ? slipData.transTime.toString() : "00:00:00";
                      if (ds.length === 8 && !ds.includes('-')) {
                          slipTime = new Date(\`\${ds.substring(0,4)}-\${ds.substring(4,6)}-\${ds.substring(6,8)}T\${ts}+07:00\`).getTime();
                      } else if (ds.includes('-')) {
                          let fullStr = \`\${ds}T\${ts}\`;
                          if (!fullStr.includes('+') && !fullStr.includes('Z')) fullStr += "+07:00";
                          slipTime = new Date(fullStr).getTime();
                      }
                  }
                  
                  // Attempt 4: rawSlip fields
                  if (isNaN(slipTime) && slipData.rawSlip?.transDate) {
                      const ds = slipData.rawSlip.transDate.toString();
                      const ts = slipData.rawSlip.transTime ? slipData.rawSlip.transTime.toString() : "00:00:00";
                      if (ds.length === 8 && !ds.includes('-')) {
                          slipTime = new Date(\`\${ds.substring(0,4)}-\${ds.substring(4,6)}-\${ds.substring(6,8)}T\${ts}+07:00\`).getTime();
                      } else if (ds.includes('-')) {
                          let fullStr = \`\${ds}T\${ts}\`;
                          if (!fullStr.includes('+') && !fullStr.includes('Z')) fullStr += "+07:00";
                          slipTime = new Date(fullStr).getTime();
                      }
                  }

                  if (!isNaN(slipTime)) {
                      const now = Date.now();
                      const diffMinutes = (now - slipTime) / (1000 * 60);
                      if (diffMinutes > 5) {
                         handleTopupError("สลิปหมดอายุ (ทำรายการเกิน 5 นาที) โปรดติดต่อแอดมิน", "CHANNEL_PLACEHOLDER"); return;
                      }
                  }
                  
                  const transactionId = slipData.transRef || slipData.transactionId || slipData.rawSlip?.transactionId || slipData.rawSlip?.transRef || null;`;

// Replace angpao block
const angpaoRegex = /let slipDateStr = null;[\s\S]*?const transactionId = slipData\.transRef[^]*?\|\| null;/;
content = content.replace(angpaoRegex, parseLogic.replace('CHANNEL_PLACEHOLDER', 'angpao'));

// Replace bank block
content = content.replace(angpaoRegex, parseLogic.replace('CHANNEL_PLACEHOLDER', 'bank'));

fs.writeFileSync('src/App.tsx', content);
