const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const generateRoute = `
// Thunder Generate QR Proxy
app.post("/api/topup/generate-qr", async (req: express.Request, res: express.Response) => {
  try {
    const { amount, promptpay } = req.body;
    
    // Check if we have THUNDER_API_KEY
    if (!process.env.THUNDER_API_KEY) {
      return res.status(500).json({ success: false, message: "Server configuration error: Missing API Key" });
    }

    const payload = {
      type: 'PROMPTPAY',
      msisdn: promptpay,
      amount: Number(amount)
    };

    const response = await fetch('https://api.thunder.in.th/v1/qr/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${process.env.THUNDER_API_KEY}\`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (data.success || response.ok) {
        return res.json({ success: true, qrImage: data.qrImage || data.data?.qrImage || data.qr || data.data?.qr || data.data, raw: data });
    } else {
        return res.status(400).json({ success: false, message: data.message || "Failed to generate QR", raw: data });
    }
  } catch (err: any) {
    console.error("QR Generate Proxy Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Thunder Info Proxy
`;

if (!content.includes('/api/topup/generate-qr')) {
  content = content.replace(/\/\/ Thunder Info Proxy/g, generateRoute);
  fs.writeFileSync('server.ts', content);
  console.log('Added generate-qr proxy route.');
} else {
  console.log('generate-qr proxy route already exists.');
}
