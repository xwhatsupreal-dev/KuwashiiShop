import React from 'react';
import { Star } from 'lucide-react';
import { CategoryCardItem } from './CategoryCardItem';

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
        {displayCategories.map((category: any, index: number) => (
          <CategoryCardItem
            key={index}
            index={index}
            category={category}
            isSelected={selectedCategory === category.title}
            onSelectCategory={setSelectedCategory}
          />
        ))}
      </div>
    </div>
  );
};
