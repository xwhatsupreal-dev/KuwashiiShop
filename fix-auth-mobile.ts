import * as fs from 'fs';

let content = fs.readFileSync('src/components/AuthPage.tsx', 'utf8');

content = content.replace(
  '<div className="w-full max-w-sm mx-auto py-8 flex flex-col justify-start">',
  '<div className="w-full max-w-[300px] sm:max-w-sm mx-auto py-4 sm:py-8 flex flex-col justify-start px-2 sm:px-0">'
);
content = content.replace(
  '<div className="mb-8 text-center flex flex-col items-center">',
  '<div className="mb-5 sm:mb-8 text-center flex flex-col items-center">'
);
content = content.replace(
  '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">',
  '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10 mb-3 sm:mb-4">'
);
content = content.replace(
  '<h2 className="text-2xl font-bold text-white mb-2">',
  '<h2 className="text-xl sm:text-2xl font-bold text-white mb-1.5 sm:mb-2">'
);
content = content.replace(
  '<p className="text-zinc-400 font-sans text-sm">',
  '<p className="text-zinc-400 font-sans text-xs sm:text-sm">'
);
content = content.replace(
  '<form onSubmit={handleAuthSubmit} className="space-y-4 font-sans">',
  '<form onSubmit={handleAuthSubmit} className="space-y-3 sm:space-y-4 font-sans">'
);
content = content.replace(
  /className="w-full bg-\[#151515\] border border-zinc-800 text-white px-4 py-2\.5 rounded-lg focus:outline-none focus:border-\[#0ea5e9\] transition-all text-sm/g,
  'className="w-full bg-[#151515] border border-zinc-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg focus:outline-none focus:border-[#0ea5e9] transition-all text-xs sm:text-sm'
);
content = content.replace(
  /className=\{"w-full bg-\[#151515\] border border-zinc-800 text-white px-4 py-2\.5 rounded-lg focus:outline-none focus:border-\[#0ea5e9\] transition-all text-sm/g,
  'className={"w-full bg-[#151515] border border-zinc-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg focus:outline-none focus:border-[#0ea5e9] transition-all text-xs sm:text-sm'
);

content = content.replace(
  /<label className="text-sm font-bold text-zinc-300 block mb-1.5">/g,
  '<label className="text-xs sm:text-sm font-bold text-zinc-300 block mb-1 sm:mb-1.5">'
);

content = content.replace(
  '<label className="text-sm font-bold text-[#ff8f00] block mb-1.5">',
  '<label className="text-xs sm:text-sm font-bold text-[#ff8f00] block mb-1 sm:mb-1.5">'
);

content = content.replace(
  /<label className="text-sm font-bold text-zinc-300 block mb-1.5 mt-2">/g,
  '<label className="text-xs sm:text-sm font-bold text-zinc-300 block mb-1 sm:mb-1.5 mt-1.5 sm:mt-2">'
);

content = content.replace(
  '<label htmlFor="rememberAuth" className="text-sm font-medium text-zinc-300 cursor-pointer select-none">',
  '<label htmlFor="rememberAuth" className="text-xs sm:text-sm font-medium text-zinc-300 cursor-pointer select-none">'
);

content = content.replace(
  '<div className="mt-4 border border-zinc-800 p-3 rounded-lg flex flex-row items-center justify-between bg-zinc-900/50">',
  '<div className="mt-3 sm:mt-4 border border-zinc-800 p-2.5 sm:p-3 rounded-lg flex flex-row items-center justify-between bg-zinc-900/50">'
);
content = content.replace(
  '<span className="text-xs text-zinc-400">กำลังตรวจสอบ...</span>',
  '<span className="text-[10px] sm:text-xs text-zinc-400">กำลังตรวจสอบ...</span>'
);

content = content.replace(
  '<div className="text-[9px] text-zinc-500 font-bold tracking-widest mt-1 uppercase text-right leading-tight">',
  '<div className="text-[8px] sm:text-[9px] text-zinc-500 font-bold tracking-widest mt-0.5 sm:mt-1 uppercase text-right leading-tight">'
);

content = content.replace(
  '<button\n                    type="submit"\n                    disabled={isProcessing}\n                    className="w-full py-3 rounded-lg bg-[#008ff7] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed active:bg-blue-700 text-white font-bold cursor-pointer transition-all shadow-lg shadow-[#008ff7]/20 text-sm flex justify-center items-center gap-2"',
  '<button\n                    type="submit"\n                    disabled={isProcessing}\n                    className="w-full py-2.5 sm:py-3 rounded-lg bg-[#008ff7] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed active:bg-blue-700 text-white font-bold cursor-pointer transition-all shadow-lg shadow-[#008ff7]/20 text-xs sm:text-sm flex justify-center items-center gap-2"'
);

fs.writeFileSync('src/components/AuthPage.tsx', content);
