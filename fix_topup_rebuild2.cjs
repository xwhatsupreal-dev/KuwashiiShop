const fs = require('fs');
let content = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

const slipInput = `             {topupModalStep === "angpao" && (
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
                     <p className="text-amber-500/80 text-[11px] sm:text-xs">ระบบจะตรวจสอบยอดเงินจากสลิป TrueMoney Wallet เท่านั้น</p>
                   </div>
                 </div>
               </>
             )}
             
             {topupModalStep === "coupon" && (`;

content = content.replace(/\{topupModalStep === "coupon" && \(/, slipInput);

fs.writeFileSync('src/components/TopupPage.tsx', content);
