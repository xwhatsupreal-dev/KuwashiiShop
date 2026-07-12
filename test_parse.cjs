const fs = require('fs');
const ts = require('typescript');
const src = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

const sourceFile = ts.createSourceFile(
    'src/components/TopupPage.tsx',
    src,
    ts.ScriptTarget.Latest,
    true
);
console.log("TS parsed!");
