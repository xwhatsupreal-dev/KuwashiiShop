const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(
  /<TopupPage\n                tosAccepted=/g,
  `<TopupPage\n                topupTarget={topupTarget}\n                setTopupTarget={setTopupTarget}\n                tosAccepted=`
);
fs.writeFileSync('src/App.tsx', content);
