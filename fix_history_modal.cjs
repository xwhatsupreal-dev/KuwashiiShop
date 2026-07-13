const fs = require('fs');
let content = fs.readFileSync('src/components/HistoryModal.tsx', 'utf8');

// Remove the button for game topup history tab
content = content.replace(
  /<button\s*onClick=\{\(\) => setActiveTab\('gametopups'\)\}\s*className=\{`pb-3 text-sm font-bold transition-all relative border-b-2 whitespace-nowrap \$\{activeTab === 'gametopups' \? 'text-\[#0ca5e9\] border-\[#0ca5e9\]' : 'text-zinc-500 border-transparent hover:text-zinc-300'\}`\}\s*>\s*ประวัติเติมเกม\s*<\/button>/g,
  ``
);

fs.writeFileSync('src/components/HistoryModal.tsx', content);
