import { fetch } from 'undici';
import fs from 'fs';
const serverCode = fs.readFileSync('server.ts', 'utf8');
const accountId = serverCode.match(/const accountId = "(.*?)";/)?.[1];
const token = serverCode.match(/const token = "(.*?)";/)?.[1];
const dbId = serverCode.match(/const dbId = "(.*?)";/)?.[1];

(async () => {
  const rs = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${dbId}/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ sql: "SELECT * FROM activities WHERE type='purchase';" })
  }).then(r => r.json());
  console.log(JSON.stringify(rs, null, 2));
})();
