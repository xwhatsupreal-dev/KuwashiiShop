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
  setIsCaptchaVerified,
  shopLogoUrl
}: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm sm:max-w-md mx-auto my-6 sm:my-12 p-6 sm:p-8 flex flex-col justify-start bg-zinc-900/80 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl relative overflow-hidden"
    >
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-[60px] pointer-events-none rounded-full" />
        
        <div className="relative z-10">
              <div className="mb-6 sm:mb-8 text-center flex flex-col items-center">
                <img src={shopLogoUrl || "https://img2.pic.in.th/1000111145.png"} alt="Logo" className="w-16 h-16 sm:w-20 sm:h-20 mb-4 object-contain rounded-2xl shadow-lg border border-white/5 bg-black/20 p-2" />
                <h2 className="text-xl sm:text-2xl font-black text-white mb-1.5 tracking-tight">
                  {authMode === "login" ? "เข้าสู่ระบบ" : authMode === "forgot" ? "ส่วนลืมรหัสผ่าน" : authMode === "forgot_verify_otp" ? "เปลี่ยนรหัสผ่าน" : "สมัครสมาชิก"}
                </h2>
                <p className="text-zinc-400 font-sans text-xs sm:text-sm font-medium">
                  {authMode === "login" ? "ยินดีต้อนรับกลับสู่ร้านค้าของเรา" : authMode === "forgot" ? "กู้คืนบัญชีของคุณ" : authMode === "forgot_verify_otp" ? "ตั้งรหัสผ่านใหม่เพื่อเข้าใช้งาน" : "สร้างบัญชีใหม่เพื่อรับสิทธิพิเศษ"}
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-3 sm:space-y-4 font-sans">
                {authMode === "register" && (
                  <div>
                    <label className="text-xs sm:text-sm font-bold text-zinc-300 block mb-1.5">
                      ชื่อผู้ใช้ / Username <span className="text-red-500">*จำเป็น</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Username (a-z, 0-9) อย่างน้อย 4 ตัว"
                      value={authUsername}
                      onChange={(e) => setAuthUsername(e.target.value)}
                      required
                      className="w-full bg-zinc-950/50 border border-white/10 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-xs sm:text-sm placeholder-zinc-500"
                    />
                  </div>
                )}

                {(authMode === "register" || authMode === "forgot") && (
                  <div>
                    <label className="text-xs sm:text-sm font-bold text-zinc-300 block mb-1.5">
                      อีเมล / Email <span className="text-red-500">*จำเป็น</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Email สำหรับรับรหัส OTP"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      required
                      disabled={authMode === "forgot_verify_otp"}
                      className={"w-full bg-zinc-950/50 border border-white/10 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-xs sm:text-sm placeholder-zinc-500 " + (authMode === "forgot_verify_otp" ? "opacity-50 cursor-not-allowed" : "")}
                    />
                  </div>
                )}

                {authMode === "forgot_verify_otp" && (
                  <div>
                    <label className="text-xs sm:text-sm font-bold text-amber-500 block mb-1.5">
                      รหัส OTP (ส่งไปที่อีเมลแล้ว) <span className="text-red-500">*จำเป็น</span>
                    </label>
                    <input
                      type="text"
                      placeholder="กรอกรหัส 6 หลัก"
                      value={authOtpCode}
                      onChange={(e) => setAuthOtpCode(e.target.value)}
                      required
                      maxLength={6}
                      className="w-full bg-zinc-950/50 border border-white/10 text-amber-400 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all text-xs sm:text-sm placeholder-zinc-600 text-center tracking-[0.5em] font-bold"
                    />
                  </div>
                )}

                {(authMode === "login" || authMode === "register" || authMode === "forgot_verify_otp") && (
                  <div>
                    <label className="text-xs sm:text-sm font-bold text-zinc-300 block mb-1.5 mt-2">
                      รหัสผ่าน / Password <span className="text-red-500">*จำเป็น</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showAuthPassword ? "text" : "password"}
                        placeholder={authMode === "forgot_verify_otp" ? "รหัสผ่านใหม่" : "Password"}
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        required
                        className="w-full bg-zinc-950/50 border border-white/10 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-xs sm:text-sm placeholder-zinc-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAuthPassword(!showAuthPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                      >
                        {showAuthPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {(authMode === "register" || authMode === "forgot_verify_otp") && (
                  <div>
                    <label className="text-xs sm:text-sm font-bold text-zinc-300 block mb-1.5 mt-2">
                      ยืนยันรหัสผ่าน / Confirm Password <span className="text-red-500">*จำเป็น</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showAuthConfirmPassword ? "text" : "password"}
                        placeholder={authMode === "forgot_verify_otp" ? "ยืนยันรหัสผ่านใหม่" : "Confirm Password"}
                        value={authConfirmPassword}
                        onChange={(e) => setAuthConfirmPassword(e.target.value)}
                        required
                        className="w-full bg-zinc-950/50 border border-white/10 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-xs sm:text-sm placeholder-zinc-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAuthConfirmPassword(!showAuthConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                      >
                        {showAuthConfirmPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {authMode === "login" && (
                  <div className="flex items-center gap-2 mt-4 ml-1">
                    <input
                      type="checkbox"
                      id="rememberAuth"
                      checked={!!rememberAuth}
                      onChange={(e) => setRememberAuth?.(e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 border accent-indigo-500 cursor-pointer"
                    />
                    <label htmlFor="rememberAuth" className="text-xs sm:text-sm font-medium text-zinc-400 cursor-pointer select-none hover:text-zinc-300 transition-colors">
                      จดจำการเข้าสู่ระบบ
                    </label>
                  </div>
                )}

                <div className="flex justify-center my-5">
                  {import.meta.env.VITE_TURNSTILE_SITE_KEY && import.meta.env.VITE_TURNSTILE_SITE_KEY !== "1x00000000000000000000AA" && (
                    <Turnstile 
                      siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                      onSuccess={() => setIsCaptchaVerified(true)}
                      options={{ theme: 'dark' }}
                    />
                  )}
                </div>

                {authError && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs sm:text-sm text-red-400 text-center bg-red-500/10 p-3 rounded-xl border border-red-500/20"
                  >
                    {authError}
                  </motion.div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3 sm:py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed active:bg-indigo-700 text-white font-bold cursor-pointer transition-all shadow-lg shadow-indigo-500/25 text-sm flex justify-center items-center gap-2"
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
                       className="w-full py-3 sm:py-3.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] active:bg-[#3c45a5] text-white font-bold transition-all shadow-lg shadow-[#5865F2]/20 text-sm flex justify-center items-center gap-2 cursor-pointer inline-flex"
                     >
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                         <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                       </svg>
                       {authMode === "login" ? "เข้าสู่ระบบด้วย Discord" : "สมัครสมาชิกด้วย Discord"}
                     </button>
                  </div>
                )}

                {authMode === "login" && (
                  <div className="text-center mt-6">
                    <span className="text-xs text-zinc-400 mr-2">ยังไม่มีบัญชี?</span>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("register");
                        setAuthError("");
                      }}
                      className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline font-bold transition-colors cursor-pointer"
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
                  <div className="text-center mt-6">
                    <span className="text-xs text-zinc-400 mr-2">มีบัญชีแล้ว?</span>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("login");
                        setAuthError("");
                      }}
                      className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline font-bold transition-colors cursor-pointer"
                    >
                       เข้าสู่ระบบ
                    </button>
                  </div>
                )}
                
                {(authMode === "forgot" || authMode === "forgot_verify_otp") && (
                   <div className="text-center pt-4">
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
        </div>
    </motion.div>
  );
};
