const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Import
const importTarget = /import \{ PaymentSettingsModal \} from "\.\/components\/PaymentSettingsModal";/;
const importReplacement = `import { PaymentSettingsModal } from "./components/PaymentSettingsModal";
import { ApiStatusModal } from "./components/ApiStatusModal";`;
content = content.replace(importTarget, importReplacement);

// 2. State
const stateTarget = /const \[isPaymentConfigOpen, setIsPaymentConfigOpen\] = useState\(false\);/;
const stateReplacement = `const [isPaymentConfigOpen, setIsPaymentConfigOpen] = useState(false);
  const [isApiStatusOpen, setIsApiStatusOpen] = useState(false);`;
content = content.replace(stateTarget, stateReplacement);

// 3. Render Modal
const modalTarget = /<PaymentSettingsModal\s*isOpen=\{isPaymentConfigOpen\}\s*onClose=\{\(\) => setIsPaymentConfigOpen\(false\)\}\s*globalStats=\{globalStats\}\s*setGlobalStats=\{setGlobalStats\}\s*\/>/;
const modalReplacement = `<PaymentSettingsModal
        isOpen={isPaymentConfigOpen}
        onClose={() => setIsPaymentConfigOpen(false)}
        globalStats={globalStats}
        setGlobalStats={setGlobalStats}
      />
      <ApiStatusModal
        isOpen={isApiStatusOpen}
        onClose={() => setIsApiStatusOpen(false)}
      />`;
content = content.replace(modalTarget, modalReplacement);

// 4. Button
const buttonTarget = /<motion\.button\s*whileTap=\{\{ scale: 0\.95 \}\}\s*onClick=\{\(\) => setIsCategoryManagerOpen\(true\)\}/;
const buttonReplacement = `<motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsApiStatusOpen(true)}
                            className="py-2 px-4 rounded-2xl bg-indigo-500/20 text-indigo-400 hover:text-zinc-100 border border-indigo-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-500/10"
                          >
                            <RefreshCw className="w-4 h-4" /> เช็คสถานะ API
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsCategoryManagerOpen(true)}`;
content = content.replace(buttonTarget, buttonReplacement);

fs.writeFileSync('src/App.tsx', content);
