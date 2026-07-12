const fs = require('fs');

// Update TopupPage
let topupCode = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');
topupCode = topupCode.replace(
    'const angpaoPhone = isRov ? parsedSettings.rov_topup_angpao_phone : parsedSettings.topup_angpao_phone;',
    'const angpaoPhone = isRov ? parsedSettings.rov_topup_angpao_phone : (parsedSettings.topup_angpao_phone || "0928886584");'
);
fs.writeFileSync('src/components/TopupPage.tsx', topupCode);

// Update App.tsx
let appCode = fs.readFileSync('src/App.tsx', 'utf8');

const angpaoValidation = `
                  const slipData = data.data || data;
                  
                  // Receiver Validation for TrueMoney
                  const receiverStr = JSON.stringify(slipData.receiver || slipData).replace(/[- ]/g, '');
                  // Check if the slip's receiver matches the phone number
                  if (!receiverStr.includes("0928886584") && !receiverStr.includes("886584") && !receiverStr.includes("6584")) {
                     setTopupError("สลิปนี้ไม่ได้โอนเงินเข้าเบอร์ 092-888-6584 ของร้านครับ");
                     setIsProcessingTopup(false);
                     return;
                  }
                  
                  const amount = parseFloat(slipData.amountInSlip || slipData.amount || data.amount) || 0;
`;

appCode = appCode.replace(
    'const slipData = data.data || data;\n                  const amount = parseFloat(slipData.amountInSlip || slipData.amount || data.amount) || 0;',
    angpaoValidation
);

fs.writeFileSync('src/App.tsx', appCode);

