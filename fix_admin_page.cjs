const fs = require('fs');
let content = fs.readFileSync('src/components/PaymentSettingsModal.tsx', 'utf8');

// replace angpao mentions with TrueMoney
content = content.replace(/>ตั้งค่าซองอั่งเปา (TrueMoney)</g, '>ตั้งค่ารับโอน TrueMoney Wallet (ตรวจสอบสลิป)<');
content = content.replace(/>เบอร์ซองอั่งเปา \(TrueMoney\)</g, '>เบอร์โทร TrueMoney Wallet<');
content = content.replace(/placeholder="กรอกเบอร์ซองอั่งเปา..."/g, 'placeholder="กรอกเบอร์ TrueMoney Wallet..."');
content = content.replace(/>เปิดใช้งานการเติมเงินผ่านซองอั่งเปา TrueMoney</g, '>เปิดใช้งานการเติมเงินผ่าน TrueMoney Wallet<');
content = content.replace(/>ลิงก์อั่งเปาจะถูกตรวจสอบอัตโนมัติผ่าน API</g, '>สลิปจะถูกตรวจสอบอัตโนมัติผ่าน Thunder Solution API<');

fs.writeFileSync('src/components/PaymentSettingsModal.tsx', content);
