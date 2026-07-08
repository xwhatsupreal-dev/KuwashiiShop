const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = /useEffect\(\(\) => \{\s*setTopupModalStep\("select"\);\s*\}, \[appScreen, topupTarget\]\);/;
const replacement = `useEffect(() => {
    setTopupModalStep("select");
    setTopupCode("");
    setSlipFile(null);
  }, [appScreen, topupTarget]);`;

content = content.replace(target, replacement);
fs.writeFileSync('src/App.tsx', content);
