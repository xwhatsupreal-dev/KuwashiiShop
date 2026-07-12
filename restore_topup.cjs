const fs = require('fs');

const missingPart = `      <AnimatePresence mode="wait">
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
              {topupModalStep === "angpao" ? "สลิป TrueMoney Wallet" : topupModalStep === "bank" ? "แนบสลิปโอนเงินธนาคาร" : topupModalStep === "coupon" ? "กรอกคูปอง" : ""}
            </h3>
          </div>

          {topupModalStep === "angpao" && (
            <div className="mb-6 bg-[#ff203a]/10 border border-[#ff203a]/20 rounded-xl p-6 text-center font-sans">
               {(() => {
                    const isRov = topupTarget === 'balance_rov';
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

          <div>`;

let topup = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

// The file currently has:
//       <AnimatePresence mode="wait">
//       {topupModalStep === "select" ? (
//              <form onSubmit={(e) => { e.preventDefault(); handleTopup(e); }}>

topup = topup.replace(/<AnimatePresence mode="wait">\s*\{topupModalStep === "select" \? \(\s*<form/s, missingPart + '\n             <form');

fs.writeFileSync('src/components/TopupPage.tsx', topup);
console.log("Fully restored file!");
