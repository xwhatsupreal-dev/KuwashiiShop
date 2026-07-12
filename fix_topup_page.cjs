const fs = require('fs');
let content = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

// Replace the TrueMoney Wallet text input with a file input exactly like Bank
// But I need to change the UI labels.
// Actually, they use slipFile for both, but we need to know if it's bank or angpao.
// We can just reuse slipFile for angpao as well.

const angpaoBlock = `             {topupModalStep === "angpao" && (
                <div className="flex flex-col items-center">
                  <input 
                    type="text" 
                    value={angpaoCode}
                    onChange={(e) => setAngpaoCode(e.target.value)}
                    className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] transition-all text-center mb-3 text-sm sm:text-base placeholder-zinc-600"
                    placeholder="https://gift.truemoney.com/campaign/?v=..."
                  />
                  <p className="text-amber-500 text-[11px] sm:text-xs mb-5 px-3 py-1.5 bg-amber-500/10 rounded-full inline-flex items-center gap-1.5 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    หักค่าธรรมเนียม 2.9% จากยอดเติม
                  </p>
                </div>
             )}`;

const angpaoBlockRegex = /\{topupModalStep === "angpao" && \([\s\S]*?\}\)/;

const newAngpaoBlock = `             {topupModalStep === "angpao" && (
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
                          <p className="text-zinc-300 font-bold mb-1 text-xs sm:text-sm">แตะเพื่อเลือกสลิป TrueMoney Wallet</p>
                          <p className="text-zinc-500 text-[11px] sm:text-xs">PNG, JPG ขนาดไม่เกิน 5MB</p>
                        </>
                      )}
                   </div>
                 </div>
                 
                 <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 p-3 sm:p-4 rounded-xl text-left mb-5">
                   <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0 mt-0.5" />
                   <div>
                     <p className="text-amber-500 font-bold text-xs sm:text-sm mb-0.5">คำแนะนำ</p>
                     <p className="text-amber-500/80 text-[11px] sm:text-xs">ระบบจะตรวจสอบยอดเงินจากสลิป TrueMoney Wallet เท่านั้น (ไม่หักค่าธรรมเนียม 2.9%)</p>
                   </div>
                 </div>
               </>
             )}`;

content = content.replace(angpaoBlockRegex, newAngpaoBlock);

const topupHeaderAngpaoRegex = /\{topupModalStep === "angpao" && \(\s*<div className="mb-6 bg-\[\#ff203a\]\/10 border border-\[\#ff203a\]\/20 rounded-xl p-4 text-center font-sans">\s*<p className="text-sm sm:text-base text-\[\#ff6b7e\] font-bold mb-1">สร้างซองของขวัญแบบ "แบ่งจำนวนเงินเท่ากัน"<\/p>\s*<p className="text-\[11px\] sm:text-xs text-zinc-400">ยอดเงินจะถูกแปลงเป็นเครดิตตามมูลค่า \(ขั้นต่ำ 10 บาท\)<\/p>\s*<\/div>\s*\)\}/;

const newTopupHeaderAngpao = `{topupModalStep === "angpao" && (
            <div className="mb-6 bg-[#ff203a]/10 border border-[#ff203a]/20 rounded-xl p-6 text-center font-sans">
               {(() => {
                    const isRov = topupTarget === 'balance_rov';
                    const angpaoPhone = isRov ? parsedSettings.rov_topup_angpao_phone : parsedSettings.topup_angpao_phone;
                    return (
                        <>
                           <p className="text-sm sm:text-base text-[#ff6b7e] font-bold mb-1">โอนเงินเข้า TrueMoney Wallet</p>
                           {angpaoPhone ? (
                             <>
                               <p className="text-[11px] sm:text-xs text-zinc-400 mb-3">โอนเงินไปยังเบอร์ด้านล่าง และนำสลิปมาแนบเพื่อยืนยัน</p>
                               <div className="flex items-center justify-center gap-3 bg-black/40 rounded-lg py-2 px-4 border border-[#ff203a]/20 w-fit mx-auto mb-2 cursor-pointer hover:bg-black/60 transition-colors"
                                    onClick={() => {
                                        navigator.clipboard.writeText(angpaoPhone);
                                    }}>
                                   <span className="font-mono text-lg text-white font-bold tracking-wider">{angpaoPhone}</span>
                                   <Copy className="w-4 h-4 text-[#ff203a]" />
                               </div>
                               <p className="text-[10px] text-zinc-500">แตะที่เบอร์เพื่อคัดลอก</p>
                             </>
                           ) : (
                             <p className="text-[11px] sm:text-xs text-red-400">ยังไม่ได้ตั้งค่าเบอร์ TrueMoney Wallet ในระบบ</p>
                           )}
                        </>
                    );
               })()}
            </div>
          )}`;

content = content.replace(topupHeaderAngpaoRegex, newTopupHeaderAngpao);

const disabledRegex = /disabled=\{isProcessingTopup \|\| \(topupModalStep === "bank" && !slipFile\)\}/;
content = content.replace(disabledRegex, `disabled={isProcessingTopup || ((topupModalStep === "bank" || topupModalStep === "angpao") && !slipFile)}`);

const submitTextRegex = /topupModalStep === "angpao" \? "ยืนยันการเติมเงิน" : topupModalStep === "bank" \? "ยืนยันสลิปโอนเงิน" : "ยืนยันรหัสคูปอง"/;
content = content.replace(submitTextRegex, `topupModalStep === "angpao" ? "ยืนยันสลิป TrueMoney" : topupModalStep === "bank" ? "ยืนยันสลิปธนาคาร" : "ยืนยันรหัสคูปอง"`);

const titleRegex = /\{topupModalStep === "angpao" \? "กรอกซองอั่งเปา" : topupModalStep === "bank" \? "แนบสลิปโอนเงิน" : topupModalStep === "coupon" \? "กรอกคูปอง" : ""\}/;
content = content.replace(titleRegex, `{topupModalStep === "angpao" ? "สลิป TrueMoney Wallet" : topupModalStep === "bank" ? "แนบสลิปโอนเงินธนาคาร" : topupModalStep === "coupon" ? "กรอกคูปอง" : ""}`);

fs.writeFileSync('src/components/TopupPage.tsx', content);
