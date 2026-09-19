import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  Copy,
  Check,
  AlertTriangle,
  Globe,
  Share2,
  Smartphone,
  ChevronRight,
  X,
  Compass,
} from "lucide-react";
import { useScrollLock } from "../useScrollLock";

interface DetectedAppInfo {
  isInApp: boolean;
  appName: string;
  isIOS: boolean;
  isAndroid: boolean;
}

function detectInAppBrowser(): DetectedAppInfo {
  if (typeof window === "undefined" || !navigator) {
    return { isInApp: false, appName: "", isIOS: false, isAndroid: false };
  }

  const ua = navigator.userAgent || navigator.vendor || (window as any).opera || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);

  // Check URL param for developer/admin testing
  const urlParams = new URLSearchParams(window.location.search);
  const forceTest =
    urlParams.get("inapp") === "1" ||
    urlParams.get("test_inapp") === "true" ||
    urlParams.get("inapp_test") === "1";

  if (forceTest) {
    return {
      isInApp: true,
      appName: "In-App Browser (โหมดทดสอบ)",
      isIOS,
      isAndroid,
    };
  }

  let appName = "";

  // 1. Facebook App
  if (/FBAN|FBAV|FB_IAB|FB4A|FBIOS/i.test(ua)) {
    appName = "Facebook";
  }
  // 2. Messenger
  else if (/Messenger/i.test(ua)) {
    appName = "Messenger";
  }
  // 3. Instagram
  else if (/Instagram/i.test(ua)) {
    appName = "Instagram";
  }
  // 4. LINE
  else if (/Line\//i.test(ua)) {
    appName = "LINE";
  }
  // 5. TikTok
  else if (/musical_ly|ByteLocale|TikTok/i.test(ua)) {
    appName = "TikTok";
  }
  // 6. Twitter / X
  else if (/Twitter/i.test(ua)) {
    appName = "Twitter / X";
  }
  // 7. Threads
  else if (/Barcelona/i.test(ua)) {
    appName = "Threads";
  }
  // 8. WeChat
  else if (/MicroMessenger/i.test(ua)) {
    appName = "WeChat";
  }
  // 9. Generic Android WebView
  else if (isAndroid && /; wv\)/i.test(ua)) {
    appName = "In-App Browser (WebView)";
  }
  // 10. Generic iOS In-App (Missing Safari token or standalone webview)
  else if (
    isIOS &&
    !/Safari/i.test(ua) &&
    /Mobile\/\w+/i.test(ua) &&
    !/CriOS|FxiOS|Brave|EdgiOS/i.test(ua)
  ) {
    appName = "In-App Browser (iOS)";
  }

  return {
    isInApp: Boolean(appName),
    appName: appName || "In-App Browser",
    isIOS,
    isAndroid,
  };
}

