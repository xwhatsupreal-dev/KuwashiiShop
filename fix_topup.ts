import * as fs from 'fs';

let content = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

content = content.replace(
  '<div className="w-full max-w-lg mx-auto py-12 flex flex-col justify-start">',
  '<div className="w-full max-w-[400px] sm:max-w-md mx-auto py-8 flex flex-col justify-start">'
);

content = content.replace(
  '<div className="mb-8 mt-4 text-center text-white">',
  '<div className="mb-6 mt-2 text-center text-white">'
);

content = content.replace(
  '<h2 className="text-4xl font-bold mb-4 font-display">ช่องทางการชำระเงิน</h2>',
  '<h2 className="text-2xl sm:text-3xl font-bold mb-2 font-display">ช่องทางการชำระเงิน</h2>'
);

content = content.replace(
  '<p className="text-zinc-400 text-base font-sans">เลือกช่องทางที่ต้องการเพื่อเติมเงินเข้าบัญชีของคุณ</p>',
  '<p className="text-zinc-400 text-xs sm:text-sm font-sans">เลือกช่องทางที่ต้องการเพื่อเติมเงินเข้าบัญชีของคุณ</p>'
);

content = content.replace(
  '<div className="bg-[#151515] border border-zinc-800 rounded-3xl p-8 shadow-xl mb-6 text-white text-center">',
  '<div className="bg-[#151515] border border-zinc-800 rounded-2xl p-6 shadow-xl mb-4 text-white text-center">'
);

content = content.replace(
  '<div className="w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">',
  '<div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">'
);
content = content.replace('<AlertTriangle className="w-10 h-10" />', '<AlertTriangle className="w-8 h-8" />');

content = content.replace(
  '<h3 className="text-2xl font-bold mb-4 font-display">ข้อตกลงและเงื่อนไข</h3>',
  '<h3 className="text-xl font-bold mb-3 font-display">ข้อตกลงและเงื่อนไข</h3>'
);

content = content.replace(
  '<div className="bg-black/50 border border-zinc-800 rounded-2xl p-5 text-sm text-zinc-400 mb-8 text-left max-h-48 overflow-y-auto space-y-3 font-sans">',
  '<div className="bg-black/50 border border-zinc-800 rounded-xl p-4 text-xs sm:text-sm text-zinc-400 mb-6 text-left max-h-40 overflow-y-auto space-y-2 font-sans">'
);

content = content.replace(
  'className="w-full bg-[#008ff7] hover:bg-blue-600 text-white font-bold py-5 rounded-2xl text-lg flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 transition-all font-display"',
  'className="w-full bg-[#008ff7] hover:bg-blue-600 text-white font-bold py-3.5 sm:py-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all font-display"'
);
content = content.replace('<CheckCircle className="w-6 h-6" /> ยอมรับเงื่อนไข', '<CheckCircle className="w-5 h-5" /> ยอมรับเงื่อนไข');


content = content.replace(
  '<div className="space-y-6">',
  '<div className="space-y-4">'
);

content = content.replace(
  '<div className="bg-[#151515] border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group hover:border-[#0ea5e9] transition-colors">',
  '<div className="bg-[#151515] border border-zinc-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-[#0ea5e9] transition-colors">'
);

content = content.replace(
  '<div className="flex items-center justify-between mb-4">',
  '<div className="flex items-center justify-between mb-3">'
);

content = content.replace(
  '<div className="flex items-center gap-4">',
  '<div className="flex items-center gap-3">'
);

content = content.replace(
  '<div className="w-14 h-14 bg-gradient-to-br from-[#ff6b7e] to-[#ff203a] rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">',
  '<div className="w-12 h-12 bg-gradient-to-br from-[#ff6b7e] to-[#ff203a] rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">'
);
content = content.replace('<Wallet className="w-7 h-7 text-white" />', '<Wallet className="w-6 h-6 text-white" />');


content = content.replace(
  '<h4 className="font-bold text-white text-xl font-display">ซองอั่งเปา (Angpao)</h4>',
  '<h4 className="font-bold text-white text-[15px] sm:text-base font-display">ซองอั่งเปา (Angpao)</h4>'
);

content = content.replace(
  '<span className="text-xs bg-[#ff203a]/20 text-[#ff6b7e] px-2 py-0.5 rounded font-bold uppercase tracking-wider font-sans">No Fee</span>',
  '<span className="text-[9px] sm:text-[10px] bg-[#ff203a]/20 text-[#ff6b7e] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider font-sans">No Fee</span>'
);

