const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = /useEffect\(\(\) => \{\s*setTopupModalStep\("select"\);\s*\}, \[appScreen, topupTarget\]\);/;
content = content.replace(target, "");

const stateTarget = /const \[topupTarget, setTopupTarget\] = useState<"balance" \| "balance_rov">\["balance"\];/.test(content) ? /const \[topupTarget, setTopupTarget\] = useState<"balance" \| "balance_rov">\["balance"\];/ : /const \[topupTarget, setTopupTarget\] = useState<"balance" \| "balance_rov">\("balance"\);/;

content = content.replace(stateTarget, `const [topupTarget, setTopupTarget] = useState<"balance" | "balance_rov">("balance");

  useEffect(() => {
    setTopupModalStep("select");
  }, [appScreen, topupTarget]);`);

fs.writeFileSync('src/App.tsx', content);
