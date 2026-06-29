async function main() {
  const req = await fetch('http://localhost:3000/api/d1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sql: "SELECT * FROM system_config WHERE id = 'main'"
    })
  });
  const res = await req.json();
  console.log('system_config:', JSON.stringify(res, null, 2));
}
main();
