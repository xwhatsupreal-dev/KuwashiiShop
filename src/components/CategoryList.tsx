import React from 'react';
import { ChevronRight, Gamepad2, Folders, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'motion/react';

export const CategoryList = ({ selectedCategory, setSelectedCategory, globalStats }: { selectedCategory: string, setSelectedCategory: (v: string) => void, globalStats?: any }) => {
  const customCategories = globalStats?.announcement_settings?.categories;
  const displayCategories = customCategories || [];
  
  if (displayCategories.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto mb-10 w-full relative z-20">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-7 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase font-display">หมวดหมู่สินค้า</h2>
        </div>
        <p className="text-sm text-zinc-400 font-medium ml-4 flex items-center gap-1.5 pt-2">
          <Star className="w-4 h-4 text-amber-400" /> หมวดหมู่ที่เเนะนำให้สำหรับคุณ
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-5">
        {displayCategories.map((category: any, index: number) => {
          const isSelected = selectedCategory === category.title;
          
          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              key={index} 
              onClick={() => setSelectedCategory(category.title)}
              className={`group relative h-[180px] sm:h-[200px] rounded-[24px] overflow-hidden cursor-pointer transition-all duration-300
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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
