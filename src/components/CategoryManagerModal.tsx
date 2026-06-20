import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FolderPlus, Edit3, Trash2, Plus, Save } from 'lucide-react';
import { supabase } from '../supabase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  globalStats: any;
  setGlobalStats: (s: any) => void;
}

export const CategoryManagerModal: React.FC<Props> = ({ isOpen, onClose, globalStats, setGlobalStats }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);

  // Form state for adding/editing
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (globalStats && globalStats.announcement_settings?.categories) {
      setCategories(globalStats.announcement_settings.categories);
    } else {
      // Default categories if none exists
      setCategories([
        {
          title: 'Grow A Garden 2',
          subtitle: 'เกมปลูกผักสุดฮิตที่คุณไม่ควรพลาด',
          image: 'https://img2.pic.in.th/1000109799.jpg',
          iconName: 'Gamepad2',
          color: 'from-emerald-500/20 to-emerald-900/5',
          borderColor: 'group-hover:border-emerald-500/50',
          btnColor: 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white',
        },
        {
          title: 'ALL STAR',
          subtitle: 'รวมตัวละครดังจากทุกมุมโลก',
          image: 'https://img2.pic.in.th/1000109801.png',
          iconName: 'Star',
          color: 'from-blue-500/20 to-blue-900/5',
          borderColor: 'group-hover:border-blue-500/50',
          btnColor: 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white',
        },
        {
          title: 'Coming Soon',
          subtitle: 'หมวดหมู่ใหม่กำลังจะมา',
          image: 'https://img2.pic.in.th/pic/1000098251.jpg',
          iconName: 'Sparkles',
          color: 'from-purple-500/20 to-purple-900/5',
          borderColor: 'group-hover:border-purple-500/50',
          btnColor: 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white',
        }
      ]);
    }
  }, [globalStats, isOpen]);

  const handleSaveCategories = async (newCategories: any[]) => {
    setIsSaving(true);
    console.log("Saving categories:", newCategories);
    try {
      const { data: currentData, error: fetchErr } = await supabase
        .from('system_config')
        .select('announcement_settings')
        .eq('id', 'main')
        .single();
        
      let currentSettings = currentData?.announcement_settings || {};
      if (typeof currentSettings === 'string') {
        try {
          currentSettings = JSON.parse(currentSettings);
        } catch(e) {
          currentSettings = {};
        }
      }
      const newSettings = { ...currentSettings, categories: newCategories };
      console.log("New settings to upsert:", newSettings);

      const { data, error } = await supabase
        .from("system_config")
        .upsert({
          id: "main",
          announcement_settings: newSettings
        })
        .select()
        .single();
      
      console.log("Upsert response:", { data, error });
      
      if (error) {
        alert("บันทึกไม่สำเร็จ: " + error.message);
      }
      
      if (!error) {
         if (data) {
           let updatedStats = { ...data };
           if (updatedStats.announcement_settings && typeof updatedStats.announcement_settings === 'string') {
              try { updatedStats.announcement_settings = JSON.parse(updatedStats.announcement_settings); }
              catch(e) {}
           }
           console.log("Updated Stats applied to global:", updatedStats);
           setGlobalStats((prev: any) => ({ ...prev, ...updatedStats }));
         }
         setCategories(newCategories);
      }
      window.dispatchEvent(new Event("sync-update"));
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddOrUpdate = async () => {
    if (!title.trim()) return alert("กรุณากรอกชื่อหมวดหมู่");
    
    let newCats = [...categories];
    if (editingTitle) {
       newCats = newCats.map(c => c.title === editingTitle ? { ...c, title, subtitle, image } : c);
       
       if (title !== editingTitle) {
         // Update items that belong to the old category name to the new category name
         try {
           const { data: dbItems, error: itemsFetchErr } = await supabase
             .from('items')
             .select('*')
             .eq('category', editingTitle);
             
           if (dbItems && dbItems.length > 0) {
             const updates = dbItems.map((item: any) => ({
               ...item,
               category: title
             }));
             await supabase.from('items').upsert(updates);
           }
         } catch (e) {
           console.error("Failed to migrate items category name", e);
         }
       }
    } else {
       if (newCats.find(c => c.title === title)) return alert("ชื่อหมวดหมู่นี้มีอยู่แล้ว");
       newCats.push({
         title,
         subtitle,
         image,
         iconName: 'Gamepad2',
         color: 'from-zinc-500/20 to-zinc-900/5',
         borderColor: 'group-hover:border-zinc-500/50',
         btnColor: 'bg-zinc-500/10 text-zinc-400 group-hover:bg-zinc-500 group-hover:text-white',
       });
    }
    
    await handleSaveCategories(newCats);
    handleCancelEdit();
  };

  const handleDelete = async (targetTitle: string) => {
    if (!confirm('คุณต้องการลบหมวดหมู่นี้ใช่หรือไม่?')) return;
    const newCats = categories.filter(c => c.title !== targetTitle);
    await handleSaveCategories(newCats);
  };

  const startEdit = (cat: any) => {
    setEditingTitle(cat.title);
    setTitle(cat.title);
    setSubtitle(cat.subtitle || '');
    setImage(cat.image || '');
  };

  const handleCancelEdit = () => {
    setEditingTitle(null);
    setTitle('');
    setSubtitle('');
    setImage('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex justify-center items-center p-4">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.95 }}
             className="w-full max-w-2xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-center bg-zinc-900 border-b border-zinc-800 p-4">
              <h2 className="text-white font-bold text-lg flex items-center gap-2">
                 <FolderPlus className="w-5 h-5 text-rose-400" />
                 จัดการหมวดหมู่
              </h2>
              <button
                 onClick={onClose}
                 className="text-zinc-500 hover:text-white"
              >
                 <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6">
               
               {/* Form Section */}
               <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
                 <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                   {editingTitle ? <Edit3 className="w-4 h-4"/> : <Plus className="w-4 h-4"/>}
                   {editingTitle ? 'แก้ไขหมวดหมู่' : 'เพิ่มหมวดหมู่ใหม่'}
                 </h3>
                 <div className="space-y-3">
                   <div>
                     <label className="text-xs text-zinc-400 mb-1 block">ชื่อหมวดหมู่</label>
                     <input 
                       value={title} onChange={(e) => setTitle(e.target.value)} 
                       className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white" 
                       placeholder="เช่น Grow A Garden 2"
                     />
                   </div>
                   <div>
                     <label className="text-xs text-zinc-400 mb-1 block">คำอธิบาย</label>
                     <input 
                       value={subtitle} onChange={(e) => setSubtitle(e.target.value)} 
                       className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white" 
                       placeholder="เช่น เกมปลูกผักสุดฮิตที่คุณไม่ควรพลาด"
                     />
                   </div>
                   <div>
                     <label className="text-xs text-zinc-400 mb-1 block">ลิงก์รูปภาพ</label>
                     <input 
                       value={image} onChange={(e) => setImage(e.target.value)} 
                       className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white" 
                       placeholder="https://..."
                     />
                   </div>
                   <div className="flex justify-end gap-2 pt-2">
                     {editingTitle && (
                       <button onClick={handleCancelEdit} className="px-4 py-2 bg-zinc-800 text-white rounded-xl text-xs font-bold hover:bg-zinc-700">ยกเลิก</button>
                     )}
                     <button onClick={handleAddOrUpdate} disabled={isSaving} className="px-4 py-2 bg-rose-600/20 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold hover:bg-rose-600 hover:text-white transition-all flex items-center gap-1">
                       <Save className="w-4 h-4" /> บันทึก
                     </button>
                   </div>
                 </div>
               </div>

               {/* List Section */}
               <div className="space-y-3">
                 <h3 className="text-sm font-bold text-zinc-400">หมวดหมู่ทั้งหมด</h3>
                 {categories.map((cat, i) => (
                   <div key={i} className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 rounded-2xl">
                     <div className="flex items-center gap-3">
                       {cat.image ? (
                         <img src={cat.image} alt={cat.title} className="w-12 h-12 rounded-lg object-cover" />
                       ) : (
                         <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center">
                           <FolderPlus className="w-5 h-5 text-zinc-500" />
                         </div>
                       )}
                       <div>
                         <div className="text-sm font-bold text-white">{cat.title}</div>
                         <div className="text-xs text-zinc-500 line-clamp-1">{cat.subtitle}</div>
                       </div>
                     </div>
                     <div className="flex items-center gap-2">
                       <button onClick={() => startEdit(cat)} disabled={isSaving} className="p-2 text-zinc-400 hover:text-blue-400 bg-zinc-800 hover:bg-blue-500/10 rounded-xl transition-colors disabled:opacity-50">
                         <Edit3 className="w-4 h-4" />
                       </button>
                       <button onClick={() => handleDelete(cat.title)} disabled={isSaving} className="p-2 text-zinc-400 hover:text-red-400 bg-zinc-800 hover:bg-red-500/10 rounded-xl transition-colors disabled:opacity-50">
                         <Trash2 className="w-4 h-4" />
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
