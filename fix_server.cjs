const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const bankRegex = /app\.post\("\/api\/topup\/bank", async \(req: express\.Request, res: express\.Response\) => \{[\s\S]*?\}\);/m;

const newBankCode = `app.post("/api/topup/bank", async (req: express.Request, res: express.Response) => {
  try {
    const { base64, qrcode_text } = req.body;
    
    let payload = {};
    if (base64) {
        payload = { base64 };
    } else if (qrcode_text) {
        payload = { payload: qrcode_text };
    }
    
    const response = await fetch('https://api.thunder.in.th/v2/verify/bank', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${process.env.THUNDER_API_KEY}\`
      },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Bank Check API Error:', error);
    res.status(500).json({ status: "error", message: "API Error" });
  }
});`;

content = content.replace(bankRegex, newBankCode);


const walletRegex = /app\.post\("\/api\/topup\/true-wallet", async \(req: express\.Request, res: express\.Response\) => \{[\s\S]*?\}\);/m;

const newWalletCode = `app.post("/api/topup/true-wallet", async (req: express.Request, res: express.Response) => {
  try {
    const { base64 } = req.body;
    
    const response = await fetch('https://api.thunder.in.th/v2/verify/truewallet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${process.env.THUNDER_API_KEY}\`
      },
      body: JSON.stringify({ base64 })
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Wallet Check API Error:', error);
    res.status(500).json({ status: "error", message: "API Error" });
  }
});`;

content = content.replace(walletRegex, newWalletCode);

// Also we should update the API check in the polling

const apiCheckRegex = /\/\/ Check Angpao API[\s\S]*?\/\/ Check CheckSlip API[\s\S]*?\} catch\(e\) \{\}/;

const newApiCheck = `    // Check Thunder API
    try {
        const response = await fetch('https://api.thunder.in.th/v2/info', {
            method: 'GET',
            headers: {
                'Authorization': \`Bearer \${process.env.THUNDER_API_KEY}\`
            }
        });
        if (response.ok) {
            results.angpao = 'online';
            results.checkslip = 'online';
        } else {
            results.angpao = 'offline';
            results.checkslip = 'offline';
        }
    } catch(e) {
        results.angpao = 'offline';
        results.checkslip = 'offline';
    }`;

content = content.replace(apiCheckRegex, newApiCheck);

fs.writeFileSync('server.ts', content);
