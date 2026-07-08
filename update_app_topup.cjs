const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// replace inside handleTopupSubmit
// we can just replace `const balanceField = "balance";` with `const balanceField = topupTarget;` in App.tsx
content = content.replace(/const balanceField = "balance";/g, 'const balanceField = topupTarget;');

fs.writeFileSync('src/App.tsx', content);
