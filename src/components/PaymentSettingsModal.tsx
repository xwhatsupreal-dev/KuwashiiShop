import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Wallet, QrCode, CreditCard, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../supabase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  globalStats: any;
  setGlobalStats: (s: any) => void;
}

export const PaymentSettingsModal: React.FC<Props> = ({ isOpen, onClose, globalStats, setGlobalStats }) => {
  const [angpaoActive, setAngpaoActive] = useState(true);
  const [qrActive, setQrActive] = useState(true);
  const [targetWallet, setTargetWallet] = useState<'all' | 'balance' | 'balance_rov'>('all');
  
  // ALL STAR configurations
  const [angpaoPhone, setAngpaoPhone] = useState('');
  const [qrName, setQrName] = useState('');
  const [bankQrImage, setBankQrImage] = useState('');
  const [bankAccountNo, setBankAccountNo] = useState('');
  const [bankName, setBankName] = useState('');

  // ATOR/GAG2 configurations
  const [angpaoPhoneRov, setAngpaoPhoneRov] = useState('');
  const [qrNameRov, setQrNameRov] = useState('');
  const [bankQrImageRov, setBankQrImageRov] = useState('');
  const [bankAccountNoRov, setBankAccountNoRov] = useState('');
  const [bankNameRov, setBankNameRov] = useState('');

  const [activeTab, setActiveTab] = useState<'allstar' | 'rov' | 'general'>('general');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (globalStats) {
      let ann = globalStats.announcement_settings || {};
      if (typeof ann === 'string') {
          try { ann = JSON.parse(ann); } catch(e) { ann = {}; }
      }
      setAngpaoActive(ann.topup_angpao_status !== false);
      setQrActive(ann.topup_qrcode_status !== false);
      setTargetWallet(ann.topup_target_wallet || 'all');
      
      setAngpaoPhone(ann.topup_angpao_phone || '');
      setQrName(ann.topup_qrcode_name || '');
      setBankQrImage(ann.topup_bank_qr_image || '');
      setBankAccountNo(ann.topup_bank_account_no || '');
      setBankName(ann.topup_bank_name || 'K BANK');

      setAngpaoPhoneRov(ann.topup_angpao_phone_rov || '');
      setQrNameRov(ann.topup_qrcode_name_rov || '');
      setBankQrImageRov(ann.topup_bank_qr_image_rov || '');
      setBankAccountNoRov(ann.topup_bank_account_no_rov || '');
      setBankNameRov(ann.topup_bank_name_rov || 'K BANK');
    }
  }, [globalStats, isOpen]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Fetch current config
      const { data: currentData } = await supabase.from('system_config').select('announcement_settings').eq('id', 'main').single();
      let currentSettings = currentData?.announcement_settings || {};
      if (typeof currentSettings === 'string') {
          try { currentSettings = JSON.parse(currentSettings); } catch(e) { currentSettings = {}; }
      }
      
      const newSettings = {
         ...currentSettings,
         topup_angpao_status: angpaoActive,
         topup_qrcode_status: qrActive,
         topup_target_wallet: targetWallet,

         topup_angpao_phone: angpaoPhone,
         topup_qrcode_name: qrName,
         topup_bank_qr_image: bankQrImage,
         topup_bank_account_no: bankAccountNo,
         topup_bank_name: bankName,

         topup_angpao_phone_rov: angpaoPhoneRov,
         topup_qrcode_name_rov: qrNameRov,
         topup_bank_qr_image_rov: bankQrImageRov,
         topup_bank_account_no_rov: bankAccountNoRov,
         topup_bank_name_rov: bankNameRov
      };

      const { data, error } = await supabase
        .from("system_config")
        .upsert({
          id: "main",
          announcement_settings: newSettings
        })
        .select()
        .single();
      
      if (!error && data) {
         let updatedStats = { ...data };
         if (typeof updatedStats.announcement_settings === 'string') {
            try { updatedStats.announcement_settings = JSON.parse(updatedStats.announcement_settings); } catch(e) {}
         }
         setGlobalStats(updatedStats);
      }
      window.dispatchEvent(new Event("sync-update"));
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const ConfigForm = ({ title, prefix, isRov }: any) => {
     return (
       <div className="space-y-4">
         <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
            <h3 className="font-bold text-white text-sm mb-2">อั่งเปา (Angpao) - {title}</h3>
            <div>
              <label className="text-xs font-bold text-zinc-400">เบอร์โทรศัพท์ (Truemoney Wallet)</label>
              <input 
                type="text" 
                value={isRov ? angpaoPhoneRov : angpaoPhone}
                onChange={(e) => isRov ? setAngpaoPhoneRov(e.target.value) : setAngpaoPhone(e.target.value)}
                placeholder="080xxxxxxx"
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
              />
            </div>
         </div>

         <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
            <h3 className="font-bold text-white text-sm mb-2">โอนเงินธนาคาร (Slip) - {title}</h3>
            
            <div>
              <label className="text-xs font-bold text-zinc-400">ชื่อบัญชีผู้รับ (ใช้สำหรับตรวจสอบสลิปอัตโนมัติ)</label>
              <input 
                type="text" 
                value={isRov ? qrNameRov : qrName}
                onChange={(e) => isRov ? setQrNameRov(e.target.value) : setQrName(e.target.value)}
                placeholder="ชื่อ นามสกุล"
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-400">รูป QR Code เพื่อรับเงิน (URL รูปภาพ)</label>
              <input 
                type="text" 
                value={isRov ? bankQrImageRov : bankQrImage}
                onChange={(e) => isRov ? setBankQrImageRov(e.target.value) : setBankQrImage(e.target.value)}
                placeholder="https://..."
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-zinc-400">เลขบัญชี (แสดงผล)</label>
                <input 
                  type="text" 
                  value={isRov ? bankAccountNoRov : bankAccountNo}
                  onChange={(e) => isRov ? setBankAccountNoRov(e.target.value) : setBankAccountNo(e.target.value)}
                  placeholder="XXX-X-XXXXX-X"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-400">ชื่อธนาคาร (แสดงผล)</label>
                <input 
                  type="text" 
                  value={isRov ? bankNameRov : bankName}
                  onChange={(e) => isRov ? setBankNameRov(e.target.value) : setBankName(e.target.value)}
                  placeholder="K BANK, SCB..."
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
         </div>
       </div>
     );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex justify-center items-center p-4">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.95 }}
             className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="flex justify-between items-center bg-zinc-900 border-b border-zinc-800 p-4 shrink-0">
              <h2 className="text-white font-bold text-lg flex items-center gap-2">
                 <Wallet className="w-5 h-5 text-indigo-400" />
                 จัดการช่องทางชำระเงิน
              </h2>
              <button
                 onClick={onClose}
                 className="text-zinc-500 hover:text-white"
              >
                 <X className="w-5 h-5" />
              </button>
            </div>
  
            <div className="flex border-b border-zinc-800 shrink-0">
               <button 
                 onClick={() => setActiveTab('general')} 
                 className={`flex-1 py-3 text-sm font-bold ${activeTab === 'general' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-zinc-500'}`}
               >
                 สถานะปุ่มชำระเงิน
               </button>
               <button 
                 onClick={() => setActiveTab('allstar')} 
                 className={`flex-1 py-3 text-sm font-bold ${activeTab === 'allstar' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-zinc-500'}`}
               >
                 บัญชี ALL STAR
               </button>
               <button 
                 onClick={() => setActiveTab('rov')} 
                 className={`flex-1 py-3 text-sm font-bold ${activeTab === 'rov' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-zinc-500'}`}
               >
                 บัญชี ATOR/GAG2
               </button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[60vh]">
               {activeTab === 'general' && (
                 <div className="space-y-6">
                   <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-lg bg-[#ff203a]/10 flex items-center justify-center">
                             <Wallet className="w-5 h-5 text-[#ff203a]" />
                           </div>
                           <div>
                              <div className="text-white font-bold text-sm">ซองอั่งเปา (Angpao)</div>
                              <div className="text-zinc-500 text-xs">เปิด/ปิด ปุ่มซองอั่งเปา</div>
                           </div>
                        </div>
                        <button 
                          onClick={() => setAngpaoActive(!angpaoActive)}
                          className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors relative ${angpaoActive ? 'bg-emerald-500' : 'bg-red-500'}`}
                        >
                           <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${angpaoActive ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                     </div>
                   </div>
      
                   <div className="space-y-4 pt-4 border-t border-zinc-900">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                             <QrCode className="w-5 h-5 text-emerald-400" />
                           </div>
                           <div>
                              <div className="text-white font-bold text-sm">สแกนชำระเงิน (QR Slip)</div>
                              <div className="text-zinc-500 text-xs">เปิด/ปิด ปุ่มโอนเงินผ่านสลิป</div>
                           </div>
                        </div>
                        <button 
                          onClick={() => setQrActive(!qrActive)}
                          className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors relative ${qrActive ? 'bg-emerald-500' : 'bg-red-500'}`}
                        >
                           <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${qrActive ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                     </div>
                   </div>

                   <div className="space-y-4 pt-4 border-t border-zinc-900">
                       <div className="space-y-2">
                           <label className="text-xs font-bold text-zinc-400">บังคับบัญชีเครดิตที่ได้รับเริ่มต้น</label>
                           <select 
                             value={targetWallet} 
                             onChange={(e: any) => setTargetWallet(e.target.value)}
                             className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                           >
                             <option value="all">ให้ผู้ใช้งานเลือกเอง (เลือกได้ทั้ง 2 เครดิต)</option>
                             <option value="balance">บังคับรับเครดิต ALL STAR เท่านั้น</option>
                             <option value="balance_rov">บังคับรับเครดิต ATOR/GAG2 เท่านั้น</option>
                           </select>
                       </div>
                   </div>
                 </div>
               )}

               {activeTab === 'allstar' && ConfigForm({ title: "สำหรับเครดิต ALL STAR", prefix: "", isRov: false })}
               {activeTab === 'rov' && ConfigForm({ title: "สำหรับเครดิต ATOR/GAG2", prefix: "_rov", isRov: true })}
            </div>
  
            <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 flex justify-end gap-3 shrink-0">
               <button
                 onClick={onClose}
                 className="px-4 py-2 text-sm text-zinc-400 font-medium hover:text-white"
               >
                 ยกเลิก
               </button>
               <button
                 onClick={handleSave}
                 disabled={isSaving}
                 className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-50"
               >
                 {isSaving ? "กำลังบันทึก..." : "บันทึกการตั้งค่า"}
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


