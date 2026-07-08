const fs = require('fs');
let content = fs.readFileSync('src/components/CustomerDatabaseModal.tsx', 'utf8');

content = content.replace(
  /balance: Number\(d\.balance\),/g,
  'balance: Number(d.balance),\n          balance_rov: Number(d.balance_rov),'
);

content = content.replace(
  /const \[editingBalanceUser, setEditingBalanceUser\] = useState<string \| null>\(null\);/g,
  'const [editingBalanceUser, setEditingBalanceUser] = useState<string | null>(null);\n  const [editingBalanceType, setEditingBalanceType] = useState<"balance"|"balance_rov">("balance");'
);

content = content.replace(
  /const balanceField = 'balance';/g,
  'const balanceField = editingBalanceType;'
);

content = content.replace(
  /<div className="flex items-center gap-1\.5 bg-emerald-500\/10 border border-emerald-500\/20 px-3 py-1\.5 rounded-xl">\s*<DollarSign className="w-3\.5 h-3\.5 text-emerald-400" \/>\s*<span className="text-emerald-400 font-mono font-bold">\{\(user\.balance \|\| 0\)\.toLocaleString\(undefined, \{ maximumFractionDigits: 2 \}\)\}<\/span>\s*<\/div>/g,
  `
                               <div className="flex flex-col gap-1">
                                 <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-lg">
                                   <DollarSign className="w-3 h-3 text-emerald-400" />
                                   <span className="text-emerald-400 font-mono text-xs font-bold">{(user.balance || 0).toLocaleString()} (สินค้า)</span>
                                 </div>
                                 <div className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded-lg">
                                   <DollarSign className="w-3 h-3 text-cyan-400" />
                                   <span className="text-cyan-400 font-mono text-xs font-bold">{(user.balance_rov || 0).toLocaleString()} (เกม)</span>
                                 </div>
                               </div>
  `
);

content = content.replace(
  /<motion\.button whileTap=\{\{ scale: 0\.95 \}\}\s*onClick=\{\(\) => \{ setEditingBalanceUser\(user\.username\); setNewBalance\(String\(user\.balance \|\| 0\)\); \}\}\s*className="p-1\.5 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer shrink-0"\s*title="แก้ไขยอดเงิน \(เติมเครดิต\)"\s*>\s*<Edit2 className="w-4 h-4" \/>\s*<\/motion\.button>/g,
  `
                                     <div className="flex flex-col gap-1">
                                       <motion.button whileTap={{ scale: 0.95 }}
                                          onClick={() => { setEditingBalanceUser(user.username); setEditingBalanceType("balance"); setNewBalance(String(user.balance || 0)); }}
                                         className="p-1.5 rounded-lg hover:bg-emerald-900/30 text-emerald-500/70 hover:text-emerald-400 transition-colors cursor-pointer shrink-0"
                                         title="แก้ไขพ้อยสินค้า"
                                       >
                                         <Edit2 className="w-3 h-3" />
                                       </motion.button>
                                       <motion.button whileTap={{ scale: 0.95 }}
                                          onClick={() => { setEditingBalanceUser(user.username); setEditingBalanceType("balance_rov"); setNewBalance(String(user.balance_rov || 0)); }}
                                         className="p-1.5 rounded-lg hover:bg-cyan-900/30 text-cyan-500/70 hover:text-cyan-400 transition-colors cursor-pointer shrink-0"
                                         title="แก้ไขพ้อยเติมเกม"
                                       >
                                         <Edit2 className="w-3 h-3" />
                                       </motion.button>
                                     </div>
  `
);

fs.writeFileSync('src/components/CustomerDatabaseModal.tsx', content);
