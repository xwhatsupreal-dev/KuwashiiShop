import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const regexAuthModal = /\{\/\* Authentication Modal \*\/\}[\s\S]*?(?=\{\/\* Admin Modal \*\/\}|\{\/\* Customer Database Modal \*\/\}|\{\/\* Stock Manager Modal \*\/\}|\{\/\* Main Content \*\/\}|\{\/\* Topup Modal \*\/)/;

const newAuthModal = `{/* Authentication Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex flex-col bg-zinc-950 overflow-y-auto">
            {/* Background design - diagonal lines */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(110deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px)' }}></div>
            
            <div className="relative z-10 w-full max-w-md mx-auto min-h-screen flex flex-col px-6 py-12">
              <div className="flex justify-between items-center mb-10">
                 {/* Logo placeholder */}
                 <div className="flex items-center">
                   <div className="w-8 h-8 flex items-center justify-center">
                     <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                   </div>
                 </div>
                 <button className="text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 p-2 rounded-xl transition-colors shadow-lg" onClick={() => setShowAuthModal(false)}>
                   <X className="w-5 h-5" />
                 </button>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-1">
                  {authMode === "login" ? "เข้าสู่ระบบ" : authMode === "forgot" ? "ส่วนลืมรหัสผ่าน" : "สมัครสมาชิก"}
                </h2>
                <p className="text-zinc-400 font-sans">
                  {authMode === "login" ? "Login" : authMode === "forgot" ? "Forgot Password" : "Register"}
                </p>
              </div>

              {authMode !== "forgot" && authMode !== "forgot_verify_otp" && (
                <div className="flex gap-2 w-full p-1 bg-zinc-900 shadow-sm border border-zinc-800 rounded-xl mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("login");
                      setAuthError("");
                    }}
                    className={\`flex-1 py-3 text-sm font-bold rounded-lg transition-colors cursor-pointer \${authMode === "login" ? "bg-zinc-800 text-white shadow-md border border-zinc-700" : "text-zinc-500 hover:text-zinc-300"}\`}
                  >
                    เข้าสู่ระบบ
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("register");
                      setAuthError("");
                    }}
                    className={\`flex-1 py-3 text-sm font-bold rounded-lg transition-colors cursor-pointer \${authMode === "register" ? "bg-zinc-800 text-white shadow-md border border-zinc-700" : "text-zinc-500 hover:text-zinc-300"}\`}
                  >
                    สมัครสมาชิก
                  </button>
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-5 font-sans">
                {authMode !== "forgot" && authMode !== "forgot_verify_otp" && (
                  <div>
                    <label className="text-[15px] font-bold text-white block mb-2">
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
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-sm placeholder-zinc-500 placeholder:font-medium"
                    />
                  </div>
                )}

                {(authMode === "register" ||
                  authMode === "forgot" ||
                  authMode === "forgot_verify_otp") && (
                  <div>
                    <label className="text-[15px] font-bold text-white block mb-2">
                      อีเมล / Email <span className="text-emerald-500">*จำเป็น</span>
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
                      className={\`w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-sm placeholder-zinc-500 \${authMode === "forgot_verify_otp" ? "opacity-70 cursor-not-allowed" : ""}\`}
                    />
                  </div>
                )}

                {authMode === "forgot_verify_otp" && (
                  <div>
                    <label className="text-[15px] font-bold text-amber-500 block mb-2">
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
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-sm placeholder-zinc-500 text-center tracking-[1em]"
                    />
                  </div>
                )}

                {(authMode === "login" ||
                  authMode === "register" ||
                  authMode === "forgot_verify_otp") && (
                  <div>
                    <label className="text-[15px] font-bold text-white block mb-2">
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
                        className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-sm placeholder-zinc-500 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAuthPassword(!showAuthPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                      >
                        {showAuthPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {authMode === "register" && (
                  <div>
                    <label className="text-[15px] font-bold text-white block mb-2">
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
                        className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-sm placeholder-zinc-500 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAuthConfirmPassword(!showAuthConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                      >
                        {showAuthConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                      className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 border accent-blue-500 cursor-pointer"
                    />
                    <label htmlFor="rememberAuth" className="text-sm font-medium text-white cursor-pointer select-none">
                      จดจำการเข้าสู่ระบบ
                    </label>
                  </div>
                )}

                <div className="mt-4 bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-5 h-5 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin flex items-center justify-center shrink-0" />
                     <span className="text-sm text-zinc-300">กำลังตรวจสอบ...</span>
                   </div>
                   <div className="text-right">
                     <div className="text-amber-500 font-bold leading-none text-xl mb-1 flex justify-end">
                       <svg viewBox="0 0 100 50" className="w-10 h-5" fill="currentColor">
                         <path d="M85.7,21.5c-0.2-0.8-0.8-1.5-1.5-1.7C81,18.7,77,15,71.2,15c-0.6,0-1.1,0-1.6,0.1c-1.3-3.6-4.6-6.4-8.7-7.2c-0.8-0.2-1.6-0.2-2.5-0.2c-4.4,0-8.3,2-10.9,5C46,8.6,40.1,6,33.5,6c-9.5,0-17.6,6.3-20.1,15C5.8,22.2,0,29.3,0,38c0,9.9,8.1,18,18,18h66c8.8,0,16-7.2,16-16C100,29.8,93.6,22.7,85.7,21.5z"></path>
                       </svg>
                     </div>
                     <div className="text-[9px] text-zinc-400 font-bold tracking-wider">CLOUDFLARE<br/>ความเป็นส่วนตัว<br/>ช่วยเหลือ</div>
                   </div>
                </div>

                {authError && (
                  <div className="text-sm text-red-500 text-center bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                    {authError}
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold cursor-pointer transition-all shadow-xl shadow-blue-500/20 text-base flex justify-center"
                  >
                    {authMode === "login" ? "เข้าสู่ระบบ" : authMode === "forgot" ? "ส่งรหัสยืนยัน" : authMode === "forgot_verify_otp" ? "เปลี่ยนรหัสผ่าน" : "สมัครสมาชิก"}
                  </button>
                </div>

                {authMode === "login" && (
                  <div className="text-center mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("forgot");
                        setAuthError("");
                      }}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      ลืมรหัสผ่าน?
                    </button>
                  </div>
                )}
                
                {authMode !== "login" && (
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

      <AnimatePresence>
        {showTopupModal && (`;

if (content.match(regexAuthModal)) {
   content = content.replace(regexAuthModal, newAuthModal);
   fs.writeFileSync('src/App.tsx', content);
   console.log('Success');
} else {
   console.log('Fail to find login area');
}
