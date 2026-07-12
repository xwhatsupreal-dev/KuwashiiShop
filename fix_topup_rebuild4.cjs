const fs = require('fs');
let content = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

content = content.replace(/\)\n\s*\)\(\);\n\s*\}\n\s*<\/div>\n\s*<\/div>\n\s*\)\}/g, ')\n             )}');
content = content.replace(/\)\n\s*\)\(\);\n\s*\}\n\s*<\/div>\n\s*<\/div>\n\s*\)\}/g, ')\n             )}'); // double check if different whitespace

// Actually, I can just replace lines 310 to 313
const lines = content.split('\n');
const fixedLines = [];
let skip = false;
for (let i = 0; i < lines.length; i++) {
   if (lines[i].includes(')();')) {
      // skip
      continue;
   }
   if (lines[i].trim() === '}' && lines[i-1].includes(')();')) {
       continue;
   }
   if (lines[i].trim() === '</div>' && lines[i-2].includes(')();')) {
       continue;
   }
   if (lines[i].trim() === '</div>' && lines[i-3].includes(')();')) {
       continue;
   }
   fixedLines.push(lines[i]);
}

fs.writeFileSync('src/components/TopupPage.tsx', fixedLines.join('\n'));
