const fs = require('fs');
let content = fs.readFileSync('src/components/ImageSettingsModal.tsx', 'utf8');

const startStr = '<div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6 bg-zinc-950/50">';
const endStr = '{/* Footer */}';

const startBody = content.indexOf(startStr);
const endBody = content.indexOf(endStr);

if (startBody !== -1 && endBody !== -1) {
  const newBody = `<div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6 bg-zinc-950/50">
            {renderImageInput('โลโก้ร้าน (Shop Logo & AI Avatar)', 'shopLogoUrl')}
            {renderImageInput('แบนเนอร์ร้าน (Shop Banner URL)', 'shopBannerUrl')}
            {renderImageInput('รูปชวนเข้าระบบ (Login Banner URL)', 'loginBannerUrl')}
            {renderImageInput('รูปดูสินค้าทั้งหมด (All Products Banner)', 'productsBannerUrl')}
            {renderImageInput('รูปหน้าเติมเงิน (Topup Banner URL)', 'topupBannerUrl')}
            {renderImageInput('รูปหน้าติดต่อแอดมิน (Contact Admin Banner)', 'contactBannerUrl')}
            
            <div className="pt-4 border-t border-white/5">
              {renderImageInput('รูปภาพแจ้งเตือน 1 (Popup Image 1)', 'announcementImageUrl')}
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 mt-4">
                 ลิงก์โปรโมท 1 (Popup Link 1)
              </label>
              <input
                type="text"
                value={settings.announcementLinkUrl || ''}
                onChange={(e) => setSettings({ ...settings, announcementLinkUrl: e.target.value })}
                placeholder="https://... (เว้นว่างได้)"
                className="w-full bg-zinc-900 border border-white/5 text-zinc-100 px-4 py-3 rounded-xl focus:outline-none focus:border-fuchsia-500 transition-all text-sm font-sans"
              />
            </div>
            
            <div className="pt-4 border-t border-white/5">
              {renderImageInput('รูปภาพแจ้งเตือน 2 (Popup Image 2)', 'announcementImageUrl2')}
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 mt-4">
                 ลิงก์โปรโมท 2 (Popup Link 2)
              </label>
              <input
                type="text"
                value={settings.announcementLinkUrl2 || ''}
                onChange={(e) => setSettings({ ...settings, announcementLinkUrl2: e.target.value })}
                placeholder="https://... (เว้นว่างได้)"
                className="w-full bg-zinc-900 border border-white/5 text-zinc-100 px-4 py-3 rounded-xl focus:outline-none focus:border-fuchsia-500 transition-all text-sm font-sans"
              />
            </div>
          </div>

          `;
  content = content.substring(0, startBody) + newBody + content.substring(endBody);
  fs.writeFileSync('src/components/ImageSettingsModal.tsx', content);
  console.log('Success');
} else {
  console.log('Failed to find markers');
}
