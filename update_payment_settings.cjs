const fs = require('fs');
let content = fs.readFileSync('src/components/PaymentSettingsModal.tsx', 'utf8');

const stateTarget = /const \[isSaving, setIsSaving\] = useState\(false\);/;
const stateReplacement = `const [isSaving, setIsSaving] = useState(false);
  const [apiStatus, setApiStatus] = useState<{angpao: string, checkslip: string} | null>(null);
  const [isCheckingApi, setIsCheckingApi] = useState(false);

  const checkApiStatus = async () => {
    setIsCheckingApi(true);
    setApiStatus(null);
    try {
      const res = await fetch('/api/admin/check-api-status');
      if (res.ok) {
        const data = await res.json();
        setApiStatus(data);
      } else {
        setApiStatus({ angpao: 'error', checkslip: 'error' });
      }
    } catch(e) {
      setApiStatus({ angpao: 'error', checkslip: 'error' });
    } finally {
      setIsCheckingApi(false);
    }
  };`;
content = content.replace(stateTarget, stateReplacement);

const uiTarget = /<div className="flex justify-between items-center p-6 border-b border-zinc-800">/;
const uiReplacement = `<div className="flex justify-between items-center p-6 border-b border-zinc-800">`;
content = content.replace(uiTarget, uiReplacement);

// Wait, we need to add the button somewhere. Where?
// Maybe in the settings body, or a new tab.
const tabsTarget = /<button\s*onClick=\{\(\) => setActiveTab\('rov'\)\}/;
const tabsReplacement = `<button
            onClick={() => setActiveTab('api_status')}
            className={\`px-4 py-2 font-bold text-sm transition-colors relative \${activeTab === 'api_status' ? 'text-[#0ea5e9]' : 'text-zinc-400 hover:text-zinc-200'}\`}
          >
            สถานะ API
            {activeTab === 'api_status' && (
              <motion.div layoutId="payment_active_tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0ea5e9]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('rov')}`;
content = content.replace(tabsTarget, tabsReplacement);

const contentTarget = /<div className="flex justify-end gap-3 p-6 border-t border-zinc-800">/;
const contentReplacement = `
          {activeTab === 'api_status' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="font-bold text-white mb-4">ตรวจสอบสถานะ API ของระบบ</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-zinc-800">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-rose-500" />
                      <div>
                        <p className="text-white font-medium text-sm">API รับซองอั่งเปา</p>
                        <p className="text-zinc-500 text-xs">www.planariashop.com/api/truewallet.php</p>
                      </div>
                    </div>
                    <div>
                      {apiStatus ? (
                         apiStatus.angpao === 'online' ? (
                           <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">Online</span>
                         ) : (
                           <span className="px-2.5 py-1 bg-red-500/20 text-red-500 text-xs font-bold rounded-full">Offline</span>
                         )
                      ) : (
                         <span className="text-zinc-500 text-xs font-medium">-</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-zinc-800">
                    <div className="flex items-center gap-3">
                      <QrCode className="w-5 h-5 text-emerald-500" />
                      <div>
                        <p className="text-white font-medium text-sm">API ตรวจสอบสลิปธนาคาร</p>
                        <p className="text-zinc-500 text-xs">www.planariashop.com/api/checkslip.php</p>
                      </div>
                    </div>
                    <div>
                      {apiStatus ? (
                         apiStatus.checkslip === 'online' ? (
                           <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">Online</span>
                         ) : (
                           <span className="px-2.5 py-1 bg-red-500/20 text-red-500 text-xs font-bold rounded-full">Offline</span>
                         )
                      ) : (
                         <span className="text-zinc-500 text-xs font-medium">-</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={checkApiStatus}
                  disabled={isCheckingApi}
                  className="w-full py-3 bg-[#0ea5e9] hover:bg-sky-500 disabled:bg-[#0ea5e9]/50 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isCheckingApi ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "เริ่มตรวจสอบสถานะ API"
                  )}
                </button>
              </div>
            </motion.div>
          )}

<div className="flex justify-end gap-3 p-6 border-t border-zinc-800">`;
content = content.replace(contentTarget, contentReplacement);

// Update type definition
const activeTabTypeTarget = /const \[activeTab, setActiveTab\] = useState\<'allstar' \| 'general' \| 'rov'\>\('general'\);/;
const activeTabTypeReplacement = `const [activeTab, setActiveTab] = useState<'allstar' | 'general' | 'rov' | 'api_status'>('general');`;
content = content.replace(activeTabTypeTarget, activeTabTypeReplacement);

fs.writeFileSync('src/components/PaymentSettingsModal.tsx', content);
