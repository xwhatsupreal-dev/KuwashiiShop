const fs = require('fs');
let appCode = fs.readFileSync('src/App.tsx', 'utf8');

const bankValidation = `
                  const slipData = data.data || data;
                  
                  // Receiver Validation for Bank
                  const receiverStr = JSON.stringify(slipData.receiver || slipData.rawSlip?.receiver || slipData).replace(/[- ]/g, '');
                  // Check if the slip's receiver matches the shop's bank account or name
                  // Bank account: 2133814461 (ธีรสิทธิ์ สุวรรณศรี)
                  if (!receiverStr.includes("2133814461") && !receiverStr.includes("14461") && !receiverStr.includes("ธีรสิทธิ์")) {
                     setTopupError("สลิปนี้ไม่ได้โอนเงินเข้าบัญชีของร้าน (ธีรสิทธิ์ สุวรรณศรี) ครับ");
                     setIsProcessingTopup(false);
                     return;
                  }
                  
                  let amount = parseFloat(slipData.amount?.amount || slipData.amount || data.amount) || 0;
`;

appCode = appCode.replace(
    'const slipData = data.data || data;\n                  let amount = parseFloat(slipData.amount?.amount || slipData.amount || data.amount) || 0;',
    bankValidation
);

fs.writeFileSync('src/App.tsx', appCode);
console.log("Updated App.tsx with Bank validation");
