const fs = require('fs');
let content = fs.readFileSync('src/components/PaymentSettingsModal.tsx', 'utf8');

content = content.replace(
  /<button\s*onClick=\{\(\) => setActiveTab\('rov'\)\}\s*className=\{`flex-1 py-3 text-sm font-bold border-b-2 transition-colors \$\{activeTab === 'rov' \? 'border-cyan-500 text-cyan-400 bg-cyan-500\/5' : 'border-transparent text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800\/50'\}`\}\s*>\s*ตั้งค่า เติมพ้อยเกม\s*<\/button>/g,
  ``
);

content = content.replace(
  /\{activeTab === 'rov' && ConfigForm\(\{ title: "สำหรับรับเติมเกม", prefix: "rov_", isRov: true \}\)\}/g,
  ``
);

fs.writeFileSync('src/components/PaymentSettingsModal.tsx', content);
