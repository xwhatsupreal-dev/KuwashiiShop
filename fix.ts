import * as fs from 'fs';

const file = 'src/App.tsx';
const lines = fs.readFileSync(file, 'utf8').split('\n');
const newLines = [...lines.slice(0, 2650), ...lines.slice(2795)];
fs.writeFileSync(file, newLines.join('\n'));
