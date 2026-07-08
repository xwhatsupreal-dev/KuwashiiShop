const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const target = /\/\/ True Wallet Topup Proxy/;
const replacement = `
app.get("/api/admin/check-api-status", async (req, res) => {
  try {
    const results = { angpao: 'offline', checkslip: 'offline' };
    
    // Check Angpao API
    try {
      const angpaoRes = await fetch('https://www.planariashop.com/api/truewallet.php', { method: 'GET' });
      if (angpaoRes.status === 200 || angpaoRes.status === 403) {
        results.angpao = 'online';
      }
    } catch(e) {}
    
    // Check CheckSlip API
    try {
      const slipRes = await fetch('https://www.planariashop.com/api/checkslip.php', { method: 'GET' });
      if (slipRes.status === 200 || slipRes.status === 403) {
        results.checkslip = 'online';
      }
    } catch(e) {}
    
    res.json(results);
  } catch(e) {
    res.status(500).json({ error: 'Failed to check status' });
  }
});

// True Wallet Topup Proxy`;

content = content.replace(target, replacement);
fs.writeFileSync('server.ts', content);
