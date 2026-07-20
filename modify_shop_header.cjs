const fs = require('fs');

let content = fs.readFileSync('src/components/ShopHeader.tsx', 'utf8');

const importRegex = /import \{ Search, Menu, LogIn, User, CircleDollarSign, Home, ShoppingBag, Wallet, LogOut, Gamepad2 \} from 'lucide-react';/;
const importReplacement = `import { Search, Menu, LogIn, User, CircleDollarSign, Home, ShoppingBag, Wallet, LogOut, Gamepad2, Settings, Box, History, Phone, Smile } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useRef, useEffect } from 'react';`;

content = content.replace(importRegex, importReplacement);

// Add state for dropdown
const componentStartRegex = /const \[isLogoLoaded, setIsLogoLoaded\] = useState\(false\);/;
const componentStartReplacement = `const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);`;

content = content.replace(componentStartRegex, componentStartReplacement);

// Replace the profile button with the new dropdown logic
const profileBtnRegex = /<div \s*onClick=\{\(\) => setAppScreen\?\("PROFILE"\)\}\s*className="flex items-center gap-3 bg-blue-900\/20 border border-blue-900\/40 px-3 py-1\.5 rounded-full cursor-pointer hover:bg-blue-900\/20 transition-colors"\s*>\s*<div className="flex flex-col items-end hidden sm:flex">\s*<span className="text-xs font-bold text-zinc-200">\{currentUser\.username\}<\/span>\s*<div className="flex flex-col items-end">\s*<span className="text-\[10px\] text-\[#0ea5e9\] font-semibold">ยอดเงิน: ฿\{\(currentUser\.balance \|\| 0\)\.toLocaleString\(\)\}<\/span>\s*<\/div>\s*<\/div>\s*<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden">\s*\{currentUser\.avatar_url \|\| currentUser\.avatar \? \(\s*<img src=\{currentUser\.avatar_url \|\| currentUser\.avatar\} alt="Profile" className="w-full h-full object-cover" \/>\s*\) : \(\s*<User className="w-4 h-4" \/>\s*\)\}\s*<\/div>\s*<\/div>/;

const profileBtnReplacement = `<div className="relative" ref={dropdownRef}>
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
                    className="absolute right-0 mt-3 w-64 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col font-sans"
                  >
                    <div className="p-4 border-b border-white/5">
                      <h4 className="font-bold text-white text-[15px] truncate">{currentUser.username}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <Smile className="w-3 h-3 text-zinc-400" />
                        <span className="text-[11px] font-bold text-zinc-400 tracking-wider">MEMBER</span>
                      </div>
                      <p className="text-[12px] text-zinc-400 mt-2">ยอดเงิน: ฿{(currentUser.balance || 0).toLocaleString()}</p>
                    </div>
                    <div className="p-2 flex flex-col gap-1">
                      <button 
                        onClick={() => { setAppScreen?.("PROFILE"); setIsDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-zinc-300 hover:text-white transition-colors text-[13px]"
                      >
                        <Settings className="w-4 h-4 text-zinc-400" /> จัดการโปรไฟล์
                      </button>
                      <button 
                        onClick={() => { setAppScreen?.("PROFILE"); setIsDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-zinc-300 hover:text-white transition-colors text-[13px]"
                      >
                        <Box className="w-4 h-4 text-zinc-400" /> สถานะคำสั่งซื้อ
                      </button>
                      <button 
                        onClick={() => { setAppScreen?.("TOPUP"); setIsDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-zinc-300 hover:text-white transition-colors text-[13px]"
                      >
                        <Wallet className="w-4 h-4 text-zinc-400" /> เติมเงิน
                      </button>
                      <button 
                        onClick={() => { setAppScreen?.("PROFILE"); setIsDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-zinc-300 hover:text-white transition-colors text-[13px]"
                      >
                        <History className="w-4 h-4 text-zinc-400" /> ประวัติการเติมเงิน
                      </button>
                      <button 
                        onClick={() => { window.open('https://discord.gg/AQKtJpvyva', '_blank'); setIsDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-zinc-300 hover:text-white transition-colors text-[13px]"
                      >
                        <Phone className="w-4 h-4 text-zinc-400" /> ติดต่อเรา
                      </button>
                      <button 
                        onClick={() => { if (onLogout) onLogout(); setIsDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-zinc-300 hover:text-white transition-colors text-[13px]"
                      >
                        <LogOut className="w-4 h-4 text-zinc-400" /> ออกจากระบบ
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>`;

content = content.replace(profileBtnRegex, profileBtnReplacement);

// Remove the standalone logout button since it's now in the dropdown
content = content.replace(/<button \s*onClick=\{onLogout\}\s*className="hidden md:flex p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500\/10 rounded-full transition-colors"\s*title="ออกจากระบบ"\s*>\s*<LogOut className="w-5 h-5" \/>\s*<\/button>/, '');


fs.writeFileSync('src/components/ShopHeader.tsx', content);
