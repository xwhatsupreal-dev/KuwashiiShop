const fs = require('fs');

let content = fs.readFileSync('src/components/ImageSettingsModal.tsx', 'utf8');

// Ensure Upload icon is imported
if (!content.includes('Upload')) {
  content = content.replace(/import \{ (.*) \} from 'lucide-react';/, "import { $1, Upload } from 'lucide-react';");
}

const handleImageUploadScript = `
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
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
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
`;

if (!content.includes('handleImageUpload')) {
  content = content.replace(/const loadSettings = async \(\) => \{/, handleImageUploadScript + '\n  const loadSettings = async () => {');
}

// Now replace all the manual fields with renderImageInput.
// I will just construct the full JSX for the modal body and replace it.

const startBody = content.indexOf('<div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">');
const endBody = content.indexOf('          {/* Footer */}');

if (startBody !== -1 && endBody !== -1) {
  const newBody = `<div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">
            {renderImageInput('โลโก้ร้าน (Shop Logo URL)', 'shopLogoUrl')}
            {renderImageInput('แบนเนอร์ร้าน (Shop Banner URL)', 'shopBannerUrl')}
            {renderImageInput('แบนเนอร์หน้าเข้าสู่ระบบ (Login Banner URL)', 'loginBannerUrl')}
            {renderImageInput('แบนเนอร์หน้ารวมสินค้า (Products Banner URL)', 'productsBannerUrl')}
            {renderImageInput('แบนเนอร์หน้าเติมเงิน (Topup Banner URL)', 'topupBannerUrl')}
            {renderImageInput('แบนเนอร์หน้าติดต่อแอดมิน (Contact Admin Banner URL)', 'contactBannerUrl')}
            
            <div className="pt-4 border-t border-white/5">
              {renderImageInput('ลิงก์รูปภาพแจ้งเตือน 1 (Popup Image 1)', 'imageUrl')}
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 mt-4">
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
            
            <div className="pt-4 border-t border-white/5">
              {renderImageInput('ลิงก์รูปภาพแจ้งเตือน 2 (Popup Image 2)', 'imageUrl2')}
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 mt-4">
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
`;
  content = content.substring(0, startBody) + newBody + content.substring(endBody);
}

fs.writeFileSync('src/components/ImageSettingsModal.tsx', content);
console.log('Success');
