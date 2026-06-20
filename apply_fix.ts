import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const regexAuthModal = /\{\/\* Authentication Modal \*\/\}[\s\S]*?\n\s+\}\)\}\s*<\/AnimatePresence>/m;
const regexTopupModal = /\{\/\* Top Up Modal \*\/\}[\s\S]*?(?=\{\/\* Payment Notification Animation \*\/\}|\{\/\* Admin Modal \*\/)/m;

const authContent = `      {/* Authentication Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex flex-col bg-black overflow-y-auto">
            {/* Background design - diagonal lines */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(110deg, transparent, transparent 30px, rgba(255,255,255,0.03) 30px, rgba(255,255,255,0.03) 32px)' }}></div>
            
            <div className="relative z-10 w-full max-w-md mx-auto min-h-screen flex flex-col px-6 py-12 justify-center">
              <div className="flex justify-between items-center mb-10 absolute top-6 left-6 right-6">
                 {/* Logo placeholder */}
                 <div className="flex items-center">
                   <div className="flex items-center justify-center">
                     <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0ea5e9"/>
                       <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                   </div>
                 </div>
                 <button className="text-zinc-500 hover:text-white transition-colors" onClick={() => setShowAuthModal(false)}>
                   <X className="w-8 h-8" />
                 </button>
              </div>

              <div className="mb-8 mt-12">
                <h2 className="text-4xl font-bold text-white mb-1">
                  {authMode === "login" ? "เข้าสู่ระบบ" : authMode === "forgot" ? "ลืมรหัสผ่าน" : "สมัครสมาชิก"}
                </h2>
                <p className="text-zinc-400 font-sans text-xl">
                  {authMode === "login" ? "Login" : authMode === "forgot" ? "Forgot Password" : "Register"}
                </p>
              </div>

              {authMode !== "forgot" && authMode !== "forgot_verify_otp" && (
                <div className="flex gap-2 w-full p-1 bg-zinc-900/50 shadow-sm border border-zinc-800 rounded-xl mb-6 hidden">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("login");
                      setAuthError("");
                    }}
                    className={"flex-1 py-3 text-sm font-bold rounded-lg transition-colors cursor-pointer " + (authMode === "login" ? "bg-zinc-800 text-white shadow-md border border-zinc-700" : "text-zinc-500 hover:text-zinc-300")}
                  >
                    เข้าสู่ระบบ
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("register");
                      setAuthError("");
                    }}
                    className={"flex-1 py-3 text-sm font-bold rounded-lg transition-colors cursor-pointer " + (authMode === "register" ? "bg-zinc-800 text-white shadow-md border border-zinc-700" : "text-zinc-500 hover:text-zinc-300")}
                  >
                    สมัครสมาชิก
                  </button>
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-6 font-sans">
                {authMode !== "forgot" && authMode !== "forgot_verify_otp" && (
                  <div>
                    <label className="text-[16px] font-bold text-white block mb-2">
                     ชื่อผู้ใช้ / Username
                    </label>
                    <input
                      type="text"
                      value={authUsername}
                      onChange={(e) => {
                        setAuthUsername(e.target.value);
                        setAuthError("");
                      }}
                      placeholder="กรอกชื่อผู้ใช้"
                      required={authMode === "login" || authMode === "register"}
                      autoFocus={authMode === "login" || authMode === "register"}
                      autoComplete="username"
                      className="w-full bg-[#151515] border border-zinc-800 text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-[#0ea5e9] transition-all text-base placeholder-zinc-500 placeholder:font-medium"
                    />
                  </div>
                )}

                {(authMode === "register" ||
                  authMode === "forgot" ||
                  authMode === "forgot_verify_otp") && (
                  <div>
                    <label className="text-[16px] font-bold text-white block mb-2">
                      อีเมล / Email <span className="text-red-500">*จำเป็น</span>
                    </label>
                    <input
                      type="email"
                      value={authEmail}
                      onChange={(e) => {
                        setAuthEmail(e.target.value);
                        setAuthError("");
                      }}
                      placeholder="กรอกที่อยู่อีเมล"
                      required
                      autoComplete="email"
                      readOnly={authMode === "forgot_verify_otp"}
                      className={"w-full bg-[#151515] border border-zinc-800 text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-[#0ea5e9] transition-all text-base placeholder-zinc-500 " + (authMode === "forgot_verify_otp" ? "opacity-70 cursor-not-allowed" : "")}
                    />
                  </div>
                )}

                {(authMode === "login" ||
                  authMode === "register" ||
                  authMode === "forgot_verify_otp") && (
                  <div>
                    <label className="text-[16px] font-bold text-white block mb-2">
                      รหัสผ่าน / Password
                    </label>
                    <div className="relative">
                      <input
                        type={showAuthPassword ? "text" : "password"}
                        value={authPassword}
                        onChange={(e) => {
                          setAuthPassword(e.target.value);
                          setAuthError("");
                        }}
                        placeholder="กรอกรหัสผ่าน"
                        required
                        autoComplete="current-password"
                        className="w-full bg-[#151515] border border-zinc-800 text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-[#0ea5e9] transition-all text-base placeholder-zinc-500 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAuthPassword(!showAuthPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                      >
                        {showAuthPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                      </button>
                    </div>
                  </div>
                )}

                {authMode === "login" && (
                  <div className="flex items-center gap-3 mt-4">
                    <input
                      type="checkbox"
                      id="rememberAuth"
                      checked={rememberAuth}
                      onChange={(e) => setRememberAuth(e.target.checked)}
                      className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 border accent-[#0ea5e9] cursor-pointer"
                    />
                    <label htmlFor="rememberAuth" className="text-base font-medium text-white cursor-pointer select-none">
                      จดจำการเข้าสู่ระบบ
                    </label>
                  </div>
                )}

                <div className="mt-4 bg-[#151515] border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-5 h-5 rounded-full border-2 border-[#ff8f00] border-t-transparent animate-spin flex items-center justify-center shrink-0" />
                     <span className="text-sm text-zinc-300">กำลังตรวจสอบ...</span>
                   </div>
                   <div className="text-right">
                     <div className="text-[#f6821f] font-bold leading-none text-xl mb-1 flex justify-end">
                       <svg viewBox="0 0 100 50" className="w-10 h-5" fill="currentColor">
                         <path d="M85.7,21.5c-0.2-0.8-0.8-1.5-1.5-1.7C81,18.7,77,15,71.2,15c-0.6,0-1.1,0-1.6,0.1c-1.3-3.6-4.6-6.4-8.7-7.2c-0.8-0.2-1.6-0.2-2.5-0.2c-4.4,0-8.3,2-10.9,5C46,8.6,40.1,6,33.5,6c-9.5,0-17.6,6.3-20.1,15C5.8,22.2,0,29.3,0,38c0,9.9,8.1,18,18,18h66c8.8,0,16-7.2,16-16C100,29.8,93.6,22.7,85.7,21.5z"></path>
                       </svg>
                     </div>
                     <div className="text-[9px] text-zinc-400 font-bold tracking-wider">CLOUDFLARE<br/>ความเป็นส่วนตัว<br/>ช่วยเหลือ</div>
                   </div>
                </div>

                <div className="mt-2 text-center text-sm text-zinc-400">
                   {authMode === "login" ? "ยังไม่มีบัญชี? " : "มีบัญชีแล้ว? "}
                   <button type="button" onClick={() => setAuthMode(authMode === "login" ? "register" : "login")} className="text-[#0ea5e9] hover:underline">
                     {authMode === "login" ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
                   </button>
                </div>

                {authError && (
                  <div className="text-sm text-red-500 text-center bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                    {authError}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#008ff7] hover:bg-blue-600 active:bg-blue-700 text-white font-bold cursor-pointer transition-all shadow-xl shadow-blue-500/20 text-lg flex justify-center"
                  >
                    {authMode === "login" ? "เข้าสู่ระบบ" : authMode === "forgot" ? "ส่งรหัสยืนยัน" : authMode === "forgot_verify_otp" ? "เปลี่ยนรหัสผ่าน" : "สมัครสมาชิก"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>
`;

const topupContent = `      {/* Top Up Modal */}
      <AnimatePresence>
        {showTopupModal && (
          <div className="fixed inset-0 z-[100] flex flex-col bg-black overflow-y-auto">
            {/* Background design */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(110deg, transparent, transparent 30px, rgba(255,255,255,0.03) 30px, rgba(255,255,255,0.03) 32px)' }}></div>
            
            <div className="relative z-10 w-full max-w-md mx-auto min-h-screen flex flex-col px-6 py-12 justify-center">
              <div className="flex justify-between items-center mb-8 absolute top-6 left-6 right-6">
                 <div className="flex items-center">
                   <div className="flex items-center justify-center">
                     <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0ea5e9"/>
                       <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                   </div>
                 </div>
                 <button className="text-zinc-500 hover:text-white transition-colors" onClick={() => setShowTopupModal(false)}>
                   <X className="w-8 h-8" />
                 </button>
              </div>
              
              <div className="mb-10 mt-12 text-center text-white">
                 <h2 className="text-4xl font-bold mb-4">ช่องทางการชำระเงิน</h2>
                 <p className="text-zinc-400 text-base">เลือกช่องทางที่ต้องการเพื่อเติมเงินเข้าบัญชีของ<br/>คุณ</p>
              </div>

              {!tosAccepted ? (
                <div className="bg-[#151515] border border-zinc-800 rounded-3xl p-6 shadow-xl mb-6 text-white text-center">
                  <div className="w-16 h-16 bg-[#0ea5e9]/20 border border-[#0ea5e9]/40 rounded-full flex items-center justify-center mx-auto mb-4 text-[#0ea5e9]">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">ข้อตกลงและเงื่อนไข</h3>
                  <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-400 mb-6 text-left max-h-40 overflow-y-auto">
                    <p>1. ทางร้านขอสงวนสิทธิ์ไม่รับเคลมทุกกรณี หากเกิดข้อผิดพลาดจากการกรอกข้อมูลผิด</p>
                    <p className="mt-2">2. หากพบปัญหาในการเติมเงิน โปรดติดต่อแอดมินทันที</p>
                    <p className="mt-2">3. สลิปปลอม หรืออั่งเปาที่มีคนรับไปแล้ว หากตรวจพบจะแบนไอดีถาวร</p>
                  </div>
                  <button 
                    onClick={() => setTosAccepted(true)}
                    className="w-full bg-[#008ff7] hover:bg-blue-600 text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2"
                  >
                     <CheckCircle className="w-6 h-6" /> ยอมรับเงื่อนไข
                  </button>
                </div>
              ) : topupModalStep === "select" ? (
                <div className="space-y-6">
                  {/* Angpao Option */}
                  <div className="bg-[#151515] border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group">
                    <div className="flex gap-5 mb-5 relative z-10">
                      <div className="w-[72px] h-[72px] bg-[#ff203a] rounded-3xl shrink-0 flex items-center justify-center relative shadow-lg">
                        <div className="w-[30px] h-[30px] bg-[#ffd700] rounded-full border-[5px] border-[#ff203a] z-10 relative -top-2"></div>
                        <div className="absolute bottom-1 w-12 h-4 bg-[#ff6b7e] rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col items-start gap-1 pb-1">
                           <h3 className="text-2xl font-bold text-white mb-2">ซองอั่งเปา</h3>
                           <span className="text-xs font-bold px-3 py-1 rounded-full border border-orange-500/50 text-orange-400 bg-orange-500/10">ตรวจสอบอัตโนมัติ</span>
                        </div>
                        <p className="text-[14px] text-zinc-300 mt-3 mb-2 font-medium leading-relaxed">True Money Wallet • ใช้ลิงค์<br/>ซองอั่งเปาเพื่อเติมเงิน</p>
                        <div className="flex items-center gap-1.5 text-zinc-500 text-[13px]">
                          <Gift className="w-4 h-4 shrink-0" /> <span>เหมาะสำหรับผู้ใช้ TrueMoney<br/>Wallet</span>
                        </div>
                        <div className="flex items-center gap-2 mt-4 text-[#ff203a] text-sm font-bold">
                           <div className="w-7 h-7 rounded-full bg-[#ff203a]/20 flex items-center justify-center"><svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></div>
                           พร้อมใช้งาน
                        </div>
                           <div className="text-zinc-500 font-normal text-xs ml-9 mt-0.5">คลิกเพื่อเริ่มเติมเงิน</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => { setSelectedTopupChannel("angpao"); setTopupModalStep("angpao"); setTopupError(""); }}
                      className="w-full bg-[#008ff7] hover:bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-lg relative z-10"
                    >
                       <ChevronRight className="w-5 h-5 ml-1" /> เลือก
                    </button>
                  </div>

                  {/* Bank Slip Option */}
                  <div className="bg-[#151515] border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group">
                    <div className="flex gap-5 mb-5 relative z-10">
                      <div className="w-[72px] h-[72px] bg-[#bb00ff] rounded-3xl shrink-0 flex items-center justify-center relative shadow-lg">
                         <div className="bg-white rounded-[10px] p-2.5 w-10 h-11 shrink-0 flex flex-col items-center">
                           <div className="w-full h-1.5 bg-[#bb00ff]/20 rounded-full mb-1.5 border-b border-gray-200"></div>
                           <div className="w-full h-[3px] bg-[#bb00ff]/20 mb-1.5"></div>
                           <div className="w-full flex gap-1.5"><div className="w-1/2 h-[3px] bg-[#bb00ff]/20"></div><div className="w-1/2 h-[3px] bg-[#bb00ff]/20"></div></div>
                         </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col items-start gap-1 pb-1">
                           <h3 className="text-2xl font-bold text-white mb-2">สลิปโอนเงิน</h3>
                           <span className="text-xs font-bold px-3 py-1 rounded-full border border-purple-500/50 text-purple-400 bg-purple-500/10">ตรวจสอบอัตโนมัติ</span>
                        </div>
                        <p className="text-[14px] text-zinc-300 mt-3 mb-2 font-medium leading-relaxed">สแกนจ่าย QR Code รองรับทุกธนาคาร</p>
                        <div className="flex items-center gap-2 mt-4 text-[#bb00ff] text-sm font-bold">
                           <div className="w-7 h-7 rounded-full bg-[#bb00ff]/20 flex items-center justify-center"><Check className="w-4 h-4" /></div>
                           พร้อมใช้งาน
                        </div>
                           <div className="text-zinc-500 font-normal text-xs ml-9 mt-0.5">คลิกเพื่อเริ่มอัพโหลดสลิป</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => { setSelectedTopupChannel("bank"); setTopupModalStep("bank"); setTopupError(""); }}
                      className="w-full bg-[#008ff7] hover:bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-lg relative z-10"
                    >
                       <ChevronRight className="w-5 h-5 ml-1" /> เลือก
                    </button>
                  </div>
                </div>
              ) : topupModalStep === "success" ? (
                <div className="bg-[#151515] border border-zinc-800 rounded-3xl p-8 text-center text-white">
                  <div className="w-24 h-24 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 scale-110">
                    <CheckCircle className="w-12 h-12 text-emerald-400" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">ทำรายการสำเร็จ!</h3>
                  <div className="text-emerald-400 text-base mb-10 leading-relaxed font-mono">
                    {topupSuccessMessage.split("\\n").map((line, i) => (
                      <div key={i} className="mb-2">{line}</div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setTopupModalStep("select");
                      setShowTopupModal(false);
                    }}
                    className="w-full bg-[#008ff7] text-white font-bold py-4 rounded-xl text-lg"
                  >
                    กลับสู่หน้าหลัก
                  </button>
                </div>
              ) : (
                <div className="bg-[#151515] border border-zinc-800 rounded-3xl p-6 text-white w-full mx-auto">
                  <div className="flex items-center gap-3 mb-8 relative">
                    <button
                      onClick={() => setTopupModalStep("select")}
                      className="w-10 h-10 flex items-center justify-center rounded-3xl bg-zinc-800/80 text-zinc-300 hover:text-white"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h3 className="font-bold text-2xl">
                      {topupModalStep === "angpao" ? "กรอกซองอั่งเปา" : topupModalStep === "bank" ? "แนบสลิปโอนเงิน" : ""}
                    </h3>
                  </div>

                  {topupModalStep === "angpao" && (
                    <div className="mb-6 bg-[#ff203a]/10 border border-[#ff203a]/20 rounded-2xl p-5 text-center">
                       <p className="text-base text-[#ff6b7e] font-bold mb-2">สร้างซองของขวัญแบบ "แบ่งจำนวนเงินเท่ากัน"</p>
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
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-500 font-bold text-center">
                        {topupError}
                      </div>
                    )}

                    {topupModalStep === "angpao" && (
                      <div>
                        <input
                          type="text"
                          value={topupCode}
                          onChange={(e) => setTopupCode(e.target.value)}
                          placeholder="ลิ้งค์ซองอั่งเปา"
                          required
                          className="w-full bg-[#0a0a0a] border border-zinc-800 text-white p-5 rounded-2xl focus:border-[#0ea5e9] outline-none text-base font-mono"
                        />
                      </div>
                    )}

                    {topupModalStep === "bank" && (
                      <div>
                        <label className="flex flex-col items-center justify-center w-full min-h-[10rem] py-6 border-2 border-dashed border-zinc-700 hover:border-[#0ea5e9] rounded-2xl cursor-pointer bg-[#0a0a0a] transition-colors group">
                           {slipFile ? (
                              <img src={URL.createObjectURL(slipFile)} className="max-h-40 object-contain rounded-xl" alt="slip" />
                           ) : (
                              <div className="text-center px-4">
                               <UploadCloud className="w-10 h-10 text-zinc-500 mx-auto mb-3 group-hover:text-[#0ea5e9]" />
                               <span className="text-base text-zinc-400 block font-medium group-hover:text-[#0ea5e9]">คลิกเพื่ออัพโหลดสลิปโอนเงิน</span>
                               <span className="text-xs text-zinc-600 mt-2 block">รองรับไฟล์รูปภาพทุกประเภท</span>
                              </div>
                           )}
                           <input type="file" className="hidden" accept="image/*" onChange={(e) => setSlipFile(e.target.files?.[0] || null)} />
                        </label>
                      </div>
                    )}

                    <div className="pt-2">
                       <button 
                         type="submit" 
                         disabled={isProcessingTopup}
                         className="w-full bg-[#008ff7] hover:bg-blue-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold py-4 text-lg rounded-xl flex justify-center items-center gap-2"
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


if (content.match(regexAuthModal)) {
   content = content.replace(regexAuthModal, authContent);
}

if (content.match(regexTopupModal)) {
   content = content.replace(regexTopupModal, topupContent);
}

fs.writeFileSync('src/App.tsx', content);
