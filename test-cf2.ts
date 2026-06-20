async function run() {
  const accountId = 'xxx';
  const dbId = 'xxx';
  const token = 'xxx';
  
  const urls = [
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${dbId}/query`,
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/databases/${dbId}/query`
  ];
  for (let u of urls) {
     const r = await fetch(u, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
     const json = await r.json();
     console.log(u, json);
  }
}
run();
