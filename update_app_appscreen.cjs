const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = /useEffect\(\(\) => \{\s*window\.scrollTo\(\{ top: 0, behavior: "smooth" \}\);\s*\}, \[appScreen, selectedCategory\]\);/;
const replacement = `useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [appScreen, selectedCategory]);

  useEffect(() => {
    setTopupModalStep("select");
  }, [appScreen]);`;

if (content.includes(target.source.replace(/\\/g, '').split('useEffect')[0].trim())) { // Simplified check
    content = content.replace(target, replacement);
    fs.writeFileSync('src/App.tsx', content);
    console.log("Updated appScreen useEffect");
} else {
    console.log("Target not found");
}
