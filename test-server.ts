async function run() {
  const r = await fetch('http://localhost:3000/api/d1/init', { method: 'POST' });
  console.log(r.status);
  console.log(await r.text());
}
run();
