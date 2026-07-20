import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Image as ImageIcon, Save, Check, Upload } from 'lucide-react';
import { supabase } from '../supabase';

interface ImageSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageSettingsModal: React.FC<ImageSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const [settings, setSettings] = useState<any>({
    shopLogoUrl: '',
    shopBannerUrl: '',
    loginBannerUrl: '',
    productsBannerUrl: '',
    topupBannerUrl: '',
    contactBannerUrl: '',
    imageUrl: '',
    linkUrl: '',
    imageUrl2: '',
    linkUrl2: ''
  });

  useEffect(() => {
    if (isOpen) {
      loadSettings();
      setIsSaved(false);
    }
  }, [isOpen]);

  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL('image/webp', 0.8);
        setSettings(prev => ({ ...prev, [fieldName]: dataUrl }));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const renderImageInput = (label: string, fieldName: string) => (
    <div className="mb-4">
      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 flex items-center gap-2">
        <ImageIcon className="w-3 h-3" /> {label}
      </label>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={settings[fieldName] || ''}
            onChange={(e) => setSettings({ ...settings, [fieldName]: e.target.value })}
            placeholder="URL รูปภาพ (https://...) หรืออัพโหลด"
            className="flex-1 bg-zinc-900 border border-white/5 text-zinc-100 px-4 py-2.5 rounded-xl focus:outline-none focus:border-fuchsia-500 transition-all text-sm font-sans"
          />
          <label className="bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white px-4 py-2.5 rounded-xl cursor-pointer flex items-center justify-center transition-colors whitespace-nowrap gap-2 text-sm font-medium">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">อัพโหลด</span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => handleImageUpload(e, fieldName)}
            />
          </label>
        </div>
        {settings[fieldName] && (
          <div className="p-3 bg-zinc-900 rounded-xl border border-white/5 overflow-hidden bg-black/50">
            <img src={settings[fieldName]} alt="Preview" className="w-full h-24 object-contain rounded-lg border border-white/10" />
          </div>
        )}
      </div>
    </div>
  );

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('system_config')
        .select('announcement_settings')
        .eq('id', 'main')
        .single();
        
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      let currentSettings = data?.announcement_settings;
      if (typeof currentSettings === 'string') {
        try {
          currentSettings = JSON.parse(currentSettings);
        } catch(e) {}
      }
      
      if (currentSettings) {
        setSettings({
          ...settings,
          ...currentSettings
        });
      }
    } catch (err) {
      console.error('Error loading image settings:', err);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Get current to not overwrite other announcement settings
      const { data: currentData } = await supabase
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
        
      const updatedSettings = {
        ...currentSettings,
        shopLogoUrl: settings.shopLogoUrl,
        shopBannerUrl: settings.shopBannerUrl,
        loginBannerUrl: settings.loginBannerUrl,
        productsBannerUrl: settings.productsBannerUrl,
        topupBannerUrl: settings.topupBannerUrl,
        contactBannerUrl: settings.contactBannerUrl,
        imageUrl: settings.imageUrl,
        linkUrl: settings.linkUrl,
        imageUrl2: settings.imageUrl2,
        linkUrl2: settings.linkUrl2,
      };
      
      // Merge all image related settings into announcement_settings
      const { error } = await supabase
        .from('system_config')
        .update({ 
          announcement_settings: updatedSettings
        })
        .eq('id', 'main');

      if (error) throw error;
      
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        onClose();
        // Force reload to apply changes globally
        window.location.reload();
      }, 1000);
      
    } catch (err) {
      console.error('Error saving image settings:', err);
      alert('ไม่สามารถบันทึกการตั้งค่าได้');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-100">จัดการรูปภาพร้านค้า</h2>
                <p className="text-xs text-zinc-400 mt-1">ตั้งค่าโลโก้ แบนเนอร์</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6 bg-zinc-950/50">
            {renderImageInput('โลโก้ร้าน (Shop Logo & AI Avatar)', 'shopLogoUrl')}
            {renderImageInput('แบนเนอร์ร้าน (Shop Banner URL)', 'shopBannerUrl')}
            {renderImageInput('รูปชวนเข้าระบบ (Login Banner URL)', 'loginBannerUrl')}
            {renderImageInput('รูปดูสินค้าทั้งหมด (All Products Banner)', 'productsBannerUrl')}
            {renderImageInput('รูปหน้าเติมเงิน (Topup Banner URL)', 'topupBannerUrl')}
            {renderImageInput('รูปหน้าติดต่อแอดมิน (Contact Admin Banner)', 'contactBannerUrl')}
            
            <div className="pt-4 border-t border-white/5">
              {renderImageInput('รูปภาพแจ้งเตือน 1 (Popup Image 1)', 'imageUrl')}
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 mt-4">
                 ลิงก์โปรโมท 1 (Popup Link 1)
              </label>
              <input
                type="text"
                value={settings.linkUrl || ''}
                onChange={(e) => setSettings({ ...settings, announcementLinkUrl: e.target.value })}
                placeholder="https://... (เว้นว่างได้)"
                className="w-full bg-zinc-900 border border-white/5 text-zinc-100 px-4 py-3 rounded-xl focus:outline-none focus:border-fuchsia-500 transition-all text-sm font-sans"
              />
            </div>
            
            <div className="pt-4 border-t border-white/5">
              {renderImageInput('รูปภาพแจ้งเตือน 2 (Popup Image 2)', 'imageUrl2')}
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 mt-4">
                 ลิงก์โปรโมท 2 (Popup Link 2)
              </label>
              <input
                type="text"
                value={settings.linkUrl2 || ''}
                onChange={(e) => setSettings({ ...settings, announcementLinkUrl2: e.target.value })}
                placeholder="https://... (เว้นว่างได้)"
                className="w-full bg-zinc-900 border border-white/5 text-zinc-100 px-4 py-3 rounded-xl focus:outline-none focus:border-fuchsia-500 transition-all text-sm font-sans"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 shrink-0">
            <button
              onClick={handleSave}
              disabled={isSaving || isSaved}
              className="w-full py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2
                bg-fuchsia-600 hover:bg-fuchsia-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaved ? (
                <>
                  <Check className="w-5 h-5" />
                  บันทึกสำเร็จ!
                </>
              ) : isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  กำลังบันทึก...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  บันทึกการตั้งค่า
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
