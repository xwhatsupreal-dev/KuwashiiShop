fetch('https://api.thunder.in.th/v2/verify/bank', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + (process.env.THUNDER_API_KEY || 'test')
  },
  body: JSON.stringify({ base64: "test" })
}).then(r => r.json()).then(console.log).catch(console.error);
