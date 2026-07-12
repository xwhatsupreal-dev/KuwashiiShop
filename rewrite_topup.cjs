const fs = require('fs');
let content = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

// The file currently has a bunch of broken JSX. Let's find the start of the `form` element and replace up to the submit button.
const formStart = '<form onSubmit={(e) => { e.preventDefault(); handleTopup(e); }}>';
const submitBtnIdx = content.indexOf('{(topupModalStep === "angpao" || topupModalStep === "coupon" || topupModalStep === "bank") && (');

if (submitBtnIdx > -1) {
    const beforeForm = content.substring(0, content.indexOf(formStart) + formStart.length);
    const afterSubmit = content.substring(submitBtnIdx);
    
    const correctFormContent = `
             {topupModalStep === "bank" && (
                <div className="mb-5 bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 flex flex-col items-center text-center">
                  {(() => {
                    const isRov = topupTarget === 'balance_rov';
                    const qrUrl = isRov ? 'https://img1.pic.in.th/images/1000113791.jpg' : parsedSettings.topup_bank_qr_image;
                    const bName = isRov ? 'Prompt Pay' : parsedSettings.topup_bank_name;
                    const bAcc = isRov ? null : parsedSettings.topup_bank_account_no;
                    const bAccName = isRov ? null : parsedSettings.topup_qrcode_name;

                    return (
                      <>
                        {qrUrl ? (
                          <div className="flex flex-col items-center gap-3 mb-4">
                            <div className="w-48 h-48 bg-white p-2 rounded-xl relative overflow-hidden border-2 border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                              <img src={qrUrl} alt="QR Code" className="w-full h-full object-contain rounded-lg" />
                            </div>
                            <button
                              type="button"
                              onClick={async (e) => {
                                e.preventDefault();
                                try {
                                  const response = await fetch(\`/api/proxy-image?url=\${encodeURIComponent(qrUrl)}\`);
                                  if (!response.ok) throw new Error('Network response was not ok');
                                  const blob = await response.blob();
                                  const url = window.URL.createObjectURL(blob);
                                  const link = document.createElement('a');
                                  link.href = url;
                                  link.download = 'qrcode_bank.jpg';
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                  window.URL.revokeObjectURL(url);
                                } catch (error) {
                                  console.error('Download failed:', error);
                                }
                              }}
                              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1.5 transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                              บันทึกคิวอาร์โค้ด
                            </button>
                          </div>
                        ) : (
                           <div className="w-48 h-48 bg-zinc-800/80 rounded-xl mb-4 flex items-center justify-center border-2 border-zinc-700/50">
                             <QrCode className="w-12 h-12 text-zinc-500 mb-2" />
                             <p className="text-zinc-500 text-xs">ไม่ได้ตั้งค่า QR Code</p>
                           </div>
                        )}
                        <div className="bg-black/40 rounded-xl p-4 w-full border border-emerald-500/10">
                          <p className="text-emerald-400 font-bold mb-3 flex items-center justify-center gap-2 text-sm">
                            <Landmark className="w-4 h-4" />
                            {bName}
                          </p>
                          {bAccName && (
                            <div className="flex justify-between items-center py-2 border-b border-white/5 mb-1">
                              <span className="text-zinc-400 text-xs">ชื่อบัญชี</span>
                              <span className="text-white font-medium text-xs sm:text-sm">{bAccName}</span>
                            </div>
                          )}
                          {bAcc && (
                            <div className="flex justify-between items-center py-2">
                              <span className="text-zinc-400 text-xs">เลขบัญชี</span>
                              <div className="flex items-center gap-2">
                                <span className="text-white font-mono text-sm tracking-wider">{bAcc}</span>
                                <button 
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigator.clipboard.writeText(bAcc);
                                  }}
                                  className="text-emerald-500 hover:text-emerald-400 p-1"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )
                  })()}
                </div>
             )}

             {topupModalStep === "coupon" && (
               <input 
                 type="text" 
                 value={angpaoCode}
                 onChange={(e) => setAngpaoCode(e.target.value)}
                 className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] transition-all text-center mb-5 text-sm sm:text-base placeholder-zinc-600 uppercase"
                 placeholder="ใส่รหัสคูปองที่นี่..."
                 style={{ textTransform: 'uppercase' }}
               />
             )}
             
             {(topupModalStep === "bank" || topupModalStep === "angpao") && (
               <>
                 <div className="relative border-2 border-dashed border-zinc-700 bg-black/50 rounded-xl p-5 sm:p-6 text-center hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all mb-5 group cursor-pointer">
                   <input 
                     type="file" 
                     accept="image/*"
                     onChange={(e) => {
                       const file = e.target.files?.[0];
                       if (file) {
                         setSlipFile(file);
                       }
                     }}
                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                   />
                   <div className="flex flex-col items-center pointer-events-none relative z-10">
                      {slipFile ? (
                        <>
                          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mb-3">
                            <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
                          </div>
                          <p className="text-emerald-400 font-bold mb-1 text-xs sm:text-sm truncate w-full max-w-[200px]">{slipFile.name}</p>
                          <p className="text-emerald-500/70 text-[11px] sm:text-xs">{(slipFile.size / 1024 / 1024).toFixed(2)} MB • แตะเพื่อเปลี่ยนรูป</p>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-zinc-800 group-hover:bg-emerald-500/20 rounded-full flex items-center justify-center mb-3 transition-colors">
                            <Plus className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-400 group-hover:text-emerald-400" />
                          </div>
                          <p className="text-zinc-300 font-bold mb-1 text-xs sm:text-sm">
                            {topupModalStep === "bank" ? "แตะเพื่อเลือกรูปภาพ หรือลากมาวาง" : "แตะเพื่อเลือกสลิป TrueMoney Wallet"}
                          </p>
                          <p className="text-zinc-500 text-[11px] sm:text-xs">PNG, JPG ขนาดไม่เกิน 5MB</p>
                        </>
                      )}
                   </div>
                 </div>
               </>
             )}
             
`;
    
    fs.writeFileSync('src/components/TopupPage.tsx', beforeForm + correctFormContent + afterSubmit);
}
