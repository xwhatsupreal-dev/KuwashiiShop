const fs = require('fs');
let content = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

const importRegex = /import React from 'react';/;
content = content.replace(importRegex, "import React, { useState, useEffect } from 'react';");

const setupRegex = /const qrActive = [^\n]*;/;
const timerLogic = `
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  
  useEffect(() => {
    if (topupModalStep === "bank" || topupModalStep === "angpao") {
      setTimeLeft(300);
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setTopupModalStep("select");
            setSlipFile(null);
            window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: "หมดเวลาทำรายการ กรุณาทำรายการใหม่", type: "error" } }));
            return 300;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [topupModalStep, setTopupModalStep, setSlipFile]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m + ":" + (s < 10 ? '0' : '') + s;
  };
`;
content = content.replace(setupRegex, "const qrActive = parsedSettings.topup_qrcode_status !== false;\n" + timerLogic);

const angpaoTextRegex = /<p className="text-zinc-500 text-\[10px\] sm:text-xs mt-3">แตะที่เบอร์เพื่อคัดลอก<\/p>/;
content = content.replace(angpaoTextRegex, 
  '<p className="text-zinc-500 text-[10px] sm:text-xs mt-3">แตะที่เบอร์เพื่อคัดลอก</p>\n' +
  '   <div className="mt-3 inline-block bg-black/40 px-3 py-1.5 rounded-full border border-red-500/20">\n' +
  '     <p className="text-red-400 text-xs sm:text-sm font-bold flex items-center gap-1.5">\n' +
  '       <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>\n' +
  '       หมดเวลาใน {formatTime(timeLeft)} นาที\n' +
  '     </p>\n' +
  '   </div>'
);

const bankTextRegex = /<p className="text-zinc-400 text-xs sm:text-sm">กรุณาโอนเงินตามบัญชีด้านล่างเพื่อเติมเครดิต<\/p>/;
content = content.replace(bankTextRegex, 
  '<p className="text-zinc-400 text-xs sm:text-sm">กรุณาโอนเงินตามบัญชีด้านล่างเพื่อเติมเครดิต</p>\n' +
  '   <div className="mt-3 inline-block bg-black/40 px-3 py-1.5 rounded-full border border-emerald-500/20">\n' +
  '     <p className="text-emerald-400 text-xs sm:text-sm font-bold flex items-center gap-1.5">\n' +
  '       <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>\n' +
  '       หมดเวลาใน {formatTime(timeLeft)} นาที\n' +
  '     </p>\n' +
  '   </div>'
);

fs.writeFileSync('src/components/TopupPage.tsx', content);
