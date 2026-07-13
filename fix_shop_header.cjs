const fs = require('fs');
let content = fs.readFileSync('src/components/ShopHeader.tsx', 'utf8');

// Change onClick to showToast
content = content.replace(
  /setAppScreen\?\.\("GAMETOPUP"\);/g,
  `window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: "เปิดให้บริการให้เร็วๆนี้", type: "info" } }));`
);

// Remove balance_rov span
content = content.replace(
  /<span className="text-\[10px\] text-cyan-500 font-semibold">เติมเกม: ฿\{\(currentUser\.balance_rov \|\| 0\)\.toLocaleString\(\)\}<\/span>/g,
  ``
);

fs.writeFileSync('src/components/ShopHeader.tsx', content);
