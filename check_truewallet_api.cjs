const http = require('https');
http.get('https://document.thunder.in.th/th/v2/verify/bank/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const text = data.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ');
    if (text.includes('truewallet')) {
      console.log('TrueWallet info found in bank page');
    }
  });
});
