const fs = require('fs');
let content = fs.readFileSync('./src/components/HistoryModal.tsx', 'utf8');

// Add game topups tab
content = content.replace(
  `initialTab?: 'purchases' | 'topups';`,
  `initialTab?: 'purchases' | 'topups' | 'gametopups';`
);

content = content.replace(
  `const [activeTab, setActiveTab] = useState<'purchases' | 'topups'>(initialTab);`,
  `const [activeTab, setActiveTab] = useState<'purchases' | 'topups' | 'gametopups'>(initialTab);`
);

content = content.replace(
  `<button 
              onClick={() => setActiveTab('topups')}
              className={\`pb-3 text-sm font-bold transition-all relative border-b-2 whitespace-nowrap \${activeTab === 'topups' ? 'text-[#0ca5e9] border-[#0ca5e9]' : 'text-zinc-500 border-transparent hover:text-zinc-300'}\`}
            >
              การเติมเงิน
            </button>`,
  `<button 
              onClick={() => setActiveTab('topups')}
              className={\`pb-3 text-sm font-bold transition-all relative border-b-2 whitespace-nowrap \${activeTab === 'topups' ? 'text-[#0ca5e9] border-[#0ca5e9]' : 'text-zinc-500 border-transparent hover:text-zinc-300'}\`}
            >
              การเติมเงิน
            </button>
            <button 
              onClick={() => setActiveTab('gametopups')}
              className={\`pb-3 text-sm font-bold transition-all relative border-b-2 whitespace-nowrap \${activeTab === 'gametopups' ? 'text-[#0ca5e9] border-[#0ca5e9]' : 'text-zinc-500 border-transparent hover:text-zinc-300'}\`}
            >
              ประวัติเติมเกม
            </button>`
);

content = content.replace(
  `const filteredPurchases = sortedPurchases.filter(p => !searchTerm || p.itemName.toLowerCase().includes(searchTerm.toLowerCase()));`,
  `const filteredNormalPurchases = sortedPurchases.filter(p => p.game !== 'GAMETOPUP' && (!searchTerm || p.itemName.toLowerCase().includes(searchTerm.toLowerCase())));
  const filteredGameTopups = sortedPurchases.filter(p => p.game === 'GAMETOPUP' && (!searchTerm || p.itemName.toLowerCase().includes(searchTerm.toLowerCase())));`
);

content = content.replace(
  `{activeTab === 'purchases' && (
              <div>
                <div className="mb-4 bg-zinc-900/50 rounded-xl p-4 border border-white/5 space-y-3">`,
  `{activeTab === 'purchases' && (
              <div>
                <div className="mb-4 bg-zinc-900/50 rounded-xl p-4 border border-white/5 space-y-3">`
);

// We need to replace filteredPurchases.map with filteredNormalPurchases.map
content = content.replace(
  `filteredPurchases.length === 0`,
  `filteredNormalPurchases.length === 0`
);

content = content.replace(
  `filteredPurchases.map((purchase)`,
  `filteredNormalPurchases.map((purchase)`
);

// Add the gametopups render section
content = content.replace(
  `{activeTab === 'topups' && (`,
  `{activeTab === 'gametopups' && (
              filteredGameTopups.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mx-auto mb-4 text-zinc-500">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-zinc-400 font-medium">ยังไม่มีประวัติการเติมเกม</p>
                </div>
              ) : (
                filteredGameTopups.map((purchase) => (
                  <motion.div 
                    key={purchase.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 hover:bg-zinc-900/80 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold text-white text-sm sm:text-base mb-1">{purchase.itemName}</div>
                        <div className="text-xs text-zinc-400 flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {formatThaiDate(purchase.date)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-cyan-400">฿{purchase.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                        <div className="text-xs text-zinc-500 mt-1">จำนวน: {purchase.quantity}</div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )
            )}
            {activeTab === 'topups' && (`
);

fs.writeFileSync('./src/components/HistoryModal.tsx', content, 'utf8');
console.log('Fixed HistoryModal');
