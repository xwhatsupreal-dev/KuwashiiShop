const fs = require('fs');
let content = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

content = content.replace(/\)\}\)\(\)\}\n\s*<\/div>\n\s*\)\}/g, ')\n                      })();\n                    }\n                  </div>\n                </div>\n             )}');

fs.writeFileSync('src/components/TopupPage.tsx', content);
