const fs = require('fs');
let content = fs.readFileSync('src/components/MobileDrawer.tsx', 'utf8');

const notUserReplacement = `<div className="flex-1 flex flex-col pt-4 space-y-4">
                    <div className="space-y-1">
                      <MenuListItem
                         icon={<Home className="w-[18px] h-[18px] text-zinc-400 group-hover:text-white transition-colors" />}
                         iconClassName="bg-transparent"
                         title="หน้าแรก"
                         rightElement={<span />}
                         onClick={() => {
                           setPage?.('SHOP');
                           onClose();
                         }}
                       />
                       <MenuListItem
                         icon={<LayoutGrid className="w-[18px] h-[18px] text-zinc-400 group-hover:text-white transition-colors" />}
                         iconClassName="bg-transparent"
                         title="หมวดหมู่สินค้า"
                         rightElement={<span />}
                         onClick={() => {
                           setPage?.('SHOP');
                           onClose();
                         }}
                       />
                       <MenuListItem
                         icon={<ShoppingBag className="w-[18px] h-[18px] text-zinc-400 group-hover:text-white transition-colors" />}
                         iconClassName="bg-transparent"
                         title="สินค้าทั้งหมด"
                         rightElement={<span />}
                         onClick={() => {
                           setPage?.('SHOP');
                           onClose();
                         }}
                       />
                       <div onClick={() => window.open('https://discord.gg/AQKtJpvyva', '_blank')}>
                         <MenuListItem
                           icon={<Phone className="w-[18px] h-[18px] text-zinc-400 group-hover:text-white transition-colors" />}
                           iconClassName="bg-transparent"
                           title="ติดต่อเรา"
                           rightElement={<span />}
                         />
                       </div>
                    </div>

                    <div className="relative py-4 flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center px-4">
                        <div className="w-full border-t border-white/10"></div>
                      </div>
                      <div className="relative bg-[#0a0a0a] px-3">
                        <span className="text-xs font-semibold text-zinc-500 uppercase">ระบบสมาชิก</span>
                      </div>
                    </div>

                    <div className="px-4 flex flex-col gap-3">
                      <button 
                        onClick={() => { onClose(); onLoginClick(); }}
                        className="w-full py-3.5 rounded-xl bg-zinc-200 hover:bg-white text-black font-bold text-[14px] transition-colors flex justify-center items-center gap-2 group"
                      >
                        <LogIn className="w-5 h-5" />
                        เข้าสู่ระบบ
                      </button>
                      <button 
                        onClick={() => { onClose(); if (onRegisterClick) onRegisterClick(); else onLoginClick(); }}
                        className="w-full py-3.5 rounded-xl bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-white font-bold text-[14px] transition-colors flex justify-center items-center gap-2 group"
                      >
                        <UserPlus className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                        สมัครสมาชิก
                      </button>
                    </div>
                  </div>`;

// Find the position of "<Lock" and replace the block
const startIdx = content.indexOf('<div className="flex-1 flex flex-col items-center justify-center text-center">');
const endIdx = content.indexOf('</div>\n                )}');

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + notUserReplacement + '\n' + content.substring(endIdx);
  fs.writeFileSync('src/components/MobileDrawer.tsx', content);
  console.log('Success');
} else {
  console.log('Not found');
}

