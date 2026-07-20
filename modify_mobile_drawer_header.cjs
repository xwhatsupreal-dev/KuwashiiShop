const fs = require('fs');
let content = fs.readFileSync('src/components/MobileDrawer.tsx', 'utf8');

// 1. Add onRegisterClick to props
content = content.replace(
  /onLoginClick: \(\) => void;\n  onLogoutClick: \(\) => void;/,
  `onLoginClick: () => void;
  onRegisterClick?: () => void;
  onLogoutClick: () => void;`
);

content = content.replace(
  /export const MobileDrawer = \(\{ isOpen, onClose, currentUser, onLoginClick, onLogoutClick, setPage, setShowTopupModal, openHistoryModal \}: MobileDrawerProps\) => \{/,
  `export const MobileDrawer = ({ isOpen, onClose, currentUser, onLoginClick, onRegisterClick, onLogoutClick, setPage, setShowTopupModal, openHistoryModal }: MobileDrawerProps) => {`
);

// 2. Add header 
const drawerStartRegex = /<motion\.div\s+initial=\{\{ x: "-100%" \}\}\s+animate=\{\{ x: 0 \}\}\s+exit=\{\{ x: "-100%" \}\}\s+transition=\{\{ type: "spring", damping: 28, stiffness: 300 \}\}\s+className="fixed top-0 left-0 bottom-0 w-\[85%\] max-w-\[320px\] bg-\[#0a0a0a\] border-r border-white\/10 shadow-2xl z-\[151\] flex flex-col font-sans overflow-hidden"\s*>/;

const drawerStartReplacement = `<motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-[#0a0a0a] border-r border-white/10 shadow-2xl z-[151] flex flex-col font-sans overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/5 shrink-0">
              <h2 className="text-xl font-black text-white tracking-wider">KUWASHII SHOP</h2>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>
`;

content = content.replace(drawerStartRegex, drawerStartReplacement);

// 3. Import X, LogIn, UserPlus, LayoutGrid
const importRegex = /import \{ Home, ShoppingBag, Wallet, Phone, HelpCircle, LogOut, Facebook, MessageSquare, ChevronRight, Lock, History, Settings, ArrowUpRight, Target, Zap, Gamepad2 \} from 'lucide-react';/;
const importReplacement = `import { Home, ShoppingBag, Wallet, Phone, HelpCircle, LogOut, Facebook, MessageSquare, ChevronRight, Lock, History, Settings, ArrowUpRight, Target, Zap, Gamepad2, X, LayoutGrid, LogIn, UserPlus } from 'lucide-react';`;
content = content.replace(importRegex, importReplacement);

fs.writeFileSync('src/components/MobileDrawer.tsx', content);
console.log('Success');
