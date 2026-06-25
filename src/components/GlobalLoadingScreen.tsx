import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GlobalLoadingScreenProps {
  isLoading: boolean;
  progress?: number;
}

export const GlobalLoadingScreen: React.FC<GlobalLoadingScreenProps> = ({ isLoading, progress }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[999999] bg-zinc-950 flex flex-col items-center justify-center p-4 text-center select-none"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-48 h-48 sm:w-64 sm:h-64 mb-8"
          >
            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
            <img 
              src="https://img2.pic.in.th/1000111145.png" 
              alt="Loading..." 
              className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col items-center gap-3 w-full max-w-xs"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
              กำลังโหลดข้อมูล
            </h2>
            {progress !== undefined && progress > 0 ? (
              <div className="w-full mt-4">
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-indigo-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut", duration: 0.3 }}
                  />
                </div>
                <div className="text-xs text-zinc-500 mt-2 font-mono">{progress}%</div>
              </div>
            ) : (
              <div className="flex gap-2.5 mt-2">
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} 
                  className="w-3 h-3 bg-violet-500 rounded-full" 
                />
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} 
                  className="w-3 h-3 bg-purple-500 rounded-full" 
                />
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} 
                  className="w-3 h-3 bg-teal-500 rounded-full" 
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
