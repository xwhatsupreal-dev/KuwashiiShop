import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { FakeTurnstile } from './FakeTurnstile';

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
  isProcessing
}: any) => {
  const [isCaptchaVerified, setIsCaptchaVerified] = React.useState(false);

  React.useEffect(() => {
    setIsCaptchaVerified(false);
  }, [authMode]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-[300px] sm:max-w-sm mx-auto py-4 sm:py-8 flex flex-col justify-start px-2 sm:px-0"
    >
              <div className="mb-5 sm:mb-8 text-center flex flex-col items-center">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10 mb-3 sm:mb-4">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0ea5e9"/>
                  <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
                      value={authEmail}
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
                      value={authOtpCode}
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
                        value={authPassword}
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
                        value={authConfirmPassword}
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
                      checked={rememberAuth}
                      onChange={(e) => setRememberAuth(e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 border accent-[#0ea5e9] cursor-pointer"
                    />
                    <label htmlFor="rememberAuth" className="text-xs sm:text-sm font-medium text-zinc-300 cursor-pointer select-none">
                      จดจำการเข้าสู่ระบบ
                    </label>
                  </div>
                )}

                <FakeTurnstile key={authMode} onSuccess={() => setIsCaptchaVerified(true)} />

                {authError && (
                  <div className="text-sm text-red-500 text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    {authError}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing || !isCaptchaVerified}
                    className="w-full py-2.5 sm:py-3 rounded-lg bg-[#008ff7] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed active:bg-blue-700 text-white font-bold cursor-pointer transition-all shadow-lg shadow-[#008ff7]/20 text-xs sm:text-sm flex justify-center items-center gap-2"
                  >
                    {isProcessing && <Loader2 className="w-4 h-4 animate-spin"/>}
                    {authMode === "login" ? "เข้าสู่ระบบ" : authMode === "forgot" ? "ส่งรหัสยืนยัน" : authMode === "forgot_verify_otp" ? "เปลี่ยนรหัสผ่าน" : "สมัครสมาชิก"}
                  </button>
                </div>

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

