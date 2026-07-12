const fs = require('fs');
const code = fs.readFileSync('server.ts', 'utf8').split('\n');

let depth = 0;
for (let i = 0; i < code.length; i++) {
  for (let j = 0; j < code[i].length; j++) {
    if (code[i][j] === '{') depth++;
    if (code[i][j] === '}') depth--;
  }
  if (depth < 0) {
     console.log('Negative depth at line ' + (i+1));
     break;
  }
  if (code[i].startsWith('app.post') || code[i].startsWith('app.get')) {
     if (depth !== 0) console.log('Depth at ' + code[i].substring(0, 30) + ' is ' + depth + ' on line ' + (i+1));
  }
}
console.log('Final depth:', depth);
