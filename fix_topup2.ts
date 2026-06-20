import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const regexTopupModal = /\{\/\*\s*Top(?:up| Up)\s*Modal\s*\*\/\}[\s\S]*?(?=\{\/\* \w)/;

const topupContent = `      {/* Top Up Modal */}
      <AnimatePresence>
        {showTopupModal && (
          <div className="fixed inset-0 z-[100] flex flex-col bg-black overflow-y-auto">
            {/* Background design */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(110deg, transparent, transparent 30px, rgba(255,255,255,0.03) 30px, rgba(255,255,255,0.03) 32px)' }}></div>
            
            <div className="relative z-10 w-full max-w-lg mx-auto min-h-[100dvh] flex flex-col px-6 py-12 justify-start">
              <div className="flex justify-between items-center mb-8 absolute top-6 left-6 right-6">
                 <div className="flex items-center">
                   <div className="flex items-center justify-center">
                     <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0ea5e9"/>
                       <path d="M26 12L36 7L46 12L36 17L26 12Z" fill="#0ea5e9"/>
                       <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                   </div>
                 </div>
                 <button className="text-zinc-500 hover:text-white transition-colors" onClick={() => setShowTopupModal(false)}>
                   <X className="w-8 h-8" />
                 </button>
              </div>
              
              <div className="mb-8 mt-16 text-center text-white">
                 <h2 className="text-4xl font-bold mb-4 font-display">ช่องทางการชำระเงิน</h2>
                 <p className="text-zinc-400 text-base font-sans">เลือกช่องทางที่ต้องการเพื่อเติมเงินเข้าบัญชีของ<br/>คุณ</p>
              </div>

              {!tosAccepted ? (
                <div className="bg-[#151515] border border-zinc-800 rounded-3xl p-8 shadow-xl mb-6 text-white text-center">
                  <div className="w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
                    <AlertTriangle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-display">ข้อตกลงและเงื่อนไข</h3>
                  <div className="bg-black/50 border border-zinc-800 rounded-2xl p-5 text-sm text-zinc-400 mb-8 text-left max-h-48 overflow-y-auto space-y-3 font-sans">
                    <p>1. ทางร้านขอสงวนสิทธิ์ไม่รับเคลมทุกกรณี หากเกิดข้อผิดพลาดจากการกรอกข้อมูลผิด</p>
                    <p>2. หากพบปัญหาในการเติมเงิน โปรดติดต่อแอดมินทันที</p>
                    <p>3. สลิปปลอม หรืออั่งเปาที่มีคนรับไปแล้ว หากตรวจพบจะแบนไอดีถาวร</p>
                  </div>
                  <button 
                    onClick={() => setTosAccepted(true)}
                    className="w-full bg-[#008ff7] hover:bg-blue-600 text-white font-bold py-5 rounded-2xl text-lg flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 transition-all font-display"
                  >
                     <CheckCircle className="w-6 h-6" /> ยอมรับเงื่อนไข
                  </button>
                </div>
              ) : topupModalStep === "select" ? (
                <div className="space-y-6">
                  {/* Angpao Option */}
                  <div className="bg-[#151515] border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group hover:border-[#0ea5e9] transition-colors">
                    <div className="flex gap-5 mb-5 relative z-10">
                      <div className="w-[88px] h-[88px] bg-[#ff203a] rounded-[24px] shrink-0 flex flex-col items-center justify-center relative shadow-lg">
                        <div className="w-[34px] h-[34px] bg-[#ffd700] rounded-full z-10 relative mt-1"></div>
                        <div className="w-10 h-2.5 bg-[#ff6b7e] rounded-full mt-3"></div>
                      </div>
                      <div className="flex-1 pb-1">
                        <div className="flex flex-col items-start gap-1 pb-1">
                           <h3 className="text-[26px] font-bold text-white mb-1 font-display">ซองอั่งเปา</h3>
                           <span className="text-[14px] font-bold px-3 py-1 rounded-full text-amber-500 bg-amber-500/10 font-sans">ตรวจสอบอัตโนมัติ</span>
                        </div>
                        <p className="text-[16px] text-zinc-300 mt-3 mb-2 font-medium leading-relaxed font-sans">True Money Wallet • ใช้ลิงค์<br/>ซองอั่งเปาเพื่อเติมเงิน</p>
                        <div className="flex items-center gap-2 text-zinc-500 text-[14px] font-sans">
                          <Gift className="w-5 h-5 shrink-0" /> <span>เหมาะสำหรับผู้ใช้ TrueMoney<br/>Wallet</span>
                        </div>
                        <div className="flex items-center gap-2.5 mt-4 text-[#ff203a] text-lg font-bold font-sans">
                           <div className="w-8 h-8 rounded-full bg-[#ff203a]/20 flex items-center justify-center"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></div>
                           พร้อมใช้งาน
                        </div>
                           <div className="text-zinc-500 font-normal text-sm ml-10 mt-1 font-sans">คลิกเพื่อเริ่มเติมเงิน</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => { setSelectedTopupChannel("angpao"); setTopupModalStep("angpao"); setTopupError(""); }}
                      className="w-full bg-[#008ff7] hover:bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-xl relative z-10 transition-colors font-display"
                    >
                       <ChevronRight className="w-5 h-5 shrink-0" /> เลือก
                    </button>
                  </div>

                  {/* Bank Slip Option */}
                  <div className="bg-[#151515] border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group hover:border-[#0ea5e9] transition-colors">
                    <div className="flex gap-5 mb-5 relative z-10">
                      <div className="w-[88px] h-[88px] bg-[#bb00ff] rounded-[24px] shrink-0 flex items-center justify-center relative shadow-lg">
                         <div className="bg-white rounded-xl p-3 w-[42px] h-[52px] shrink-0 flex flex-col items-center">
                           <div className="w-full h-1.5 bg-[#bb00ff]/20 rounded-full mb-2 border-b border-gray-200"></div>
                           <div className="w-full h-[3px] bg-[#bb00ff]/20 mb-1.5"></div>
                           <div className="w-full flex gap-1.5"><div className="w-1/2 h-[3px] bg-[#bb00ff]/20"></div><div className="w-1/2 h-[3px] bg-[#bb00ff]/20"></div></div>
                         </div>
                      </div>
                      <div className="flex-1 pb-1">
                        <div className="flex flex-col items-start gap-1 pb-1">
                           <h3 className="text-[26px] font-bold text-white mb-1 font-display">สลิปโอนเงิน</h3>
                           <span className="text-[14px] font-bold px-3 py-1 rounded-full text-purple-400 bg-purple-500/10 font-sans">ตรวจสอบอัตโนมัติ</span>
                        </div>
                        <p className="text-[16px] text-zinc-300 mt-3 mb-2 font-medium leading-relaxed font-sans">สแกนจ่าย QR Code รองรับ<br/>ทุกธนาคาร</p>
                        <div className="flex items-center gap-2.5 mt-4 text-[#bb00ff] text-lg font-bold font-sans">
                           <div className="w-8 h-8 rounded-full bg-[#bb00ff]/20 flex items-center justify-center"><Check className="w-5 h-5" /></div>
                           พร้อมใช้งาน
                        </div>
                           <div className="text-zinc-500 font-normal text-sm ml-10 mt-1 font-sans">คลิกเพื่อเริ่มอัพโหลดสลิป</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => { setSelectedTopupChannel("bank"); setTopupModalStep("bank"); setTopupError(""); }}
                      className="w-full bg-[#008ff7] hover:bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-xl relative z-10 transition-colors font-display"
                    >
                       <ChevronRight className="w-5 h-5 shrink-0" /> เลือก
                    </button>
                  </div>
                </div>
              ) : topupModalStep === "success" ? (
                <div className="bg-[#151515] border border-zinc-800 rounded-3xl p-10 text-center text-white">
                  <div className="w-24 h-24 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 scale-110">
                    <CheckCircle className="w-12 h-12 text-emerald-400" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 font-display">ทำรายการสำเร็จ!</h3>
                  <div className="text-emerald-400 text-lg mb-10 leading-relaxed font-mono">
                    {topupSuccessMessage.split("\\n").map((line, i) => (
                      <div key={i} className="mb-2">{line}</div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setTopupModalStep("select");
                      setShowTopupModal(false);
                    }}
                    className="w-full bg-[#008ff7] text-white font-bold py-5 rounded-xl text-xl font-display shadow-lg shadow-[#008ff7]/20"
                  >
                    กลับสู่หน้าหลัก
                  </button>
                </div>
              ) : (
                <div className="bg-[#151515] border border-zinc-800 rounded-3xl p-8 text-white w-full mx-auto">
                  <div className="flex items-center gap-4 mb-10 relative">
                    <button
                      onClick={() => setTopupModalStep("select")}
                      className="w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-800/80 text-zinc-300 hover:text-white transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h3 className="font-bold text-3xl font-display">
                      {topupModalStep === "angpao" ? "กรอกซองอั่งเปา" : topupModalStep === "bank" ? "แนบสลิปโอนเงิน" : ""}
                    </h3>
                  </div>

                  {topupModalStep === "angpao" && (
                    <div className="mb-8 bg-[#ff203a]/10 border border-[#ff203a]/20 rounded-2xl p-6 text-center font-sans">
                       <p className="text-lg text-[#ff6b7e] font-bold mb-2">สร้างซองของขวัญแบบ "แบ่งจำนวนเงินเท่ากัน"</p>
                       <p className="text-sm text-zinc-400">ยอดเงินจะถูกแปลงเป็นเครดิตตามมูลค่า (ขั้นต่ำ 10 บาท)</p>
                    </div>
                  )}

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleTopup();
                    }}
                    className="space-y-6"
                  >
                    {topupError && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 text-red-500 font-bold text-center text-lg">
                        {topupError}
                      </div>
                    )}

                    {topupModalStep === "angpao" && (
                      <div>
                        <input
                          type="text"
                          value={topupCode}
                          onChange={(e) => setTopupCode(e.target.value)}
                          placeholder="ลิ้งค์ซองอั่งเปา (https://gift.truemoney.com/...)"
                          required
                          className="w-full bg-[#0a0a0a] border border-zinc-800 text-white p-5 rounded-2xl focus:border-[#0ea5e9] outline-none text-lg font-mono placeholder-zinc-600"
                        />
                      </div>
                    )}

                    {topupModalStep === "bank" && (
                      <div>
                        <label className="flex flex-col items-center justify-center w-full min-h-[14rem] py-8 border-2 border-dashed border-zinc-700 hover:border-[#0ea5e9] rounded-3xl cursor-pointer bg-[#0a0a0a] transition-colors group">
                           {slipFile ? (
                              <img src={URL.createObjectURL(slipFile)} className="max-h-56 object-contain rounded-xl" alt="slip" />
                           ) : (
                              <div className="text-center px-4">
                               <UploadCloud className="w-14 h-14 text-zinc-500 mx-auto mb-4 group-hover:text-[#0ea5e9] transition-colors" />
                               <span className="text-xl text-zinc-400 block font-medium group-hover:text-white transition-colors">คลิกเพื่ออัพโหลดสลิปโอนเงิน</span>
                               <span className="text-sm text-zinc-600 mt-2 block">รองรับไฟล์รูปภาพทุกประเภท</span>
                              </div>
                           )}
                           <input type="file" className="hidden" accept="image/*" onChange={(e) => setSlipFile(e.target.files?.[0] || null)} />
                        </label>
                      </div>
                    )}

                    <div className="pt-4">
                       <button 
                         type="submit" 
                         disabled={isProcessingTopup}
                         className="w-full bg-[#008ff7] hover:bg-blue-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold py-5 text-xl rounded-2xl flex justify-center items-center gap-3 transition-all shadow-xl shadow-[#008ff7]/20 font-display"
                       >
                         {isProcessingTopup ? (
                            <><Loader2 className="w-6 h-6 animate-spin" /> กำลังตรวจสอบ...</>
                         ) : (
                            "ยืนยันการทำรายการ"
                         )}
                       </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
`;

if (content.match(regexTopupModal)) {
   content = content.replace(regexTopupModal, topupContent);
   fs.writeFileSync('src/App.tsx', content);
   console.log("Top Up UI Successfully Patched");
} else {
   console.log("Failed to match Regex for auth");
}
