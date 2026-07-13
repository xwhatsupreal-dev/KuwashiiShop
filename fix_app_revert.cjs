const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /\| "bank_generate" /g,
  ""
);

content = content.replace(
  /\|\| topupModalStep === "bank_generate" /g,
  ""
);

fs.writeFileSync('src/App.tsx', content);
