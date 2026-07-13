import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, AlertTriangle, QrCode, Landmark, Copy, Download, Plus, CheckCircle
} from 'lucide-react';

export const TopupPage = ({
  topupModalStep,
  setTopupModalStep,
  handleTopup,
  isProcessingTopup,
  angpaoCode,
  setAngpaoCode,
  slipFile,
  setSlipFile,
  topupTarget,
  globalStats,
  setAppScreen,
  tosAccepted,
  setTosAccepted,
  setShowTopupTos
}: any) => {

  let parsedSettings: any = {};
  if (globalStats?.announcement_settings) {
    if (typeof globalStats.announcement_settings === 'string') {
      try { parsedSettings = JSON.parse(globalStats.announcement_settings); } catch(e) { parsedSettings = {}; }
    } else {
      parsedSettings = globalStats.announcement_settings;
    }
  }

  const angpaoActive = parsedSettings.topup_angpao_status !== false;
  const qrActive = parsedSettings.topup_qrcode_status !== false;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-xl mx-auto py-8 flex flex-col justify-start px-4 sm:px-0"
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center justify-center gap-3">
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
            'เติมเงินเข้าระบบ'
          </span>
        </h2>
        <p className="text-zinc-400 mt-2 text-sm sm:text-base max-w-[280px] sm:max-w-md mx-auto">
          เลือกช่องทางการเติมเงินด้านล่าง
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
      {topupModalStep === "select" ? (
        <motion.div 
          key="select"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {angpaoActive && (
            <div 
              onClick={() => setTopupModalStep("angpao")}
              className="bg-black/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 cursor-pointer hover:border-[#ff203a] hover:bg-[#ff203a]/5 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff203a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ff203a]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-[#ff203a]/5">
                  <img src="https://img5.pic.in.th/file/secure-sv1/true-wallet.png" alt="TrueMoney" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                </div>
                <h4 className="font-bold text-white text-[15px] sm:text-base font-display">โอนผ่านทรูมันนี่ (TrueMoney)</h4>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 mb-2 font-medium leading-relaxed font-sans">TrueMoney Wallet • แนบสลิปเพื่อยืนยันการเติมเงิน</p>
              </div>
            </div>
          )}

          {qrActive && (
            <div 
              onClick={() => setTopupModalStep("bank")}
              className="bg-black/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 cursor-pointer hover:border-emerald-500 hover:bg-emerald-500/5 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/5">
                  <Landmark className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500" />
                </div>
                <h4 className="font-bold text-white text-[15px] sm:text-base font-display">สแกนจ่ายผ่านแอปธนาคาร</h4>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 mb-2 font-medium leading-relaxed font-sans">QR Code • แนบสลิปเพื่อยืนยันการเติมเงิน ฟรีค่าธรรมเนียม</p>
              </div>
            </div>
          )}
          
          
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

             className="bg-black/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 cursor-pointer hover:border-[#0ea5e9] hover:bg-[#0ea5e9]/5 transition-all group relative overflow-hidden sm:col-span-2"
           >
             <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="flex flex-col items-center text-center relative z-10">
               <div className="w-12 h-12 bg-[#0ea5e9]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-[#0ea5e9]/5">
                 <QrCode className="w-6 h-6 text-[#0ea5e9]" />
               </div>
               <h4 className="font-bold text-white text-[15px] sm:text-base font-display">กรอกรหัสคูปอง</h4>
               <p className="text-xs sm:text-sm text-zinc-300 mt-2 font-medium font-sans">รับเครดิตฟรี หรือ ไอเทมจากคูปอง</p>
             </div>
           </div>
        </motion.div>
      ) : (
        <motion.div 
          key="form"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 opacity-50" />
          
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <button 
              onClick={() => {
                setTopupModalStep("select");
                setAngpaoCode("");
                setSlipFile(null);
              }}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {topupModalStep === "angpao" ? "สลิป TrueMoney Wallet" : topupModalStep === "bank" ? "แนบสลิปโอนเงินธนาคาร" : topupModalStep === "bank_generate" ? "สแกน QR แบบระบุยอด"  : topupModalStep === "coupon" ? "กรอกคูปอง" : ""}
            </h3>
          </div>

          {topupModalStep === "angpao" && (
            <div className="mb-6 bg-[#ff203a]/10 border border-[#ff203a]/20 rounded-xl p-6 text-center font-sans">
               {(() => {
                    const isRov = false;
                    const angpaoPhone = isRov ? parsedSettings.rov_topup_angpao_phone : (parsedSettings.topup_angpao_phone || "0928886584");
                    return (
                        <>
                           <p className="text-sm sm:text-base text-[#ff6b7e] font-bold mb-1">โอนเงินเข้า TrueMoney Wallet</p>
                           <p className="text-xs sm:text-sm text-zinc-400 mb-3">โอนเงินไปยังเบอร์ด้านล่าง และนำสลิปมาแนบเพื่อยืนยัน</p>
                           <div className="bg-black/40 rounded-lg p-3 inline-flex items-center gap-3">
                              <span className="text-xl sm:text-2xl font-mono text-white tracking-wider">{angpaoPhone}</span>
                              <button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigator.clipboard.writeText(angpaoPhone);
                                }}
                                className="text-[#ff203a] hover:text-[#ff4d63] p-1 transition-colors"
                              >
                                <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                              </button>
                           </div>
                           <p className="text-zinc-500 text-[10px] sm:text-xs mt-3">แตะที่เบอร์เพื่อคัดลอก</p>
                        </>
                    )
               })()}
            </div>
          )}

          {topupModalStep === "coupon" && (
            <div className="mb-6 text-center">
               <p className="text-sm sm:text-base text-zinc-300 font-medium mb-2">กรอกรหัสคูปองเพื่อรับรางวัล</p>
               <p className="text-[11px] sm:text-xs text-zinc-400">คูปองอาจมีจำนวนจำกัด หรือหมดอายุตามระยะเวลาที่กำหนด</p>
            </div>
          )}

          <div>
             <form onSubmit={(e) => { e.preventDefault(); handleTopup(e); }}>

             
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
                              <img src={genQrUrl.startsWith('data:') ? genQrUrl : `data:image/png;base64,${genQrUrl}`} alt="Generated QR Code" className="w-full h-full object-contain rounded-lg" />
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
  
                <div className="mb-5 bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 flex flex-col items-center text-center">
                  {(() => {
                    const isRov = false;
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
                                  const response = await fetch(qrUrl);
                                  const blob = await response.blob();
                                  const url = window.URL.createObjectURL(blob);
                                  const downloadAnchor = document.createElement('a');
                                  downloadAnchor.style.display = 'none';
                                  downloadAnchor.href = url;
                                  downloadAnchor.download = 'qr-code.jpg';
                                  document.body.appendChild(downloadAnchor);
                                  downloadAnchor.click();
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

             <div className="flex items-center justify-center gap-2 mb-4">
               <input
                 type="checkbox"
                 id="tos"
                 checked={tosAccepted}
                 onChange={(e) => setTosAccepted(e.target.checked)}
                 className="w-4 h-4 rounded border-zinc-700 bg-black/50 accent-[#0ea5e9] cursor-pointer"
               />
               <label htmlFor="tos" className="text-xs sm:text-sm text-zinc-300 cursor-pointer select-none">
                 ฉันยอมรับ <span className="text-[#0ea5e9] hover:underline" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowTopupTos(true); }}>ข้อกำหนดในการให้บริการ</span>
               </label>
             </div>

             <button 
               type="submit"
               disabled={isProcessingTopup || ((topupModalStep === "bank" || topupModalStep === "angpao") && !slipFile) || (topupModalStep === "coupon" && !angpaoCode)}
               className={`w-full ${topupModalStep === "angpao" ? "bg-[#ff203a] hover:bg-[#ff4d63] shadow-[#ff203a]/20" : topupModalStep === "bank" ? "bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20" : "bg-[#0ea5e9] hover:bg-sky-500 shadow-[#0ea5e9]/20"} disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 sm:py-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 transition-colors shadow-lg`}
             >
               {isProcessingTopup ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
               ) : (
                 <>
                   <Send className="w-5 h-5" /> {topupModalStep === "angpao" ? "ยืนยันสลิป TrueMoney" : topupModalStep === "bank" ? "ยืนยันสลิปธนาคาร" : "ยืนยันรหัสคูปอง"}
                 </>
               )}
             </button>
             </form>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.div>
  );
};
