import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Image as ImageIcon, Save, Check } from 'lucide-react';
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
    announcementImageUrl: '',
    announcementLinkUrl: '',
    announcementImageUrl2: '',
    announcementLinkUrl2: ''
  });

  useEffect(() => {
    if (isOpen) {
      loadSettings();
      setIsSaved(false);
    }
  }, [isOpen]);

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
            <div>
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                ลิงก์โลโก้ร้าน (Shop Logo & AI Avatar)
              </label>
              <input
                type="text"
                value={settings.shopLogoUrl || ''}
                onChange={(e) => setSettings({ ...settings, shopLogoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-zinc-900 border border-white/5 text-zinc-100 px-4 py-3 rounded-xl focus:outline-none focus:border-fuchsia-500 transition-all text-sm font-sans"
              />
              {settings.shopLogoUrl && (
                <div className="mt-3 p-3 bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-center">
                  <img src={settings.shopLogoUrl} alt="Logo Preview" className="h-16 w-16 rounded-full object-cover border-2 border-fuchsia-500/30" />
                </div>
              )}
            </div>

            <div>
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                ลิงก์แบนเนอร์ร้าน (Shop Banner URL)
              </label>
              <input
                type="text"
                value={settings.shopBannerUrl || ''}
                onChange={(e) => setSettings({ ...settings, shopBannerUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-zinc-900 border border-white/5 text-zinc-100 px-4 py-3 rounded-xl focus:outline-none focus:border-fuchsia-500 transition-all text-sm font-sans"
              />
              {settings.shopBannerUrl && (
                <div className="mt-3 p-3 bg-zinc-900 rounded-xl border border-white/5 overflow-hidden">
                  <img src={settings.shopBannerUrl} alt="Banner Preview" className="w-full h-24 object-cover rounded-lg border border-white/10" />
                </div>
              )}
            </div>

            <div>
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                ลิงก์รูปชวนเข้าระบบ (Login Banner URL)
              </label>
              <input
                type="text"
                value={settings.loginBannerUrl || ''}
                onChange={(e) => setSettings({ ...settings, loginBannerUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-zinc-900 border border-white/5 text-zinc-100 px-4 py-3 rounded-xl focus:outline-none focus:border-fuchsia-500 transition-all text-sm font-sans"
              />
              {settings.loginBannerUrl && (
                <div className="mt-3 p-3 bg-zinc-900 rounded-xl border border-white/5 overflow-hidden bg-black/50">
                  <img src={settings.loginBannerUrl} alt="Login Banner Preview" className="w-full h-24 object-contain rounded-lg border border-white/10" />
                </div>
              )}
            </div>

            <div>
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                ลิงก์รูปดูสินค้าทั้งหมด (All Products Banner URL)
              </label>
              <input
                type="text"
                value={settings.productsBannerUrl || ''}
                onChange={(e) => setSettings({ ...settings, productsBannerUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-zinc-900 border border-white/5 text-zinc-100 px-4 py-3 rounded-xl focus:outline-none focus:border-fuchsia-500 transition-all text-sm font-sans"
              />
              {settings.productsBannerUrl && (
                <div className="mt-3 p-3 bg-zinc-900 rounded-xl border border-white/5 overflow-hidden bg-black/50">
                  <img src={settings.productsBannerUrl} alt="Products Banner Preview" className="w-full h-24 object-contain rounded-lg border border-white/10" />
                </div>
              )}
            </div>

            <div>
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                ลิงก์รูปเติมเงิน (Topup Banner URL)
              </label>
              <input
                type="text"
                value={settings.topupBannerUrl || ''}
                onChange={(e) => setSettings({ ...settings, topupBannerUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-zinc-900 border border-white/5 text-zinc-100 px-4 py-3 rounded-xl focus:outline-none focus:border-fuchsia-500 transition-all text-sm font-sans"
              />
              {settings.topupBannerUrl && (
                <div className="mt-3 p-3 bg-zinc-900 rounded-xl border border-white/5 overflow-hidden bg-black/50">
                  <img src={settings.topupBannerUrl} alt="Topup Banner Preview" className="w-full h-24 object-contain rounded-lg border border-white/10" />
                </div>
              )}
            </div>

            <div>
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                ลิงก์รูปติดต่อแอดมิน (Contact Admin Banner URL)
              </label>
              <input
                type="text"
                value={settings.contactBannerUrl || ''}
                onChange={(e) => setSettings({ ...settings, contactBannerUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-zinc-900 border border-white/5 text-zinc-100 px-4 py-3 rounded-xl focus:outline-none focus:border-fuchsia-500 transition-all text-sm font-sans"
              />
              {settings.contactBannerUrl && (
                <div className="mt-3 p-3 bg-zinc-900 rounded-xl border border-white/5 overflow-hidden bg-black/50">
                  <img src={settings.contactBannerUrl} alt="Contact Admin Banner Preview" className="w-full h-24 object-contain rounded-lg border border-white/10" />
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/5/50">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 flex items-center gap-2">
                <ImageIcon className="w-3 h-3" /> ลิงก์รูปภาพแจ้งเตือน 1 (Popup Image 1)
              </label>
              <input
                type="text"
                value={settings.imageUrl || ''}
                onChange={(e) => setSettings({ ...settings, imageUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-zinc-900 border border-white/5 text-zinc-100 px-4 py-3 rounded-xl focus:outline-none focus:border-fuchsia-500 transition-all text-sm font-sans mb-3"
              />
              {settings.imageUrl && (
                <div className="mb-3 p-3 bg-zinc-900 rounded-xl border border-white/5 overflow-hidden">
                  <img src={settings.imageUrl} alt="Popup 1 Preview" className="w-full h-24 object-cover rounded-lg border border-white/10" />
                </div>
              )}
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 flex items-center gap-2">
                 ลิงก์โปรโมท 1 (Popup Link 1)
              </label>
              <input
                type="text"
                value={settings.linkUrl || ''}
                onChange={(e) => setSettings({ ...settings, linkUrl: e.target.value })}
                placeholder="https://... (เว้นว่างได้)"
                className="w-full bg-zinc-900 border border-white/5 text-zinc-100 px-4 py-3 rounded-xl focus:outline-none focus:border-fuchsia-500 transition-all text-sm font-sans"
              />
            </div>

            <div className="pt-4 border-t border-white/5/50">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 flex items-center gap-2">
                <ImageIcon className="w-3 h-3" /> ลิงก์รูปภาพแจ้งเตือน 2 (Popup Image 2)
              </label>
              <input
                type="text"
                value={settings.imageUrl2 || ''}
                onChange={(e) => setSettings({ ...settings, imageUrl2: e.target.value })}
                placeholder="https://... (เว้นว่างได้)"
                className="w-full bg-zinc-900 border border-white/5 text-zinc-100 px-4 py-3 rounded-xl focus:outline-none focus:border-fuchsia-500 transition-all text-sm font-sans mb-3"
              />
              {settings.imageUrl2 && (
                <div className="mb-3 p-3 bg-zinc-900 rounded-xl border border-white/5 overflow-hidden">
                  <img src={settings.imageUrl2} alt="Popup 2 Preview" className="w-full h-24 object-cover rounded-lg border border-white/10" />
                </div>
              )}
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 flex items-center gap-2">
                 ลิงก์โปรโมท 2 (Popup Link 2)
              </label>
              <input
                type="text"
                value={settings.linkUrl2 || ''}
                onChange={(e) => setSettings({ ...settings, linkUrl2: e.target.value })}
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
