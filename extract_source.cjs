const fs = require('fs');
const sm = JSON.parse(fs.readFileSync('sourcemap.json', 'utf8'));
const index = sm.sources.indexOf('/src/App.tsx');
if (index !== -1) {
    fs.writeFileSync('src/App.tsx', sm.sourcesContent[index]);
    console.log("SUCCESS! Extracted src/App.tsx, length:", sm.sourcesContent[index].length);
} else {
    console.log("Could not find /src/App.tsx in sources.");
    console.log("Available sources:", sm.sources);
}
