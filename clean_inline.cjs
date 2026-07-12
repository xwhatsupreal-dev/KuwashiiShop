const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// We still have topupError state in App.tsx? We can leave it or remove it.
// Let's just remove the props from TopupPage render.
code = code.replace(/errorMessage=\{topupError\}/g, '');
code = code.replace(/successMessage=\{topupSuccessMessage\}/g, '');

fs.writeFileSync('src/App.tsx', code);

let topup = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');
topup = topup.replace(/errorMessage,\n  successMessage/g, '');

const inlineRegex = /<AnimatePresence mode="wait">[\s\S]*?<\/AnimatePresence>/g;
topup = topup.replace(inlineRegex, '');
fs.writeFileSync('src/components/TopupPage.tsx', topup);

console.log("Removed inline messages");
