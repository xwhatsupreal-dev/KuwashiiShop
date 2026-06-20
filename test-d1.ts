async function run() {
  const r1 = await fetch(`https://api.cloudflare.com/client/v4/accounts//d1/database//query`, { method: 'POST' });
  const data = await r1.text();
  console.log("errors:", data);
}
run();
