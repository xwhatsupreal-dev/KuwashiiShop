const fs = require('fs');
let content = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

// Add props to destructuring
content = content.replace(
  /export const TopupPage = \(\{ /g,
  `export const TopupPage = ({ \n  topupTarget,\n  setTopupTarget,\n  `
);

// Add toggle UI in topupModalStep === "select"
const selectUI = `
          <h2 className="text-xl sm:text-2xl font-black text-white mb-2 font-display">ช่องทางการเติมเงิน</h2>
          <p className="text-sm text-zinc-400 mb-6 font-sans">เลือกช่องทางที่คุณสะดวกเพื่อทำรายการ</p>

          <div className="flex gap-2 p-1 bg-zinc-800/50 rounded-xl mb-6">
            <button
              onClick={() => setTopupTarget('balance')}
              className={\`flex-1 py-2 text-sm font-bold rounded-lg transition-all \${topupTarget === 'balance' ? 'bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/20' : 'text-zinc-400 hover:text-white'}\`}
            >
              🟢 พ้อยสินค้า
            </button>
            <button
              onClick={() => setTopupTarget('balance_rov')}
              className={\`flex-1 py-2 text-sm font-bold rounded-lg transition-all \${topupTarget === 'balance_rov' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' : 'text-zinc-400 hover:text-white'}\`}
            >
              🎮 พ้อยเติมเกม
            </button>
          </div>
`;

content = content.replace(
  /<h2 className="text-xl sm:text-2xl font-black text-white mb-2 font-display">ช่องทางการเติมเงิน<\/h2>\s*<p className="text-sm text-zinc-400 mb-6 font-sans">เลือกช่องทางที่คุณสะดวกเพื่อทำรายการ<\/p>/g,
  selectUI
);

fs.writeFileSync('src/components/TopupPage.tsx', content);
