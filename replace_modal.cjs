const fs = require('fs');
let content = fs.readFileSync('src/components/AdminModal.tsx', 'utf8');

// Wrapper and form start
content = content.replace(
  /className="relative max-w-sm w-full rounded-2xl border border-white\/5 bg-transparent p-4 sm:p-5 overflow-hidden shadow-2xl z-10 max-h-\[90dvh\] overflow-y-auto mx-auto"[\s\S]*?<form onSubmit={handleSubmit} className="space-y-4">/m,
`className="relative max-w-lg w-full rounded-3xl border border-white/10 bg-[#09090b] shadow-2xl z-10 max-h-[90dvh] flex flex-col mx-auto overflow-hidden">
          {/* Accent strip */}
          <div className="h-1 w-full bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 shrink-0" />
          
          <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
              {/* Header */}
              <div className="flex items-center justify-between mb-5 mt-2">
                <div>
                  <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-sky-400" />
                    <span>{editingItem ? 'แก้ไขสต๊อกสินค้า' : 'เพิ่มไอเทมใหม่ในระบบ'}</span>
                  </h3>
                  <p className="text-xs text-zinc-400 font-display tracking-tight mt-0.5">
                    กรอกรายละเอียดไอเทมเพื่อเพิ่มลงในร้านค้า
                  </p>
                </div>
                <motion.button whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={onClose}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>`
);

// Form end and footer
content = content.replace(
  /            \{\/\* Submit and Cancel items \*\/\}[\s\S]*?<\/form>/m,
`            </div>
            {/* Submit and Cancel items */}
            <div className="flex gap-2.5 bg-[#09090b] border-t border-white/5 p-4 sm:p-6 shrink-0 mt-auto">
              <motion.button whileTap={{ scale: 0.95 }}
                type="button"
                onClick={onClose}
                className="w-1/2 py-2.5 px-4 rounded-2xl border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-900 bg-transparent text-xs font-bold transition-all cursor-pointer"
              >
                ยกเลิก
              </motion.button>
              <motion.button whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-1/2 py-2.5 px-4 rounded-2xl bg-zinc-100 hover:bg-white text-zinc-900 border-white text-xs font-bold shadow-lg flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] transition-all"
                id="btn-submit-stock"
              >
                <Save className="w-3.5 h-3.5" />
                <span>บันทึกข้อมูลสต๊อก</span>
              </motion.button>
            </div>
          </form>`
);

// Switch Amber/Red to Sky/Blue
content = content.replace(/amber-500/g, 'sky-500');
content = content.replace(/amber-600/g, 'sky-600');
content = content.replace(/amber-400/g, 'sky-400');
content = content.replace(/amber-300/g, 'sky-300');
content = content.replace(/text-amber-500/g, 'text-sky-500');

// Replace the inputs grid
content = content.replace(
  'className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"',
  'className="grid grid-cols-2 sm:grid-cols-3 gap-3"'
);

fs.writeFileSync('src/components/AdminModal.tsx', content);
console.log("Replaced");
