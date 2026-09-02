import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Folders, CheckCircle2, ChevronRight } from 'lucide-react';

export const CategoryCardItem = ({ 
  category, 
  isSelected, 
  onSelectCategory,
  index = 0
}: { 
  category: any; 
  isSelected: boolean; 
  onSelectCategory: (v: string) => void;
  index?: number;
}) => {
  const [isPressing, setIsPressing] = useState(false);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const didLongPressTriggerRef = useRef(false);

  const handlePressStart = () => {
    didLongPressTriggerRef.current = false;
    longPressTimerRef.current = setTimeout(() => {
      setIsPressing(true);
      didLongPressTriggerRef.current = true;
    }, 250);
  };

  const handlePressEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (didLongPressTriggerRef.current) {
      setTimeout(() => {
        setIsPressing(false);
      }, 1500);
    } else {
      setIsPressing(false);
    }
  };

  const handlePressCancel = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    setIsPressing(false);
  };

  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px 0px 50px 0px" }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay: Math.min(index * 0.05, 0.2), duration: 0.3, ease: "easeOut" }}
      onClick={() => onSelectCategory(category.title)}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressCancel}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressCancel}
      className={`group relative h-[180px] sm:h-[200px] rounded-[24px] overflow-hidden cursor-pointer transition-all duration-300 select-none
        ${isSelected ? 'ring-2 ring-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.2)]' : 'ring-1 ring-white/5 hover:ring-white/20 shadow-xl'}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-zinc-900 overflow-hidden">
        {category.image ? (
          <img 
            src={category.image} 
            alt={category.title} 
            className={`w-full h-full object-cover transition-transform duration-700 ease-out 
              ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`} 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-800/50">
            <Folders className="w-10 h-10 text-zinc-700" />
          </div>
        )}
      </div>

      {/* Gradient Overlays */}
      <div className={`absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent transition-opacity duration-300 ${isSelected ? 'opacity-90' : 'opacity-80 group-hover:opacity-100'}`} />
      
      {/* Custom Category Color Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay`} />
      {isSelected && <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-40 mix-blend-overlay`} />}

      {/* Content Segment */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end z-20">
        {/* Selection Indicator */}
        <div className="absolute top-4 right-4">
          {isSelected && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              className="w-8 h-8 rounded-full bg-indigo-500/90 backdrop-blur-sm border border-indigo-400 flex items-center justify-center text-white shadow-lg"
            >
              <CheckCircle2 className="w-5 h-5 drop-shadow-md" />
            </motion.div>
          )}
        </div>

        <div className="transform translate-y-1 group-hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-1.5">
            <div className={`p-1.5 rounded-lg bg-black/40 backdrop-blur-md shadow-inner border border-white/5 ${isSelected ? 'text-indigo-400' : 'text-zinc-300 group-hover:text-white transition-colors'}`}>
              {category.icon ? React.cloneElement(category.icon as React.ReactElement, { className: 'w-4 h-4' } as any) : <Gamepad2 className="w-4 h-4" />}
            </div>
            <div className="flex items-center justify-between flex-1">
              <h3 className={`text-lg sm:text-xl font-black tracking-wide drop-shadow-lg ${isSelected ? 'text-white' : 'text-zinc-100 group-hover:text-white transition-colors'}`}>
                {category.title}
              </h3>
              <div className={`p-1.5 rounded-full backdrop-blur-md border border-white/5 transition-all duration-300 ${isSelected ? 'bg-indigo-500/20 text-indigo-400 translate-x-1' : 'bg-black/40 text-zinc-400 group-hover:text-white group-hover:bg-white/10 group-hover:translate-x-1'}`}>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium line-clamp-1 mb-3 group-hover:text-zinc-300 transition-colors drop-shadow-lg">
            {category.subtitle}
          </p>
          
          <div className={`h-1 rounded-full transition-all duration-300 ease-out ${isSelected ? 'bg-indigo-500 w-16' : 'bg-white/10 group-hover:w-12 group-hover:bg-white/40 w-8'}`} />
        </div>
      </div>

      {/* Long press / hover Details Pill */}
      <div className={`absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-[2px] transition-all duration-200 pointer-events-none ${isPressing ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'}`}>
        <div className="px-6 py-2.5 rounded-full border-2 border-[#a855f7] bg-black/70 text-[#d8b4fe] font-black text-sm tracking-wide shadow-[0_0_20px_rgba(168,85,247,0.4)]">
          ดูรายละเอียด
        </div>
      </div>
    </motion.div>
  );
};
