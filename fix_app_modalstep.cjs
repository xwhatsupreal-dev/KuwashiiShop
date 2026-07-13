const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Update the type
content = content.replace(
  /"select" \| "angpao" \| "bank" \| "coupon" \| "success"/g,
  `"select" | "angpao" | "bank" | "bank_generate" | "coupon" | "success"`
);

fs.writeFileSync('src/App.tsx', content);
