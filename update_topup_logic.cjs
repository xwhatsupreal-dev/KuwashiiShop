const fs = require('fs');
let content = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

// Hide Angpao and Coupon options if topupTarget is 'balance_rov'
const selectOptionsTarget = /<motion\.div\s*whileHover=\{angpaoActive \? \{ scale: 1\.02 \} : \{\}\}/g;
const selectOptionsReplacement = `
            {topupTarget !== 'balance_rov' && (
              <>
                <motion.div
                  whileHover={angpaoActive ? { scale: 1.02 } : {}}
`;
content = content.replace(selectOptionsTarget, selectOptionsReplacement);

const qrCodeOptionTarget = /<motion\.div\s*whileHover=\{qrActive \? \{ scale: 1\.02 \} : \{\}\}/g;
const qrCodeOptionReplacement = `
              </>
            )}
          <motion.div
              whileHover={qrActive ? { scale: 1.02 } : {}}
`;
content = content.replace(qrCodeOptionTarget, qrCodeOptionReplacement);

// Override QR image and details if topupTarget is 'balance_rov'
const qrDetailsTarget = /const qrUrl = parsedSettings\.topup_bank_qr_image;\s*const bName = parsedSettings\.topup_bank_name;\s*const bAcc = parsedSettings\.topup_bank_account_no;\s*const bAccName = parsedSettings\.topup_qrcode_name;/g;
const qrDetailsReplacement = `
                    const isRov = topupTarget === 'balance_rov';
                    const qrUrl = isRov ? 'https://img1.pic.in.th/images/1000113791.jpg' : parsedSettings.topup_bank_qr_image;
                    const bName = isRov ? 'Prompt Pay' : parsedSettings.topup_bank_name;
                    const bAcc = isRov ? null : parsedSettings.topup_bank_account_no;
                    const bAccName = isRov ? null : parsedSettings.topup_qrcode_name;
`;
content = content.replace(qrDetailsTarget, qrDetailsReplacement);

fs.writeFileSync('src/components/TopupPage.tsx', content);
