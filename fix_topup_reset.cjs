const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = /useEffect\(\(\) => \{\s*setTopupModalStep\("select"\);\s*\}, \[appScreen\]\);/;
const replacement = `useEffect(() => {
    setTopupModalStep("select");
  }, [appScreen, topupTarget]);`;

if (content.includes(target.source.replace(/\\/g, '').split('useEffect')[0].trim())) {
    content = content.replace(target, replacement);
    fs.writeFileSync('src/App.tsx', content);
    console.log("Updated topup reset effect");
} else {
    console.log("Target not found");
}
