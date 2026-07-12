const fs = require('fs');
let content = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');
content = content.replace(/\);\n\s*\)\}\)\(\)\}/g, '\n                  ); // end return\n                })()}');
fs.writeFileSync('src/components/TopupPage.tsx', content);
