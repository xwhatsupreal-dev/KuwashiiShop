const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// The messed up lines are from `});` (that was supposed to be the end) down to the real `});`.
// Actually, it's easier to find the `// Bank Slip Proxy` or `app.post("/api/topup/bank"`
// And remove everything between `res.status(500).json({ status: "error", message: "API Error" });\n  }\n});`
// and `// Bank Slip Proxy` or the next endpoint.

const errorRegex = /res\.status\(500\)\.json\(\{ status: "error", message: "API Error" \}\);\n  \}\n\}\);[\s\S]*?\}\);/m;

content = content.replace(errorRegex, 'res.status(500).json({ status: "error", message: "API Error" });\n  }\n});');

fs.writeFileSync('server.ts', content);
