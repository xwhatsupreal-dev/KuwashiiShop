const fs = require('fs');
let content = fs.readFileSync('src/components/ApiStatusModal.tsx', 'utf8');

content = content.replace(/<span className="px-3 py\.5 bg-red-500\/20 text-red-500 text-xs font-bold rounded-full">Offline<\/span>\n\s*\n\s*\) : \(/g, `<span className="px-3 py-1.5 bg-red-500/20 text-red-500 text-xs font-bold rounded-full">Offline</span>\n                         )\n                      ) : (`);

// Let's just do a blanket replace:
content = content.replace(/Offline<\/span>\n\s*\n\s*\) : \(/g, `Offline</span>\n                         )\n                      ) : (`);

fs.writeFileSync('src/components/ApiStatusModal.tsx', content);
