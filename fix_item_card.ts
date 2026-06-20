import * as fs from 'fs';

const filePath = 'src/components/ItemCard.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const topImports = "import { Edit2, Trash2, ShieldAlert, BadgeInfo, Coins, Package, Clock, ShoppingBag, Pin, Flame, Sparkles } from 'lucide-react';";
const targetImports = "import { Edit2, Trash2, ShieldAlert, BadgeInfo, Coins, Package, Clock, ShoppingBag, Pin, Flame, Sparkles, Eye, X, Star } from 'lucide-react';";

content = content.replace(topImports, targetImports);

// We want to completely replace the returned JSX. 
// Let's find return ( <motion.div ... ); match it to the end of the file.
const returnStart = content.indexOf('return (');
if (returnStart > -1) {
  content = content.slice(0, returnStart);
}

const renderJSX = `return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className="group relative flex flex-col justify-between overflow-hidden bg-black transition-all duration-300"
      id={\`item-card-\${item.id}\`}
    >
      {/* Item Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-zinc-900 flex items-center justify-center group/carousel cursor-pointer" onClick={(e) => { e.stopPropagation(); if(onBuy && item.quantity > 0) onInquire(item); }}>
        {(item.imageUrls && item.imageUrls.length > 0) || item.imageUrl ? (
          <>
            <img
              src={item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[currentImageIndex] : item.imageUrl!}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '';
              }}
            />
            {item.imageUrls && item.imageUrls.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev === 0 ? item.imageUrls!.length - 1 : prev - 1); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity"
                >
                  &lsaquo;
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev === item.imageUrls!.length - 1 ? 0 : prev + 1); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity"
                >
                  &rsaquo;
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {item.imageUrls.map((_, i) => (
                    <div key={i} className={\`w-2 h-2 rounded-full \${i === currentImageIndex ? 'bg-white' : 'bg-white/50'}\`} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-zinc-900 flex flex-col items-center justify-center p-3">
            <Package className="w-10 h-10 text-zinc-700 mb-2" />
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex gap-2">
            {item.isPinned && (
              <div className="bg-black/90 text-white font-bold px-3 py-1.5 rounded-[20px] flex items-center gap-2 shadow-lg">
                <Star className="w-5 h-5 fill-white text-white" />
                <span className="text-[15px] font-sans">แนะนำ</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-2 items-end">
            {/* Discount Badge Mock */}
            <div className="bg-[#ff203a] text-white font-black px-3 py-1.5 rounded-[20px] shadow-lg flex items-center justify-center">
               <span className="text-[17px] tracking-tight">-4%</span>
            </div>
          </div>
        </div>

        {/* Absolute Overlay if Out of Stock */}
        {item.quantity === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <div className="w-20 h-20 bg-[#ff203a] rounded-full flex items-center justify-center shadow-2xl">
              <X className="w-10 h-10 text-white stroke-[4]" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col bg-black">
        {/* Title */}
        <h3 className="font-display text-[22px] md:text-[24px] font-black text-[#0ea5e9] tracking-tighter uppercase leading-tight mb-4 truncate w-full shadow-[#0ea5e9]/10 drop-shadow-md">
          {item.name}
        </h3>

        {/* Description Snippet */}
        <p className="text-sm text-zinc-200 font-sans truncate mb-5 flex items-center gap-2">
          <span className="text-[#ff203a] rotate-[30deg] scale-125 inline-block">📌</span> รายละเอียดสินค้า • {item.description || "ไม่มีคำอธิบายเพิ่มเติม"}
        </p>

        {/* Price */}
        <div className="flex items-center gap-3 mb-5">
           <span className="text-[#ff203a] font-black text-[28px] tracking-tight drop-shadow-md">฿{item.price.toLocaleString()}</span>
           <span className="text-zinc-500 font-bold text-[20px] line-through">฿{Math.floor(item.price * 1.04).toLocaleString()}</span>
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2.5 text-white font-bold text-lg border-b border-zinc-800/80 pb-5 mb-5">
           <Package className="w-6 h-6 text-white" />
           <span className="text-[18px]">คงเหลือ: {item.quantity}</span>
        </div>

        {/* Action Button */}
        {isAdmin ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-2">สต๊อก</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onQuickQuantityChange(item.id, -1)}
                  disabled={item.quantity <= 0}
                  className="w-8 h-8 flex items-center justify-center rounded bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 disabled:opacity-40 font-bold text-lg transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-sm text-white">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onQuickQuantityChange(item.id, 1)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 font-bold text-lg transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="py-2.5 rounded-xl border border-zinc-700 bg-zinc-800 text-white font-bold transition-all flex items-center justify-center gap-2 cursor-pointer hover:bg-zinc-700 hover:border-zinc-500"
              >
                <Edit2 className="w-4 h-4" />
                <span>แก้ไข</span>
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="py-2.5 rounded-xl border border-red-900/50 bg-red-950/30 text-red-500 font-bold transition-all flex items-center justify-center gap-2 cursor-pointer hover:bg-red-950/50 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
                <span>ลบ</span>
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onInquire(item)}
            disabled={item.quantity === 0}
            className={\`w-full py-3.5 rounded-xl font-bold text-[18px] transition-all flex items-center justify-center gap-2 border shadow-lg \${
              item.quantity === 0
                ? 'bg-zinc-800 border-zinc-700 text-zinc-500 shadow-none cursor-not-allowed'
                : 'bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 text-white border-[#0ea5e9] shadow-[#0ea5e9]/20 cursor-pointer active:scale-[0.98]'
            }\`}
          >
            <Eye className="w-6 h-6 stroke-[2.5]" />
            <span>ดูสินค้า</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};
`;

content += renderJSX;

fs.writeFileSync(filePath, content);
console.log("Replaced ItemCard successfully.");
