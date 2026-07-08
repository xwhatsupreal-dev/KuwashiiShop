const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Find the block:
// const [topupTarget, setTopupTarget] = useState<"balance" | "balance_rov">("balance");
//   useEffect(() => {
//     setTopupModalStep("select");
//   }, [appScreen, topupTarget]);
// and move the useEffect BELOW where topupModalStep is defined.

const target = /const \[topupTarget, setTopupTarget\] = useState<"balance" \| "balance_rov">\("balance"\);\s*useEffect\(\(\) => \{\s*setTopupModalStep\("select"\);\s*\}, \[appScreen, topupTarget\]\);/;

content = content.replace(target, 'const [topupTarget, setTopupTarget] = useState<"balance" | "balance_rov">("balance");');

const insertTarget = /const \[topupModalStep, setTopupModalStep\] = useState<[\s\S]*?>\("select"\);/;

content = content.replace(insertTarget, (match) => {
  return `${match}
  
  useEffect(() => {
    setTopupModalStep("select");
  }, [appScreen, topupTarget]);
  `;
});

fs.writeFileSync('src/App.tsx', content);
