const fs = require('fs');
let content = fs.readFileSync('src/components/ShopHeader.tsx', 'utf8');

const startIdx = content.indexOf('<div \n                onClick={() => setAppScreen?.("PROFILE")}');
const endIdx = content.indexOf('</button>\n            </div>\n          ) : (');

if (startIdx !== -1 && endIdx !== -1) {
    const replacement = `<div className="relative" ref={dropdownRef}>
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 bg-zinc-900 border border-white/10 px-2 py-1.5 rounded-full cursor-pointer hover:bg-zinc-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 overflow-hidden border border-white/5">
                  {currentUser.avatar_url || currentUser.avatar ? (
                    <img src={currentUser.avatar_url || currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
              </div>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-56 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col font-sans"
                  >
                    <div className="p-3 border-b border-white/5 bg-zinc-900/50">
                      <h4 className="font-bold text-white text-[14px] truncate">{currentUser.username}</h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Smile className="w-3 h-3 text-zinc-400" />
                        <span className="text-[10px] font-bold text-zinc-400 tracking-wider">MEMBER</span>
                      </div>
                      <p className="text-[11px] text-zinc-300 mt-1.5 font-medium">ยอดเงิน: <span className="text-white">฿{(currentUser.balance || 0).toLocaleString()}</span></p>
                    </div>
                    <div className="p-1.5 flex flex-col gap-0.5">
                      <button 
                        onClick={() => { setAppScreen?.("PROFILE"); setIsDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors text-[12px] font-medium group"
                      >
                        <Settings className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" /> จัดการโปรไฟล์
                      </button>
                      <button 
                        onClick={() => { setAppScreen?.("PROFILE"); setIsDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors text-[12px] font-medium group"
                      >
                        <Box className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" /> สถานะคำสั่งซื้อ
                      </button>
                      <button 
                        onClick={() => { setAppScreen?.("TOPUP"); setIsDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors text-[12px] font-medium group"
                      >
                        <Wallet className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" /> เติมเงิน
                      </button>
                      <button 
                        onClick={() => { setAppScreen?.("PROFILE"); setIsDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors text-[12px] font-medium group"
                      >
                        <History className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" /> ประวัติการเติมเงิน
                      </button>
                      <button 
                        onClick={() => { window.open('https://discord.gg/AQKtJpvyva', '_blank'); setIsDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors text-[12px] font-medium group"
                      >
                        <Phone className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" /> ติดต่อเรา
                      </button>
                      <button 
                        onClick={() => { if (onLogout) onLogout(); setIsDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-500 transition-colors text-[12px] font-medium group mt-1 border-t border-white/5 pt-2"
                      >
                        <LogOut className="w-3.5 h-3.5 text-red-500 group-hover:text-red-500 transition-colors" /> ออกจากระบบ
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>\n`;

    content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
    fs.writeFileSync('src/components/ShopHeader.tsx', content);
    console.log('Success');
} else {
    console.log('Not found:', startIdx, endIdx);
}
