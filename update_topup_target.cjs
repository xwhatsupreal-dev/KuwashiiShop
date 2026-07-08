const fs = require('fs');
let content = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

const target = /<h2 className="text-2xl sm:text-3xl font-bold mb-2 font-display">ช่องทางการชำระเงิน<\/h2>\s*<p className="text-zinc-500 text-xs sm:text-sm font-sans">เลือกช่องทางที่ต้องการเพื่อเติมเงินเข้าบัญชีของคุณ<\/p>\s*<\/motion\.div>/g;

const replacement = `
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 font-display">ช่องทางการชำระเงิน</h2>
        <p className="text-zinc-500 text-xs sm:text-sm font-sans">เลือกช่องทางที่ต้องการเพื่อเติมเงินเข้าบัญชีของคุณ</p>
      </motion.div>
      
      {/* Target Balance Selection */}
      <div className="flex flex-col gap-2 mb-6">
        <label className="text-xs text-zinc-400 font-bold px-1">เลือกกระเป๋าเงินที่ต้องการเติม</label>
        <div className="flex gap-2 p-1.5 bg-black/60 border border-zinc-800 rounded-xl">
          <button
            onClick={() => setTopupTarget('balance')}
            className={\`flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 \${topupTarget === 'balance' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300 border border-transparent'}\`}
          >
            🛒 พ้อยซื้อสินค้า
          </button>
          <button
            onClick={() => setTopupTarget('balance_rov')}
            className={\`flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 \${topupTarget === 'balance_rov' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300 border border-transparent'}\`}
          >
            🎮 พ้อยเติมเกม
          </button>
        </div>
      </div>
`;

content = content.replace(target, replacement);

fs.writeFileSync('src/components/TopupPage.tsx', content);
