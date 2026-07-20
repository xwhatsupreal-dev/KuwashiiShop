const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf8');
content = content.replace(
  /username: string;/,
  `username: string;
  member_id?: string;`
);
fs.writeFileSync('src/types.ts', content);
