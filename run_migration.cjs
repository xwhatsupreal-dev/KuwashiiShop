const fs = require('fs');

async function main() {
  const req = await fetch('http://localhost:3000/api/d1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sql: "ALTER TABLE system_config ADD COLUMN maintenance_mode BOOLEAN DEFAULT FALSE;"
    })
  });
  const res = await req.json();
  console.log('Migrate maintenance_mode:', JSON.stringify(res, null, 2));

  const req2 = await fetch('http://localhost:3000/api/d1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sql: "ALTER TABLE system_config ADD COLUMN announcement_settings TEXT;"
    })
  });
  const res2 = await req2.json();
  console.log('Migrate announcement_settings:', JSON.stringify(res2, null, 2));
}

main();