export const InAppBrowserNotice: React.FC = () => {
  const [appInfo, setAppInfo] = useState<DetectedAppInfo>({
    isInApp: false,
    appName: "",
    isIOS: false,
    isAndroid: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  // Lock scrolling when modal is opened
  useScrollLock(isOpen);

  useEffect(() => {
    const detected = detectInAppBrowser();
    setAppInfo(detected);

    if (detected.isInApp) {
      // Check if user already dismissed modal during this session
      const dismissed = sessionStorage.getItem("KUWASHII_INAPP_DISMISSED");
      if (!dismissed) {
        setIsOpen(true);
      }
      setIsBannerVisible(true);
    }
  }, []);

  if (!appInfo.isInApp) {
    return null;
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = currentUrl;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleDismissModal = () => {
    setIsOpen(false);
    sessionStorage.setItem("KUWASHII_INAPP_DISMISSED", "true");
  };

  const handleOpenExternal = () => {
    if (appInfo.isAndroid) {
      // Direct Chrome Intent for Android
      const cleanUrl = currentUrl.replace(/^https?:\/\//i, "");
      const chromeIntent = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
      window.location.href = chromeIntent;
    } else {
      // For iOS, prompt copy and display prompt
      handleCopyLink();
    }
  };

  return (
    <>
      {/* Top Warning Banner (Always visible in in-app browsers unless dismissed) */}
      <AnimatePresence>
        {isBannerVisible && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="sticky top-0 z-[100] w-full bg-gradient-to-r from-amber-950/90 via-orange-900/90 to-red-950/90 border-b border-amber-500/30 text-amber-200 text-xs sm:text-sm px-3 sm:px-4 py-2 flex items-center justify-between shadow-lg backdrop-blur-md"
          >
            <div className="flex items-center gap-2 overflow-hidden mr-2">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">
                กำลังเปิดใน <b>{appInfo.appName}</b> เพื่อไม่ให้เกิดบั๊ก
                แนะนำเปิดด้วย <b>Chrome / Safari / Brave</b>
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>ดูวิธีเปิด</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsBannerVisible(false)}
                className="p-1 text-amber-300/70 hover:text-amber-200 transition-colors"
                title="ปิดแถบแจ้งเตือน"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Guidance Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleDismissModal}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-lg bg-[#0d0d12] border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-amber-500/10 text-white z-10 my-auto overflow-hidden"
            >
              {/* Background ambient glow */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                onClick={handleDismissModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/30 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-inner">
                  <AlertTriangle className="w-6 h-6 text-amber-400 animate-pulse" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold mb-1">
                    ตรวจพบการเปิดผ่าน {appInfo.appName}
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    แนะนำเปิดด้วยเบราว์เซอร์หลัก
                  </h2>
                </div>
              </div>

              {/* Reason Description */}
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                <p className="font-medium text-amber-200/90 mb-1 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
                  เพื่อป้องกันข้อผิดพลาดและบั๊กต่างๆ:
                </p>
                <p className="text-zinc-400 text-xs">
                  การเปิดหน้าเว็บภายในแอป <b>Facebook, Messenger, IG, LINE</b>{" "}
                  มักทำให้เกิดข้อผิดพลาดในการโหลดรูปภาพ, เสียง, การล็อกอิน, การสแกน QR Code
                  หรือการเติมเงิน แนะนำให้สลับไปเปิดในเบราว์เซอร์หลักด้านล่างนี้
                </p>
              </div>

              {/* Recommended Browsers Badges */}
              <div className="mb-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-sky-400" />
                  เบราว์เซอร์หลักที่แนะนำให้เปิด:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-900/90 border border-zinc-800/80 hover:border-sky-500/40 transition-colors">
                    <span className="text-base">🌐</span>
                    <span className="text-xs font-semibold text-zinc-200">Chrome</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-900/90 border border-zinc-800/80 hover:border-sky-500/40 transition-colors">
                    <span className="text-base">🧭</span>
                    <span className="text-xs font-semibold text-zinc-200">Safari</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-900/90 border border-zinc-800/80 hover:border-sky-500/40 transition-colors">
                    <span className="text-base">🦁</span>
                    <span className="text-xs font-semibold text-zinc-200">Brave</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-900/90 border border-zinc-800/80 hover:border-sky-500/40 transition-colors">
                    <span className="text-base">🦊</span>
                    <span className="text-xs font-semibold text-zinc-200">Firefox</span>
                  </div>
                </div>
              </div>

              {/* How to open instructions */}
              <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-zinc-300 mb-5 space-y-2">
                <div className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-400" />
                  วิธีเปิดในเบราว์เซอร์ภายนอกแบบง่ายๆ:
                </div>
                {appInfo.isIOS ? (
                  <ol className="list-decimal list-inside space-y-1 text-zinc-300 pl-1 leading-relaxed">
                    <li>
                      แตะที่ไอคอนจุด 3 จุด <b>(···)</b> หรือไอคอนแชร์ <b>(Share)</b> ที่มุมขวาบน หรือมุมล่างหน้าจอ
                    </li>
                    <li>
                      เลือกเมนู <b>"เปิดในเบราว์เซอร์ภายนอก"</b> หรือ <b>"Open in Safari"</b>
                    </li>
                  </ol>
                ) : (
                  <ol className="list-decimal list-inside space-y-1 text-zinc-300 pl-1 leading-relaxed">
                    <li>
                      แตะที่ไอคอนจุด 3 จุด <b>(⋮)</b> บริเวณมุมขวาบนของหน้าจอ
                    </li>
                    <li>
                      เลือกเมนู <b>"เปิดในเบราว์เซอร์ภายนอก"</b> หรือ <b>"Open in Chrome"</b>
                    </li>
                  </ol>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {appInfo.isAndroid && (
                  <button
                    type="button"
                    onClick={handleOpenExternal}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>เปิดด้วย Google Chrome ทันที</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-zinc-700 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">
                        คัดลอกลิงก์สำเร็จแล้ว! นำไปวางใน Chrome / Safari ได้เลย
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-zinc-400" />
                      <span>คัดลอกลิงก์เว็บไซต์นี้</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDismissModal}
                  className="w-full py-2 text-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors pt-1 cursor-pointer"
                >
                  ดำเนินการต่อในแอปนี้ (อาจมีฟังก์ชันบางส่วนทำงานไม่สมบูรณ์)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
