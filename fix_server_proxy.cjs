const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace(/'Content-Type': 'application\/x-www-form-urlencoded',/g, `'Content-Type': 'application/x-www-form-urlencoded',\n        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',`);

fs.writeFileSync('server.ts', content);