content = content.replace(
  '<button onClick={() => setTopupModalStep("angpao")} className="bg-[#151515] border border-zinc-700 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors">',
  '<button onClick={() => setTopupModalStep("angpao")} className="bg-[#151515] border border-zinc-700 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors">'
);
content = content.replace('<ArrowRight className="w-6 h-6" />', '<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />');

content = content.replace(
  '<p className="text-[16px] text-zinc-300 mt-3 mb-2 font-medium leading-relaxed font-sans">True Money Wallet • ใช้ลิงค์ซองอั่งเปาเพื่อเติมเงิน</p>',
  '<p className="text-xs sm:text-sm text-zinc-300 mt-2 mb-2 font-medium leading-relaxed font-sans">True Money Wallet • ใช้ลิงค์ซองอั่งเปาเพื่อเติมเงิน</p>'
);

content = content.replace(
  '<div className="flex items-center gap-2 text-zinc-500 text-[14px] font-sans">',
  '<div className="flex items-center gap-1.5 text-zinc-500 text-[11px] sm:text-xs font-sans">'
);
content = content.replace('<CheckCircle className="w-4 h-4 text-[#ff203a]" /> เติมขั้นต่ำ 10 บาท', '<CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#ff203a]" /> เติมขั้นต่ำ 10 บาท');

// QR code block
content = content.replace(
  '<div className="bg-[#151515] border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group hover:border-[#0ea5e9] transition-colors cursor-pointer" onClick={() => setTopupModalStep("bank")}>',
  '<div className="bg-[#151515] border border-zinc-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-[#0ea5e9] transition-colors cursor-pointer" onClick={() => setTopupModalStep("bank")}>'
);
content = content.replace(
  '<div className="flex items-center justify-between mb-4">',
  '<div className="flex items-center justify-between mb-3">'
);
content = content.replace(
  '<div className="flex items-center justify-start gap-4">',
  '<div className="flex items-center justify-start gap-3">'
);
content = content.replace(
  '<div className="w-14 h-14 bg-gradient-to-br from-[#00b09b] to-[#96c93d] rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">',
  '<div className="w-12 h-12 bg-gradient-to-br from-[#00b09b] to-[#96c93d] rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">'
);
content = content.replace('<ScanLine className="w-7 h-7 text-white" />', '<ScanLine className="w-6 h-6 text-white" />');
content = content.replace('<h4 className="font-bold text-white text-xl font-display">สแกนชำระเงิน (QR)</h4>', '<h4 className="font-bold text-white text-[15px] sm:text-base font-display">สแกนชำระเงิน (QR)</h4>');
content = content.replace('<span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider font-sans">Auto 3 Sec</span>', '<span className="text-[9px] sm:text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider font-sans">Auto 3 Sec</span>');
content = content.replace('<div className="text-zinc-500 font-normal text-sm ml-18 mt-1 font-sans">คลิกเพื่อเริ่มเติมเงิน</div>', '<div className="text-zinc-500 font-normal text-[11px] sm:text-xs ml-16 mt-0.5 font-sans">คลิกเพื่อเริ่มเติมเงิน</div>');

content = content.replace(
  '<div className="bg-[#151515] border border-zinc-700 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors shrink-0">',
  '<div className="bg-[#151515] border border-zinc-700 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors shrink-0">'
);
content = content.replace('<QrCode className="w-6 h-6" />', '<QrCode className="w-4 h-4 sm:w-5 sm:h-5" />');

content = content.replace(
  '<p className="text-[16px] text-zinc-300 mt-3 mb-2 font-medium leading-relaxed font-sans">ธนาคารทุกสาขา / PromtPay • แนบสลิปเพื่อยืนยัน</p>',
  '<p className="text-xs sm:text-sm text-zinc-300 mt-2 mb-2 font-medium leading-relaxed font-sans">ธนาคารทุกสาขา / PromtPay • แนบสลิปเพื่อยืนยัน</p>'
);
content = content.replace(
  '<div className="flex items-center gap-2 text-zinc-500 text-[14px] font-sans">',
  '<div className="flex items-center gap-1.5 text-zinc-500 text-[11px] sm:text-xs font-sans">'
);
content = content.replace('<CheckCircle className="w-4 h-4 text-emerald-400" /> อนุมัติอัตโนมัติ ไม่ต้องแจ้งสลิปแอดมิน', '<CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" /> อนุมัติอัตโนมัติ ไม่ต้องแจ้งสลิปแอดมิน');


content = content.replace(
  '<button onClick={() => setShowTopupTos(true)} className="w-full flex items-center justify-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm py-4">',
  '<button onClick={() => setShowTopupTos(true)} className="w-full flex items-center justify-center gap-1.5 text-zinc-500 hover:text-white transition-colors text-xs py-3">'
);
content = content.replace('<HelpCircle className="w-4 h-4" /> ดูข้อตกลงและเงื่อนไขการเติมเงิน', '<HelpCircle className="w-3.5 h-3.5" /> ดูข้อตกลงและเงื่อนไขการเติมเงิน');


