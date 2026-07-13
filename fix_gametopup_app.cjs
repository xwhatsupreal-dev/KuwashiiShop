const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /onClick=\{\(\) => \{\n\s*setAppScreen\("GAMETOPUP"\);\n\s*\}\}/g,
  `onClick={() => {\n                            showToast("เปิดให้บริการให้เร็วๆนี้", "info");\n                          }}`
);

fs.writeFileSync('src/App.tsx', content);
