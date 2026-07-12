const fs = require('fs');
let topup = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

// I will just add back the `<AnimatePresence mode="wait">` right before `{topupModalStep === "select" ? (`
// wait, let's restore it from git if possible? It's not a git repo.
// I need to add `<AnimatePresence mode="wait">` back. Let's see where it belongs.

topup = topup.replace(/\{topupModalStep === "select" \? \(/, '<AnimatePresence mode="wait">\n      {topupModalStep === "select" ? (');

fs.writeFileSync('src/components/TopupPage.tsx', topup);
console.log("Restored AnimatePresence");
