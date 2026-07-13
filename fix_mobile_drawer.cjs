const fs = require('fs');
let content = fs.readFileSync('src/components/MobileDrawer.tsx', 'utf8');

// Change onClick to showToast
content = content.replace(
  /onClick=\{\(\) => setAppScreen\("GAMETOPUP"\)\}/g,
  `onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: "เปิดให้บริการให้เร็วๆนี้", type: "info" } }))}`
);

// Remove balance_rov span
content = content.replace(
  /<span className="px-2 py-0\.5 rounded-md bg-cyan-500\/10 text-cyan-400 text-\[11px\] font-semibold inline-flex items-center gap-1">\s*<Wallet className="w-3 h-3" \/> ฿\{\(currentUser\.balance_rov \|\| 0\)\.toLocaleString\(\)\} \(เกม\)\s*<\/span>/g,
  ``
);

fs.writeFileSync('src/components/MobileDrawer.tsx', content);
