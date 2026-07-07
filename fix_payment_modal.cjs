const fs = require('fs');
let content = fs.readFileSync('./src/components/PaymentSettingsModal.tsx', 'utf8');

content = content.replace(
  `<button
                  onClick={() => setActiveTab('allstar')}
                  className={\`flex-1 py-3 text-sm font-bold \${activeTab === 'allstar' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-zinc-500'}\`}
               >
                 บัญชีชำระเงิน
               </button>`,
  `<button
                  onClick={() => setActiveTab('allstar')}
                  className={\`flex-1 py-3 text-sm font-bold \${activeTab === 'allstar' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-zinc-500'}\`}
               >
                 บัญชีเติมเครดิต
               </button>
               <button
                  onClick={() => setActiveTab('rov')}
                  className={\`flex-1 py-3 text-sm font-bold \${activeTab === 'rov' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-zinc-500'}\`}
               >
                 บัญชีเติมเกม
               </button>`
);

content = content.replace(
  `{activeTab === 'allstar' && ConfigForm({ title: "สำหรับเติมเครดิต", prefix: "", isRov: false })}`,
  `{activeTab === 'allstar' && ConfigForm({ title: "สำหรับเติมเครดิต", prefix: "", isRov: false })}
               {activeTab === 'rov' && ConfigForm({ title: "สำหรับรับเติมเกม", prefix: "rov_", isRov: true })}`
);

content = content.replace(
  `const [activeTab, setActiveTab] = useState<'allstar' | 'general'>('general');`,
  `const [activeTab, setActiveTab] = useState<'allstar' | 'general' | 'rov'>('general');`
);

fs.writeFileSync('./src/components/PaymentSettingsModal.tsx', content, 'utf8');
console.log('Fixed PaymentSettingsModal');
