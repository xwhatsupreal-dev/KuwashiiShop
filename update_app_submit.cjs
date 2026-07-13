const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /if \(\(topupModalStep === "bank" \|\| topupModalStep === "angpao"\) && !slipFile\)/g,
  `if ((topupModalStep === "bank" || topupModalStep === "bank_generate" || topupModalStep === "angpao") && !slipFile)`
);

content = content.replace(
  /if \(topupModalStep === "bank"\) \{/g,
  `if (topupModalStep === "bank" || topupModalStep === "bank_generate") {`
);

fs.writeFileSync('src/App.tsx', content);
