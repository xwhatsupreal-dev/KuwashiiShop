fetch('https://api.thunder.in.th/v2/verify/bank', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.THUNDER_API_KEY}`
  },
  body: JSON.stringify({ base64: "test", matchAccount: true, checkDuplicate: true })
}).then(res => res.json()).then(console.log).catch(console.error);
