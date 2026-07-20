const fs = require('fs');

let server = fs.readFileSync('server.ts', 'utf8');

const regex = /body: JSON\.stringify\(\{ sql: "ALTER TABLE profiles ADD COLUMN member_id TEXT;" \}\)/;
const replacement = `body: JSON.stringify({ sql: "ALTER TABLE profiles ADD COLUMN member_id TEXT;" })
    }).catch(() => {});
    
    // Assign random 6 digit ID to existing users
    await fetch(\`https://api.cloudflare.com/client/v4/accounts/\${accountId}/d1/database/\${dbId}/query\`, {
      method: "POST",
      headers: {
        "Authorization": \`Bearer \${token}\`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sql: "UPDATE profiles SET member_id = CAST(ABS(RANDOM()) % 900000 + 100000 AS TEXT) WHERE member_id IS NULL;" })`;
      
if (server.includes('ALTER TABLE profiles ADD COLUMN member_id TEXT;')) {
    server = server.replace(regex, replacement);
    fs.writeFileSync('server.ts', server);
}
