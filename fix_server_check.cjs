const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const target = /\/\/ Check Angpao API[\s\S]*?\/\/ Check CheckSlip API[\s\S]*?\} catch\(e\) \{\}/;
const replacement = `
    // Check Angpao API
    try {
      const params = new URLSearchParams();
      params.append('keyapi', 'dummy');
      params.append('phone', 'dummy');
      params.append('gift_link', 'dummy');

      const angpaoRes = await fetch('https://www.planariashop.com/api/truewallet.php', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        body: params
      });
      const text = await angpaoRes.text();
      try {
        JSON.parse(text);
        results.angpao = 'online';
      } catch(e) {
        if (angpaoRes.status === 403 || text.includes('Cloudflare') || text.includes('Just a moment')) {
          results.angpao = 'blocked';
        } else {
          results.angpao = 'offline';
        }
      }
    } catch(e) {}
    
    // Check CheckSlip API
    try {
      const params = new URLSearchParams();
      params.append('keyapi', 'dummy');
      params.append('qrcode_text', 'dummy');

      const slipRes = await fetch('https://www.planariashop.com/api/checkslip.php', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        body: params
      });
      const text = await slipRes.text();
      try {
        JSON.parse(text);
        results.checkslip = 'online';
      } catch(e) {
        if (slipRes.status === 403 || text.includes('Cloudflare') || text.includes('Just a moment')) {
          results.checkslip = 'blocked';
        } else {
          results.checkslip = 'offline';
        }
      }
    } catch(e) {}
`;
content = content.replace(target, replacement);
fs.writeFileSync('server.ts', content);
