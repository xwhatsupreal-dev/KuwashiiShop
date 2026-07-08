const fs = require('fs');
let content = fs.readFileSync('src/components/GameTopupPage.tsx', 'utf8');

const target = /<label className="block text-sm font-medium text-zinc-300 mb-2">Game ID \/ Player ID<\/label>/g;
const replacement = `
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-zinc-300">Game ID / Player ID</label>
                <span className="text-xs text-cyan-400 font-bold bg-cyan-500/10 px-2 py-1 rounded-lg">พ้อยเติมเกม: ฿{(currentUser?.balance_rov || 0).toLocaleString()}</span>
              </div>
`;
content = content.replace(target, replacement);

fs.writeFileSync('src/components/GameTopupPage.tsx', content);
