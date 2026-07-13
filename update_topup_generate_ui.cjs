const fs = require('fs');
let content = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

const generateSelectOption = `
          {qrActive && (
            <div 
              onClick={() => setTopupModalStep("bank_generate")}
              className="bg-black/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 cursor-pointer hover:border-emerald-500 hover:bg-emerald-500/5 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/5">
                  <Landmark className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500" />
                </div>
                <h4 className="font-bold text-white text-[15px] sm:text-base font-display">สแกน QR แบบระบุยอด</h4>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 mb-2 font-medium leading-relaxed font-sans">QR Code • สร้างคิวอาร์โค้ดชำระเงินอัตโนมัติ ฟรีค่าธรรมเนียม</p>
              </div>
            </div>
          )}
          
          <div 
             onClick={() => setTopupModalStep("coupon")}
`;

if (!content.includes('bank_generate')) {
  content = content.replace(/<div\s+onClick=\{\(\) => setTopupModalStep\("coupon"\)\}/g, generateSelectOption);
  
  // Add generate amount UI step
  const generateUiStep = `
             {topupModalStep === "bank_generate" && (
                <div className="mb-5 bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 flex flex-col items-center text-center">
                  {(() => {
                    const isRov = false;
                    const bAcc = isRov ? null : parsedSettings.topup_bank_account_no;
                    const [amount, setAmount] = React.useState('');
                    const [genQrUrl, setGenQrUrl] = React.useState('');
                    const [isGenerating, setIsGenerating] = React.useState(false);

                    const generateQr = async () => {
                      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
                        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: "กรุณาระบุจำนวนเงินที่ถูกต้อง", type: "error" } }));
                        return;
                      }
                      if (!bAcc) {
                         window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: "ไม่ได้ตั้งค่าหมายเลขพร้อมเพย์", type: "error" } }));
                         return;
                      }
                      setIsGenerating(true);
                      try {
                        const res = await fetch('/api/topup/generate-qr', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ amount: Number(amount), promptpay: bAcc })
                        });
                        const data = await res.json();
                        if (data.success && data.raw && data.raw.data && data.raw.data.qrImage) {
                           setGenQrUrl(data.raw.data.qrImage);
                        } else if (data.success && data.qrImage) {
                           setGenQrUrl(data.qrImage);
                        } else {
                           window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: data.message || "เกิดข้อผิดพลาดในการสร้าง QR", type: "error" } }));
                        }
                      } catch (e: any) {
                         window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: e.message || "ระบบขัดข้อง", type: "error" } }));
                      } finally {
                        setIsGenerating(false);
                      }
                    };

                    return (
                      <>
                        <div className="w-full mb-4 text-left">
                          <label className="text-sm font-medium text-zinc-300 mb-1 block">ระบุจำนวนเงินที่ต้องการเติม</label>
                          <div className="flex gap-2">
                             <input 
                               type="number" 
                               value={amount} 
                               onChange={e => setAmount(e.target.value)} 
                               placeholder="เช่น 100" 
                               disabled={!!genQrUrl}
                               className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                             />
                             {!genQrUrl && (
                               <button 
                                 type="button" 
                                 onClick={generateQr} 
                                 disabled={isGenerating}
                                 className="px-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold whitespace-nowrap transition-colors"
                               >
                                 {isGenerating ? 'กำลังสร้าง...' : 'สร้าง QR'}
                               </button>
                             )}
                          </div>
                        </div>

                        {genQrUrl && (
                          <div className="flex flex-col items-center gap-3 mb-4 w-full">
                            <div className="w-48 h-48 bg-white p-2 rounded-xl relative overflow-hidden border-2 border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                              <img src={genQrUrl.startsWith('data:') ? genQrUrl : \`data:image/png;base64,\${genQrUrl}\`} alt="Generated QR Code" className="w-full h-full object-contain rounded-lg" />
                            </div>
                            <p className="text-emerald-400 font-bold">สแกน QR Code เพื่อชำระเงิน {amount} บาท</p>
                          </div>
                        )}

                        <div className="w-full mt-4 border-t border-zinc-700/50 pt-4">
                            <label className="block text-zinc-400 text-sm font-medium mb-3 text-left">หลังจากโอนเงินแล้ว แนบสลิปเพื่อยืนยัน</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  setSlipFile(e.target.files[0]);
                                }
                              }}
                              className="w-full text-sm text-zinc-400 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20"
                            />
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

             {topupModalStep === "bank" && (
  `;

  content = content.replace(/\{topupModalStep === "bank" && \(/g, generateUiStep);
  content = content.replace(/topupModalStep === "bank" \? "แนบสลิปโอนเงินธนาคาร"/g, `topupModalStep === "bank" ? "แนบสลิปโอนเงินธนาคาร" : topupModalStep === "bank_generate" ? "สแกน QR แบบระบุยอด" `)
  
  fs.writeFileSync('src/components/TopupPage.tsx', content);
  console.log('Added bank_generate UI to TopupPage.');
} else {
  console.log('bank_generate UI already exists.');
}
