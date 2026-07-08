const fs = require('fs');
let content = fs.readFileSync('src/components/ApiStatusModal.tsx', 'utf8');

const target1 = /\) : \(\n\s*<span className="text-zinc-500 text-xs font-medium">-/g;
content = content.replace(target1, `\n                      ) : (\n                         <span className="text-zinc-500 text-xs font-medium">-`);

// Wait, let's just do a clean replace using standard string methods.
content = content.replace(`                         ) : (
                         <span className="text-zinc-500 text-xs font-medium">-</span>
                      )}`, `                      ) : (
                         <span className="text-zinc-500 text-xs font-medium">-</span>
                      )}`);

fs.writeFileSync('src/components/ApiStatusModal.tsx', content);
