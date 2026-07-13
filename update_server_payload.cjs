const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// True Wallet
content = content.replace(
  /body: JSON\.stringify\(\{\s*base64\s*\}\)/g,
  'body: JSON.stringify({ base64, matchAccount: true, checkDuplicate: true })'
);

// Bank
content = content.replace(
  /let payload = \{\};\s*if \(base64\) \{\s*payload = \{ base64 \};\s*\} else if \(qrcode_text\) \{\s*payload = \{ payload: qrcode_text \};\s*\}/g,
  `let payload: any = { matchAccount: true, checkDuplicate: true };
    if (base64) {
        payload.base64 = base64;
    } else if (qrcode_text) {
        payload.payload = qrcode_text;
    }`
);

fs.writeFileSync('server.ts', content);
