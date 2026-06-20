import * as fs from 'fs';

const filePath = 'src/App.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `<div className="max-w-7xl mx-auto mb-8 w-full flex flex-col gap-4 mt-4">
                     <div className="flex items-center gap-2 text-sm font-bold text-zinc-400 mb-2">
                       <button onClick={() => setSelectedCategory("all")} className="hover:text-[#0ea5e9] transition-colors cursor-pointer text-[#0ea5e9]">รายการหมวดหมู่</button>
                       <span className="text-zinc-600">&gt;</span>
                       <span className="text-white uppercase">{selectedCategory}</span>
                     </div>
                     
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
                       <div className="flex flex-row justify-between w-full md:w-auto items-start">
                         <h2 className="text-4xl md:text-5xl font-black text-[#0ea5e9] tracking-tighter uppercase whitespace-pre-wrap leading-tight font-display">
                           {selectedCategory.replace(/ /g, '\\n')}
                         </h2>
                         {/* Recommend Badge (Mock) */}
                         <div className="md:hidden flex items-center justify-center gap-1.5 bg-[#002f5d] border border-[#0ea5e9]/30 rounded-full px-4 py-1.5 mt-2 shadow-lg shadow-[#0ea5e9]/10">
                            <Star className="w-3.5 h-3.5 fill-[#0ea5e9] text-[#0ea5e9]" />
                            <span className="text-[#0ea5e9] text-xs font-bold">แนะนำ</span>
                         </div>
                       </div>
                       
                       <div className="hidden md:flex items-center justify-center gap-1.5 bg-[#002f5d] border border-[#0ea5e9]/30 rounded-full px-4 py-1.5 shadow-lg shadow-[#0ea5e9]/10 mb-2">
                            <Star className="w-3.5 h-3.5 fill-[#0ea5e9] text-[#0ea5e9]" />
                            <span className="text-[#0ea5e9] text-xs font-bold">แนะนำ</span>
                       </div>
                     </div>

                     <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mt-6">
                        <h3 className="text-xl md:text-2xl font-bold text-[#0ea5e9]">
                          สินค้าในหมวดหมู่นี้
                        </h3>
                        <div className="text-zinc-300 font-bold text-sm md:text-base">
                          ทั้งหมด {items.filter(i => (i.category || "") === selectedCategory).length} สินค้า
                        </div>
                     </div>
                  </div>`;

const replaceStr = `<div className="max-w-7xl mx-auto mb-6 w-full flex flex-col gap-2 mt-2">
                     <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 mb-1">
                       <button onClick={() => setSelectedCategory("all")} className="hover:text-[#0ea5e9] transition-colors cursor-pointer text-[#0ea5e9]">รายการหมวดหมู่</button>
                       <span className="text-zinc-600">&gt;</span>
                       <span className="text-white uppercase">{selectedCategory}</span>
                     </div>
                     
                     <div className="flex flex-row justify-between items-center gap-3">
                         <h2 className="text-2xl md:text-3xl font-black text-[#0ea5e9] tracking-tight uppercase leading-tight font-display line-clamp-1">
                           {selectedCategory}
                         </h2>
                         <div className="flex items-center justify-center gap-1 bg-[#002f5d] border border-[#0ea5e9]/30 rounded-full px-2.5 py-1 shadow-md shadow-[#0ea5e9]/10 whitespace-nowrap shrink-0">
                            <Star className="w-3 h-3 fill-[#0ea5e9] text-[#0ea5e9]" />
                            <span className="text-[#0ea5e9] text-[10px] font-bold">แนะนำ</span>
                         </div>
                     </div>

                     <div className="flex items-center justify-between pt-1 mt-1">
                        <h3 className="text-sm font-bold text-[#0ea5e9]">
                          สินค้าในหมวดหมู่นี้
                        </h3>
                        <div className="text-zinc-300 font-bold text-xs">
                          ทั้งหมด {items.filter(i => (i.category || "") === selectedCategory).length} สินค้า
                        </div>
                     </div>
                  </div>`;

if(content.includes(targetStr)) {
   content = content.replace(targetStr, replaceStr);
   fs.writeFileSync(filePath, content);
   console.log("Header replaced");
} else {
   console.log("Header target not found");
}
