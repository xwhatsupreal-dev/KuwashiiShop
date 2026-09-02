import React from 'react';
import { motion } from 'motion/react';
import { Package } from 'lucide-react';

export const ItemCardSkeleton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-800/80 bg-[#0d0d12] p-2.5 sm:p-3 animate-pulse"
    >
      {/* Image Skeleton */}
      <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center mb-2.5">
        <Package className="w-8 h-8 text-zinc-800" />
      </div>

      {/* Info Skeleton */}
      <div className="flex flex-col items-center gap-2 pt-1 pb-1 flex-1 justify-between">
        {/* Title */}
        <div className="h-4 w-3/4 bg-zinc-800/80 rounded-md" />

        {/* Price */}
        <div className="h-5 w-20 bg-zinc-800/80 rounded-md my-0.5" />

        {/* Button */}
        <div className="h-10 w-full bg-[#25103a]/60 rounded-xl sm:rounded-2xl mt-1" />

        {/* Stock footer */}
        <div className="h-3.5 w-24 bg-zinc-800/60 rounded-md mt-2" />
      </div>
    </motion.div>
  );
};

