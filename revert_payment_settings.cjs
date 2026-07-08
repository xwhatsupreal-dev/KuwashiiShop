const fs = require('fs');
let content = fs.readFileSync('src/components/PaymentSettingsModal.tsx', 'utf8');

const stateTarget = /const \[apiStatus, setApiStatus\] = useState<\{angpao: string, checkslip: string\} \| null>\(null\);[\s\S]*?setIsCheckingApi\(false\);\n    \}\n  \};/;
content = content.replace(stateTarget, "");

const stateTarget2 = /const \[isCheckingApi, setIsCheckingApi\] = useState\(false\);/;
content = content.replace(stateTarget2, "");

const tabTarget = /<button\s*onClick=\{\(\) => setActiveTab\('api_status'\)\}[\s\S]*?<\/button>\s*<button\s*onClick=\{\(\) => setActiveTab\('rov'\)\}/;
content = content.replace(tabTarget, `<button
            onClick={() => setActiveTab('rov')}`);
            
const contentTarget = /\{activeTab === 'api_status' && \([\s\S]*?\}\s*<\/div>\s*<\/motion\.div>\s*\)\}\s*<div className="flex justify-end gap-3 p-6 border-t border-zinc-800">/;
content = content.replace(contentTarget, `<div className="flex justify-end gap-3 p-6 border-t border-zinc-800">`);

const activeTabTypeTarget = /const \[activeTab, setActiveTab\] = useState\<'allstar' \| 'general' \| 'rov' \| 'api_status'\>\('general'\);/;
content = content.replace(activeTabTypeTarget, `const [activeTab, setActiveTab] = useState<'allstar' | 'general' | 'rov'>('general');`);

fs.writeFileSync('src/components/PaymentSettingsModal.tsx', content);
