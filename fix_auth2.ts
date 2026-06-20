import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const regexAuthModal = /\{\/\* Authentication Modal \*\/\}[\s\S]*?(?=\{\/\* Top Up Modal \*\/\}|\{\/\* Admin Modal \*\/\}|\{\/\* Payment Notification Animation \*\/\}|\{\/\* Main Content \*\/)/;

const authContent = `      {/* Authentication Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex flex-col bg-black overflow-y-auto w-full">
            {/* Background design - diagonal lines */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(110deg, transparent, transparent 30px, rgba(255,255,255,0.03) 30px, rgba(255,255,255,0.03) 32px)' }}></div>
            
            <div className="relative z-10 w-full max-w-lg mx-auto min-h-[100dvh] flex flex-col px-6 py-12 justify-center">
              <div className="flex justify-between items-center mb-10 absolute top-6 left-6 right-6">
                 {/* Logo placeholder */}
                 <div className="flex items-center">
                   <div className="flex items-center justify-center">
                     <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0ea5e9"/>
                       <path d="M26 12L36 7L46 12L36 17L26 12Z" fill="#0ea5e9"/>
                       <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                   </div>
                 </div>
                 <button className="text-zinc-500 hover:text-white transition-colors" onClick={() => setShowAuthModal(false)}>
                   <X className="w-8 h-8" />
                 </button>
              </div>

              <div className="mb-10 text-center flex flex-col items-center">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0ea5e9"/>
                  <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {authMode === "login" ? "เข้าสู่ระบบ" : authMode === "forgot" ? "ส่วนลืมรหัสผ่าน" : "สมัครสมาชิก"}
                </h2>
                <p className="text-zinc-400 font-sans text-xl">
                  {authMode === "login" ? "Login" : authMode === "forgot" ? "Forgot Password" : "Register"}
                </p>
              </div>

              {authMode !== "forgot" && authMode !== "forgot_verify_otp" && (
                <div className="flex gap-2 w-full p-2 bg-zinc-900/50 shadow-sm border border-zinc-800 rounded-xl mb-6 hidden">
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
                    <label className="text-[17px] font-bold text-white block mb-3">
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
                      className="w-full bg-[#151515] border border-zinc-800 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-[#0ea5e9] transition-all text-base placeholder-zinc-500 placeholder:font-medium"
                    />
                  </div>
                )}

                {(authMode === "register" ||
                  authMode === "forgot" ||
                  authMode === "forgot_verify_otp") && (
                  <div>
                    <label className="text-[17px] font-bold text-white block mb-3">
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
                      className={"w-full bg-[#151515] border border-zinc-800 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-[#0ea5e9] transition-all text-base placeholder-zinc-500 " + (authMode === "forgot_verify_otp" ? "opacity-70 cursor-not-allowed" : "")}
                    />
                  </div>
                )}

                {authMode === "forgot_verify_otp" && (
                  <div>
                    <label className="text-[17px] font-bold text-[#ff8f00] block mb-3">
                      ข้อความถูกส่งแล้ว ใส่รหัสตามข้อความนั้น 6 หลัก
                    </label>
                    <input
                      type="text"
                      value={authOtpCode}
                      onChange={(e) => {
                        setAuthOtpCode(e.target.value);
                        setAuthError("");
                      }}
                      placeholder="รหัส 6 หลัก"
                      required
                      className="w-full bg-[#151515] border border-zinc-800 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-[#0ea5e9] transition-all text-base placeholder-zinc-500 text-center tracking-[1em]"
                    />
                  </div>
                )}

                {(authMode === "login" ||
                  authMode === "register" ||
                  authMode === "forgot_verify_otp") && (
                  <div>
                    <label className="text-[17px] font-bold text-white block mb-3 mt-4">
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
                        className="w-full bg-[#151515] border border-zinc-800 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-[#0ea5e9] transition-all text-base placeholder-zinc-500 pr-12"
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

                {authMode === "register" && (
                  <div>
                    <label className="text-[17px] font-bold text-white block mb-3 mt-4">
                      ยืนยันรหัสผ่าน / Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showAuthConfirmPassword ? "text" : "password"}
                        value={authConfirmPassword}
                        onChange={(e) => {
                          setAuthConfirmPassword(e.target.value);
                          setAuthError("");
                        }}
                        placeholder="กรอกรหัสผ่านอีกครั้ง"
                        required
                        autoComplete="new-password"
                        className="w-full bg-[#151515] border border-zinc-800 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-[#0ea5e9] transition-all text-base placeholder-zinc-500 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAuthConfirmPassword(!showAuthConfirmPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                      >
                        {showAuthConfirmPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                      </button>
                    </div>
                  </div>
                )}

                {authMode === "login" && (
                  <div className="flex items-center gap-3 mt-6">
                    <input
                      type="checkbox"
                      id="rememberAuth"
                      checked={rememberAuth}
                      onChange={(e) => setRememberAuth(e.target.checked)}
                      className="w-6 h-6 rounded border-zinc-700 bg-zinc-800 border accent-[#0ea5e9] cursor-pointer"
                    />
                    <label htmlFor="rememberAuth" className="text-base font-medium text-white cursor-pointer select-none">
                      จดจำการเข้าสู่ระบบ
                    </label>
                  </div>
                )}

                <div className="mt-4 border border-zinc-800 p-4 rounded-xl flex flex-row items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-6 h-6 rounded-full border-[3px] border-[#ff8f00] border-t-transparent animate-spin flex items-center justify-center shrink-0" />
                     <span className="text-sm text-zinc-400">กำลังตรวจสอบ...</span>
                   </div>
                   <div className="text-right flex flex-col justify-end items-end h-full">
                     <div className="text-[#f6821f] font-bold leading-none text-2xl flex justify-end">
                       <svg viewBox="0 0 100 50" className="w-10 h-5" fill="currentColor">
                         <path d="M85.7,21.5c-0.2-0.8-0.8-1.5-1.5-1.7C81,18.7,77,15,71.2,15c-0.6,0-1.1,0-1.6,0.1c-1.3-3.6-4.6-6.4-8.7-7.2c-0.8-0.2-1.6-0.2-2.5-0.2c-4.4,0-8.3,2-10.9,5C46,8.6,40.1,6,33.5,6c-9.5,0-17.6,6.3-20.1,15C5.8,22.2,0,29.3,0,38c0,9.9,8.1,18,18,18h66c8.8,0,16-7.2,16-16C100,29.8,93.6,22.7,85.7,21.5z"></path>
                       </svg>
                     </div>
                     <div className="text-[10px] text-zinc-400 font-bold tracking-widest mt-1 uppercase text-right">Cloudflare<br/>ความเป็นส่วนตัว<br/>ช่วยเหลือ</div>
                   </div>
                </div>

                {authError && (
                  <div className="text-sm text-red-500 text-center bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                    {authError}
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#008ff7] hover:bg-blue-600 active:bg-blue-700 text-white font-bold cursor-pointer transition-all shadow-xl shadow-[#008ff7]/20 text-lg flex justify-center"
                  >
                    {authMode === "login" ? "เข้าสู่ระบบ" : authMode === "forgot" ? "ส่งรหัสยืนยัน" : authMode === "forgot_verify_otp" ? "เปลี่ยนรหัสผ่าน" : "สมัครสมาชิก"}
                  </button>
                </div>

                {authMode === "login" && (
                  <div className="text-center mt-6">
                    <span className="text-sm text-zinc-400 mr-2">ยังไม่มีบัญชี?</span>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("register");
                        setAuthError("");
                      }}
                      className="text-sm text-[#0ea5e9] hover:underline font-bold transition-colors"
                    >
                      สมัครสมาชิก
                    </button>
                    <div className="mt-4">
                       <button
                         type="button"
                         onClick={() => {
                           setAuthMode("forgot");
                           setAuthError("");
                         }}
                         className="text-sm text-zinc-500 hover:text-white transition-colors"
                       >
                         ลืมรหัสผ่าน?
                       </button>
                    </div>
                  </div>
                )}
                
                {authMode === "register" && (
                  <div className="text-center mt-6">
                    <span className="text-sm text-zinc-400 mr-2">มีบัญชีแล้ว?</span>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("login");
                        setAuthError("");
                      }}
                      className="text-sm text-[#0ea5e9] hover:underline font-bold transition-colors"
                    >
                      เข้าสู่ระบบ
                    </button>
                  </div>
                )}
                
                {(authMode === "forgot" || authMode === "forgot_verify_otp") && (
                   <div className="text-center pt-2">
                     <button
                       type="button"
                       onClick={() => {
                         setAuthMode("login");
                         setAuthError("");
                       }}
                       className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto"
                     >
                       <ChevronLeft className="w-4 h-4" /> กลับไปหน้าเข้าสู่ระบบ
                     </button>
                   </div>
                )}
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>

`;

if (content.match(regexAuthModal)) {
   content = content.replace(regexAuthModal, authContent);
   fs.writeFileSync('src/App.tsx', content);
   console.log("Auth UI Successfully Patched");
} else {
   console.log("Failed to match Regex for auth");
}
