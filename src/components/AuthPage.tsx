import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';

export const AuthPage = ({
  authMode,
  setAuthMode,
  authUsername,
  setAuthUsername,
  authEmail,
  setAuthEmail,
  authPassword,
  setAuthPassword,
  authConfirmPassword,
  setAuthConfirmPassword,
  showAuthPassword,
  setShowAuthPassword,
  showAuthConfirmPassword,
  setShowAuthConfirmPassword,
  authOtpCode,
  setAuthOtpCode,
  rememberAuth,
  setRememberAuth,
  authError,
  setAuthError,
  handleAuthSubmit,
  isProcessing,
  isCaptchaVerified,
  setIsCaptchaVerified
}: any) => {

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-[280px] sm:max-w-md mx-auto py-4 sm:py-6 flex flex-col justify-start px-2 sm:px-0"
    >
              <div className="mb-4 sm:mb-6 text-center flex flex-col items-center">
                <img src="https://img2.pic.in.th/1000111145.png" alt="Logo" className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 object-contain rounded-xl shadow-lg" />
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1.5 sm:mb-2">
                  {authMode === "login" ? "เข้าสู่ระบบ" : authMode === "forgot" ? "ส่วนลืมรหัสผ่าน" : authMode === "forgot_verify_otp" ? "เปลี่ยนรหัสผ่าน" : "สมัครสมาชิก"}
                </h2>
                <p className="text-zinc-400 font-sans text-xs sm:text-sm">
                  {authMode === "login" ? "Login" : authMode === "forgot" ? "Forgot Password" : authMode === "forgot_verify_otp" ? "Verify OTP" : "Register"}
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-3 sm:space-y-4 font-sans">
                {authMode !== "forgot" && authMode !== "forgot_verify_otp" && (
                  <div>
                    <label className="text-xs sm:text-sm font-bold text-zinc-300 block mb-1 sm:mb-1.5">
                     ชื่อผู้ใช้ หรือ อีเมล / Username or Email
                    </label>
                    <input
                      type="text"
                      value={authUsername || ''}
                      onChange={(e) => {
                        setAuthUsername(e.target.value);
                        setAuthError("");
                      }}
                      placeholder="กรอกชื่อผู้ใช้ หรือ อีเมล"
                      required={authMode === "login" || authMode === "register"}
                      autoComplete="username"
                      className="w-full bg-[#151515] border border-zinc-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg focus:outline-none focus:border-[#0ea5e9] transition-all text-xs sm:text-sm placeholder-zinc-500 placeholder:font-medium"
                    />
                  </div>
                )}

                {(authMode === "register" ||
                  authMode === "forgot" ||
                  authMode === "forgot_verify_otp") && (
                  <div>
                    <label className="text-xs sm:text-sm font-bold text-zinc-300 block mb-1 sm:mb-1.5">
                      อีเมล / Email <span className="text-red-500">*จำเป็น</span>
                    </label>
                    <input
                      type="email"
                      value={authEmail || ''}
                      onChange={(e) => {
                        setAuthEmail(e.target.value);
                        setAuthError("");
                      }}
                      placeholder="กรอกที่อยู่อีเมล"
                      required
                      autoComplete="email"
                      readOnly={authMode === "forgot_verify_otp"}
                      className={"w-full bg-[#151515] border border-zinc-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg focus:outline-none focus:border-[#0ea5e9] transition-all text-xs sm:text-sm placeholder-zinc-500 " + (authMode === "forgot_verify_otp" ? "opacity-70 cursor-not-allowed" : "")}
                    />
                  </div>
                )}

                {authMode === "forgot_verify_otp" && (
                  <div>
                    <label className="text-xs sm:text-sm font-bold text-[#ff8f00] block mb-1 sm:mb-1.5">
                      ข้อความถูกส่งแล้ว ใส่รหัสตามข้อความนั้น 6 หลัก
                    </label>
                    <input
                      type="text"
                      value={authOtpCode || ''}
                      onChange={(e) => {
                        setAuthOtpCode(e.target.value);
                        setAuthError("");
                      }}
                      placeholder="รหัส 6 หลัก"
                      required
                      className="w-full bg-[#151515] border border-zinc-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg focus:outline-none focus:border-[#0ea5e9] transition-all text-xs sm:text-sm placeholder-zinc-500 text-center tracking-[0.5em]"
                    />
                  </div>
                )}

                {(authMode === "login" ||
                  authMode === "register" ||
                  authMode === "forgot_verify_otp") && (
                  <div>
                    <label className="text-xs sm:text-sm font-bold text-zinc-300 block mb-1 sm:mb-1.5 mt-1.5 sm:mt-2">
                      รหัสผ่าน / Password
                    </label>
                    <div className="relative">
                      <input
                        type={showAuthPassword ? "text" : "password"}
                        value={authPassword || ''}
                        onChange={(e) => {
                          setAuthPassword(e.target.value);
                          setAuthError("");
                        }}
                        placeholder="กรอกรหัสผ่าน"
                        required
                        autoComplete="current-password"
                        className="w-full bg-[#151515] border border-zinc-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg focus:outline-none focus:border-[#0ea5e9] transition-all text-xs sm:text-sm placeholder-zinc-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAuthPassword(!showAuthPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                      >
                        {showAuthPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {authMode === "register" && (
                  <div>
                    <label className="text-xs sm:text-sm font-bold text-zinc-300 block mb-1 sm:mb-1.5 mt-1.5 sm:mt-2">
                      ยืนยันรหัสผ่าน / Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showAuthConfirmPassword ? "text" : "password"}
                        value={authConfirmPassword || ''}
                        onChange={(e) => {
                          setAuthConfirmPassword(e.target.value);
                          setAuthError("");
                        }}
                        placeholder="กรอกรหัสผ่านอีกครั้ง"
                        required
                        autoComplete="new-password"
                        className="w-full bg-[#151515] border border-zinc-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg focus:outline-none focus:border-[#0ea5e9] transition-all text-xs sm:text-sm placeholder-zinc-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAuthConfirmPassword(!showAuthConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                      >
                        {showAuthConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {authMode === "login" && (
                  <div className="flex items-center gap-2 mt-4">
                    <input
                      type="checkbox"
                      id="rememberAuth"
                      checked={!!rememberAuth}
                      onChange={(e) => setRememberAuth?.(e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 border accent-[#0ea5e9] cursor-pointer"
                    />
                    <label htmlFor="rememberAuth" className="text-xs sm:text-sm font-medium text-zinc-300 cursor-pointer select-none">
                      จดจำการเข้าสู่ระบบ
                    </label>
                  </div>
                )}

                <div className="flex justify-center my-4">
                  <Turnstile 
                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
                    onSuccess={() => setIsCaptchaVerified(true)}
                    options={{ theme: 'dark' }}
                  />
                </div>

                {authError && (
                  <div className="text-sm text-red-500 text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    {authError}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-2.5 sm:py-3 rounded-lg bg-[#008ff7] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed active:bg-blue-700 text-white font-bold cursor-pointer transition-all shadow-lg shadow-[#008ff7]/20 text-xs sm:text-sm flex justify-center items-center gap-2"
                  >
                    {isProcessing && <Loader2 className="w-4 h-4 animate-spin"/>}
                    {authMode === "login" ? "เข้าสู่ระบบ" : authMode === "forgot" ? "ส่งรหัสยืนยัน" : authMode === "forgot_verify_otp" ? "เปลี่ยนรหัสผ่าน" : "สมัครสมาชิก"}
                  </button>
                </div>
                
                {(authMode === "login" || authMode === "register") && (
                  <div className="pt-2">
                     <button 
                       type="button"
                       onClick={async () => {
                         try {
                           const response = await fetch('/api/auth/discord/url');
                           if (!response.ok) {
                             throw new Error('Failed to get auth URL');
                           }
                           const { url } = await response.json();
                           const authWindow = window.open(
                             url,
                             'discord_oauth',
                             'width=600,height=700'
                           );
                           if (!authWindow) {
                             alert('Please allow popups for this site to connect with Discord.');
                           }
                         } catch (error) {
                           console.error('OAuth error:', error);
                           setAuthError('ไม่สามารถเชื่อมต่อ Discord ได้');
                         }
                       }}
                       className="w-full py-2.5 sm:py-3 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] active:bg-[#3c45a5] text-white font-bold transition-all shadow-lg shadow-[#5865F2]/20 text-xs sm:text-sm flex justify-center items-center gap-2 cursor-pointer inline-flex"
                     >
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                         <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                       </svg>
                       {authMode === "login" ? "เข้าสู่ระบบด้วย Discord" : "สมัครสมาชิกด้วย Discord"}
                     </button>
                  </div>
                )}

                {authMode === "login" && (
                  <div className="text-center mt-4">
                    <span className="text-xs text-zinc-400 mr-2">ยังไม่มีบัญชี?</span>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("register");
                        setAuthError("");
                      }}
                      className="text-xs text-[#0ea5e9] hover:underline font-bold transition-colors cursor-pointer"
                    >
                      สมัครสมาชิก
                    </button>
                    <div className="mt-3">
                       <button
                         type="button"
                         onClick={() => {
                           setAuthMode("forgot");
                           setAuthError("");
                         }}
                         className="text-xs text-zinc-500 hover:text-white transition-colors cursor-pointer"
                       >
                         ลืมรหัสผ่าน?
                       </button>
                    </div>
                  </div>
                )}
                
                {authMode === "register" && (
                  <div className="text-center mt-4">
                    <span className="text-xs text-zinc-400 mr-2">มีบัญชีแล้ว?</span>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("login");
                        setAuthError("");
                      }}
                      className="text-xs text-[#0ea5e9] hover:underline font-bold transition-colors cursor-pointer"
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
                       className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto cursor-pointer"
                     >
                        กลับไปหน้าเข้าสู่ระบบ
                     </button>
                   </div>
                )}
              </form>
    </motion.div>
  );
};

