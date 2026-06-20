import * as fs from 'fs';

const file = 'src/App.tsx';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

const startIndex = lines.findIndex(l => l.includes('{/* Top Up Modal - Disabled'));
const endIndex = lines.findIndex((l, i) => i > startIndex && l.includes('{/* Inquiry Summary & Clipboard tool modal */}'));

if (startIndex !== -1 && endIndex !== -1) {
  lines.splice(startIndex, endIndex - startIndex);
  fs.writeFileSync(file, lines.join('\n'));
  console.log(`Deleted lines ${startIndex + 1} to ${endIndex}`);
} else {
  console.log('Not found');
}
