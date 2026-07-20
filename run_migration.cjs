const fs = require('fs');

let server = fs.readFileSync('server.ts', 'utf8');

const migrationToAdd = `
    await fetch(\`https://api.cloudflare.com/client/v4/accounts/\${accountId}/d1/database/\${dbId}/query\`, {
      method: "POST",
      headers: {
        "Authorization": \`Bearer \${token}\`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sql: "ALTER TABLE profiles ADD COLUMN member_id TEXT;" })
    }).catch(() => {});
`;

if (!server.includes("ALTER TABLE profiles ADD COLUMN member_id TEXT")) {
    server = server.replace(
        /body: JSON\.stringify\(\{ sql: "ALTER TABLE system_config ADD COLUMN all_time_sales_count INTEGER DEFAULT 0;" \}\)\s*\}\)\.catch\(\(\) => \{\}\);/,
        `body: JSON.stringify({ sql: "ALTER TABLE system_config ADD COLUMN all_time_sales_count INTEGER DEFAULT 0;" })\n    }).catch(() => {});\n${migrationToAdd}`
    );
    fs.writeFileSync('server.ts', server);
}