// Step 2 page
content = content.replace(
  '<div className="bg-[#151515] border border-zinc-800 rounded-3xl p-8 text-white w-full mx-auto">',
  '<div className="bg-[#151515] border border-zinc-800 rounded-2xl p-5 sm:p-6 text-white w-full mx-auto">'
);

content = content.replace(
  '<div className="flex items-center gap-4 mb-10 relative">',
  '<div className="flex items-center gap-3 mb-5 sm:mb-6 relative">'
);
content = content.replace(
  '<button\n              onClick={() => setTopupModalStep("select")}\n              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-800/80 text-zinc-300 hover:text-white transition-colors"\n            >',
  '<button\n              onClick={() => setTopupModalStep("select")}\n              className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-300 hover:text-white transition-colors"\n            >'
);
content = content.replace('<ChevronLeft className="w-6 h-6" />', '<ChevronLeft className="w-5 h-5" />');
content = content.replace('<h3 className="font-bold text-3xl font-display">', '<h3 className="font-bold text-xl sm:text-2xl font-display">');


content = content.replace(
  '<div className="mb-8 bg-[#ff203a]/10 border border-[#ff203a]/20 rounded-2xl p-6 text-center font-sans">',
  '<div className="mb-6 bg-[#ff203a]/10 border border-[#ff203a]/20 rounded-xl p-4 text-center font-sans">'
);
content = content.replace('<p className="text-lg text-[#ff6b7e] font-bold mb-2">', '<p className="text-sm sm:text-base text-[#ff6b7e] font-bold mb-1">');
content = content.replace('<p className="text-sm text-zinc-400">', '<p className="text-[11px] sm:text-xs text-zinc-400">');

content = content.replace(
  '<div className="mb-8 border border-zinc-800 rounded-2xl p-6 text-center font-sans bg-zinc-900/50">',
  '<div className="mb-6 border border-zinc-800 rounded-xl p-4 text-center font-sans bg-zinc-900/50">'
);
content = content.replace('<ScanLine className="w-16 h-16 text-emerald-500/80 mx-auto mb-4" />', '<ScanLine className="w-12 h-12 text-emerald-500/80 mx-auto mb-3" />');
content = content.replace('<p className="text-lg text-emerald-400 font-bold mb-2">', '<p className="text-sm sm:text-base text-emerald-400 font-bold mb-1">');


content = content.replace(
  'className="w-full bg-black/50 border border-zinc-800 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] transition-all text-center mb-6 text-xl placeholder-zinc-600"',
  'className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] transition-all text-center mb-5 text-sm sm:text-base placeholder-zinc-600"'
);

content = content.replace(
  '<div className="relative border-2 border-dashed border-zinc-700 bg-black/50 rounded-2xl p-8 text-center hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all mb-6 group cursor-pointer">',
  '<div className="relative border-2 border-dashed border-zinc-700 bg-black/50 rounded-xl p-5 sm:p-6 text-center hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all mb-5 group cursor-pointer">'
);
content = content.replace(
  '<div className="w-16 h-16 bg-zinc-800 group-hover:bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 transition-colors">',
  '<div className="w-12 h-12 sm:w-14 sm:h-14 bg-zinc-800 group-hover:bg-emerald-500/20 rounded-full flex items-center justify-center mb-3 transition-colors">'
);
content = content.replace('<Plus className="w-8 h-8 text-zinc-400 group-hover:text-emerald-400" />', '<Plus className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-400 group-hover:text-emerald-400" />');
content = content.replace('<p className="text-zinc-300 font-bold mb-1">', '<p className="text-zinc-300 font-bold mb-1 text-xs sm:text-sm">');
content = content.replace('<p className="text-zinc-500 text-sm">', '<p className="text-zinc-500 text-[11px] sm:text-xs">');

content = content.replace(
  'className="w-full bg-[#ff203a] hover:bg-[#ff4d63] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 rounded-2xl text-lg flex items-center justify-center gap-3 transition-colors shadow-lg shadow-[#ff203a]/20"',
  'className="w-full bg-[#ff203a] hover:bg-[#ff4d63] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 sm:py-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#ff203a]/20"'
);
content = content.replace('<div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />', '<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />');
content = content.replace('<Send className="w-6 h-6" /> ยืนยันการเติมเงิน', '<Send className="w-5 h-5" /> ยืนยันการเติมเงิน');


fs.writeFileSync('src/components/TopupPage.tsx', content);
