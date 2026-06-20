import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertTriangle, ChevronRight, HelpCircle, X, ChevronLeft, ArrowRight, Wallet, QrCode, ScanLine, FileBoxIcon as FileBox, Plus, Send, Gift, Copy, Download } from 'lucide-react';

export const TopupPage = ({ 
  tosAccepted, 
  setTosAccepted, 
  topupModalStep, 
  setTopupModalStep, 
  angpaoCode, 
  setAngpaoCode,
  setSlipFile,
  setShowTopupTos,
  isProcessingTopup,
  handleTopup,
  setAppScreen,
  globalStats
}: any) => {

  let parsedSettings = globalStats?.announcement_settings || {};
  if (typeof parsedSettings === 'string') {
    try { parsedSettings = JSON.parse(parsedSettings); } catch(e) { parsedSettings = {}; }
  }

  const angpaoActive = parsedSettings.topup_angpao_status !== false;
  const qrActive = parsedSettings.topup_qrcode_status !== false;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-[400px] sm:max-w-md mx-auto py-8 flex flex-col justify-start"
    >
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="mb-8 mt-2 text-center text-white relative flex flex-col items-center"
      >
        <button 
          onClick={() => {
            setAngpaoCode("");
            setTopupModalStep("select");
            setAppScreen("SHOP");
          }}
          className="absolute left-0 top-1 text-zinc-400 hover:text-white flex items-center justify-center p-2 rounded-full hover:bg-white/5 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 font-display">ช่องทางการชำระเงิน</h2>
        <p className="text-zinc-500 text-xs sm:text-sm font-sans">เลือกช่องทางที่ต้องการเพื่อเติมเงินเข้าบัญชีของคุณ</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!tosAccepted ? (
          <motion.div 
            key="tos"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#151515] border border-zinc-800 rounded-2xl p-6 shadow-xl mb-4 text-white text-center"
          >
            <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-display">ข้อตกลงและเงื่อนไข</h3>
            <div className="bg-black/50 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-400 mb-6 text-left max-h-40 overflow-y-auto space-y-3 font-sans">
              <p>1. ทางร้านขอสงวนสิทธิ์ไม่รับเคลมทุกกรณี หากเกิดข้อผิดพลาดจากการกรอกข้อมูลผิด</p>
              <p>2. หากพบปัญหาในการเติมเงิน โปรด<a href="https://discord.gg/AQKtJpvyva" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ติดต่อแอดมิน</a>ทันที</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTosAccepted(true)}
              className="w-full bg-[#008ff7] hover:bg-blue-600 text-white font-bold py-3.5 sm:py-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all font-display"
            >
               <CheckCircle className="w-5 h-5" /> ยอมรับเงื่อนไข
            </motion.button>
          </motion.div>
        ) : topupModalStep === "select" ? (
          <motion.div 
            key="select"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            {/* Angpao Option */}
            <motion.div 
               whileHover={angpaoActive ? { scale: 1.02 } : {}}
               whileTap={angpaoActive ? { scale: 0.98 } : {}}
               className={`bg-[#151515] border border-zinc-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden group transition-colors ${angpaoActive ? 'cursor-pointer hover:border-[#0ea5e9]' : 'opacity-50 cursor-not-allowed'}`}
               onClick={() => angpaoActive && setTopupModalStep("angpao")}
            >
            <div className="flex items-center justify-between mb-3">
               <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br from-[#ff6b7e] to-[#ff203a] rounded-xl flex items-center justify-center shadow-lg transform ${angpaoActive ? 'group-hover:scale-110' : ''} transition-transform`}>
                     <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-[15px] sm:text-base font-display">ซองอั่งเปา (Angpao)</h4>
                    {angpaoActive ? (
                      <span className="text-[9px] sm:text-[10px] bg-[#ff203a]/20 text-[#ff6b7e] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider font-sans">No Fee</span>
                    ) : (
                      <span className="text-[9px] sm:text-[10px] bg-red-500/20 text-red-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider font-sans">ปิดปรับปรุง</span>
                    )}
                  </div>
               </div>
               <button className="bg-[#151515] border border-zinc-700 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors">
                 <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
               </button>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2 mb-2 font-medium leading-relaxed font-sans">True Money Wallet • ใช้ลิงค์ซองอั่งเปาเพื่อเติมเงิน</p>
            <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] sm:text-xs font-sans">
              <CheckCircle className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${angpaoActive ? 'text-[#ff203a]' : 'text-zinc-500'}`} /> เติมขั้นต่ำ 10 บาท
            </div>
          </motion.div>

          {/* Coupon Option */}
          <motion.div 
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             className={`bg-[#151515] border border-zinc-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden group transition-colors cursor-pointer hover:border-[#0ea5e9]`}
             onClick={() => setTopupModalStep("coupon")}
          >
            <div className="flex items-center justify-between mb-3">
               <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}>
                     <Gift className="w-6 h-6 text-[#0ea5e9]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-[15px] sm:text-base font-display">คูปอง</h4>
                    <span className="text-[9px] sm:text-[10px] bg-[#0ea5e9]/20 text-[#0ea5e9] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider font-sans">Promotion</span>
                  </div>
               </div>
               <button className="bg-[#151515] border border-zinc-700 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors">
                 <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
               </button>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2 mb-2 font-medium leading-relaxed font-sans">เติมเงินผ่านรหัสคูปอง</p>
            <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] sm:text-xs font-sans">
              <CheckCircle className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0ea5e9]`} /> สามารถใช้แลกเครดิตฟรี
            </div>
          </motion.div>

          {/* QRCode Option */}
          <motion.div 
             whileHover={qrActive ? { scale: 1.02 } : {}}
             whileTap={qrActive ? { scale: 0.98 } : {}}
             className={`bg-[#151515] border border-zinc-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden group transition-colors ${qrActive ? 'cursor-pointer hover:border-[#0ea5e9]' : 'opacity-50 cursor-not-allowed'}`} 
             onClick={() => qrActive && setTopupModalStep("bank")}
          >
            <div className="flex items-center justify-between mb-3">
               <div className="flex flex-col">
                  <div className="flex items-center justify-start gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br from-[#00b09b] to-[#96c93d] rounded-xl flex items-center justify-center shadow-lg transform ${qrActive ? 'group-hover:scale-110' : ''} transition-transform`}>
                       <ScanLine className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-[15px] sm:text-base font-display">สแกนชำระเงิน (QR)</h4>
                      {qrActive ? (
                         <span className="text-[9px] sm:text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider font-sans">Auto 3 Sec</span>
                      ) : (
                         <span className="text-[9px] sm:text-[10px] bg-red-500/20 text-red-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider font-sans">ปิดปรับปรุง</span>
                      )}
                    </div>
                  </div>
                  <div className="text-zinc-500 font-normal text-[11px] sm:text-xs ml-16 mt-0.5 font-sans">คลิกเพื่อเริ่มเติมเงิน</div>
               </div>
               <div className="bg-[#151515] border border-zinc-700 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors shrink-0">
                 <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
               </div>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2 mb-2 font-medium leading-relaxed font-sans">ธนาคารทุกสาขา / PromtPay • แนบสลิปเพื่อยืนยัน</p>
            <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] sm:text-xs font-sans">
              <CheckCircle className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${qrActive ? 'text-emerald-400' : 'text-zinc-500'}`} /> อนุมัติอัตโนมัติ ไม่ต้องแจ้งสลิปแอดมิน
            </div>
          </motion.div>
          
          <button onClick={() => setShowTopupTos(true)} className="w-full flex items-center justify-center gap-1.5 text-zinc-500 hover:text-white transition-colors text-xs py-3">
             <HelpCircle className="w-3.5 h-3.5" /> ดูข้อตกลงและเงื่อนไขการเติมเงิน
          </button>
        </motion.div>
      ) : (
        <motion.div 
          key="form"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-[#151515] border border-zinc-800 rounded-2xl p-5 sm:p-6 text-white w-full mx-auto"
        >
          <div className="flex items-center gap-3 mb-5 sm:mb-6 relative">
            <button
              onClick={() => {
                setAngpaoCode("");
                setTopupModalStep("select");
              }}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-300 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-xl sm:text-2xl font-display">
              {topupModalStep === "angpao" ? "กรอกซองอั่งเปา" : topupModalStep === "bank" ? "แนบสลิปโอนเงิน" : topupModalStep === "coupon" ? "กรอกคูปอง" : ""}
            </h3>
          </div>

          {topupModalStep === "angpao" && (
            <div className="mb-6 bg-[#ff203a]/10 border border-[#ff203a]/20 rounded-xl p-4 text-center font-sans">
               <p className="text-sm sm:text-base text-[#ff6b7e] font-bold mb-1">สร้างซองของขวัญแบบ "แบ่งจำนวนเงินเท่ากัน"</p>
               <p className="text-[11px] sm:text-xs text-zinc-400">ยอดเงินจะถูกแปลงเป็นเครดิตตามมูลค่า (ขั้นต่ำ 10 บาท)</p>
            </div>
          )}

          {topupModalStep === "coupon" && (
            <div className="mb-6 bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 rounded-xl p-4 text-center font-sans">
               <p className="text-sm sm:text-base text-[#0ea5e9] font-bold mb-1">กรอกรหัสคูปองเพื่อรับของรางวัล</p>
               <p className="text-[11px] sm:text-xs text-zinc-400">คูปองอาจมีจำนวนจำกัด หรือหมดอายุตามระยะเวลาที่กำหนด</p>
            </div>
          )}

          <div>
             <form onSubmit={(e) => { e.preventDefault(); handleTopup(e); }}>

             {topupModalStep === "bank" && (
                <div className="mb-5 bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 flex flex-col items-center text-center">
                  {(() => {
                    const qrUrl = parsedSettings.topup_bank_qr_image;
                    const bName = parsedSettings.topup_bank_name;
                    const bAcc = parsedSettings.topup_bank_account_no;
                    const bAccName = parsedSettings.topup_qrcode_name;

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
                                  const response = await fetch(qrUrl);
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
                                  console.error("Failed to download QR code directly, falling back...", error);
                                  const link = document.createElement('a');
                                  link.href = qrUrl;
                                  link.download = 'qrcode_bank.jpg';
                                  link.target = '_blank';
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                }
                              }}
                              className="px-4 py-2 bg-zinc-800 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 border border-zinc-700 hover:border-emerald-500"
                            >
                              <Download className="w-4 h-4" /> บันทึก QR Code
                            </button>
                          </div>
                        ) : (
                          <ScanLine className="w-12 h-12 text-emerald-500/80 mx-auto mb-3" />
                        )}
                        <h3 className="text-white font-bold mb-1 text-sm sm:text-base">รับชำระผ่าน {bName || 'ธนาคาร / QR Code'}</h3>
                        {(bAcc || bAccName) && (
                          <div className="flex flex-col text-sm text-zinc-400 mb-2 mt-1 bg-black/40 border border-zinc-800 w-full py-2.5 rounded-xl gap-1">
                             {bAcc && (
                               <div className="flex items-center justify-center gap-2">
                                 <span>เลขบัญชี: <span className="text-emerald-400 font-mono tracking-wider font-bold text-base">{bAcc}</span></span>
                                 <button
                                   type="button"
                                   onClick={(e) => {
                                     e.preventDefault();
                                     navigator.clipboard.writeText(bAcc);
                                     alert('คัดลอกเลขบัญชีแล้ว');
                                   }}
                                   title="คัดลอกเลขบัญชี"
                                   className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors text-zinc-300 hover:text-white border border-zinc-700"
                                 >
                                   <Copy className="w-3.5 h-3.5" />
                                 </button>
                               </div>
                             )}
                             {bAccName && <span>ชื่อบัญชี: <span className="text-white font-medium">{bAccName}</span></span>}
                          </div>
                        )}
                        <p className="text-amber-500 text-[11px] sm:text-xs mt-1 px-3 py-1.5 bg-amber-500/10 rounded-full inline-flex items-center gap-1.5 font-medium"><AlertTriangle className="w-3.5 h-3.5 shrink-0" /> หลังจากโอนเสร็จให้อัพโหลดสลิปภายใน 5 นาที</p>
                      </>
                    )
                  })()}
                </div>
             )}

             {topupModalStep === "angpao" && (
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
             )}
             
             {topupModalStep === "coupon" && (
               <input 
                 type="text" 
                 value={angpaoCode} // Using angpaoCode state for coupon code to minimize prop changes
                 onChange={(e) => setAngpaoCode(e.target.value)}
                 className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] transition-all text-center mb-5 text-sm sm:text-base placeholder-zinc-600 uppercase"
                 placeholder="ใส่รหัสคูปองที่นี่..."
                 style={{ textTransform: 'uppercase' }}
               />
             )}
             
             {topupModalStep === "bank" && (
               <div className="relative border-2 border-dashed border-zinc-700 bg-black/50 rounded-xl p-5 sm:p-6 text-center hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all mb-5 group cursor-pointer">
                 <input 
                   type="file" 
                   accept="image/*"
                   onChange={(e) => {
                     const file = e.target.files?.[0];
                     if (file) {
                       setSlipFile(file);
                       handleTopup(e);
                     }
                   }}
                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                 />
                 <div className="flex flex-col items-center pointer-events-none">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-zinc-800 group-hover:bg-emerald-500/20 rounded-full flex items-center justify-center mb-3 transition-colors">
                      <Plus className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-400 group-hover:text-emerald-400" />
                    </div>
                    <p className="text-zinc-300 font-bold mb-1 text-xs sm:text-sm">แตะเพื่อเลือกรูปภาพ หรือลากมาวาง</p>
                    <p className="text-zinc-500 text-[11px] sm:text-xs">PNG, JPG ขนาดไม่เกิน 5MB</p>
                 </div>
               </div>
             )}
             
             {(topupModalStep === "angpao" || topupModalStep === "coupon") && (
             <button 
               type="submit"
               disabled={isProcessingTopup}
               className={`w-full ${topupModalStep === "angpao" ? "bg-[#ff203a] hover:bg-[#ff4d63] shadow-[#ff203a]/20" : "bg-[#0ea5e9] hover:bg-sky-500 shadow-[#0ea5e9]/20"} disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 sm:py-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 transition-colors shadow-lg`}
             >
               {isProcessingTopup ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
               ) : (
                 <>
                   <Send className="w-5 h-5" /> {topupModalStep === "angpao" ? "ยืนยันการเติมเงิน" : "ยืนยันรหัสคูปอง"}
                 </>
               )}
             </button>
             )}
             </form>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.div>
  );
};
