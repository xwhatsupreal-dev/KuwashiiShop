const fs = require('fs');

let content = fs.readFileSync('src/components/PaymentSettingsModal.tsx', 'utf8');

// Ensure Upload icon is imported
if (!content.includes('Upload')) {
  content = content.replace(/import \{ (.*) \} from 'lucide-react';/, "import { $1, Upload } from 'lucide-react';");
}

const handleImageUploadScript = `
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 1000;
        
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
        setter(dataUrl);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };
`;

if (!content.includes('handleImageUpload')) {
  content = content.replace(/const handleSave = async \(\) => \{/, handleImageUploadScript + '\n  const handleSave = async () => {');
}

// Update first QR code input (general)
const qrInput1 = `<input
                type="text"
                value={bankQrImage}
                onChange={(e) => setBankQrImage(e.target.value)}
                placeholder="https://..."
                className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20 transition-all font-sans"
              />`;
              
const qrReplacement1 = `<div className="flex items-center gap-2">
                <input
                  type="text"
                  value={bankQrImage}
                  onChange={(e) => setBankQrImage(e.target.value)}
                  placeholder="URL รูปภาพ หรืออัพโหลด"
                  className="flex-1 bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20 transition-all font-sans"
                />
                <label className="bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white px-4 py-3 rounded-xl cursor-pointer flex items-center justify-center transition-colors whitespace-nowrap gap-2 text-sm font-medium">
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">อัพโหลด</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleImageUpload(e, setBankQrImage)}
                  />
                </label>
              </div>`;

content = content.replace(qrInput1, qrReplacement1);

// Update second QR code input (ROV)
const qrInput2 = `<input
                type="text"
                value={bankQrImageRov}
                onChange={(e) => setBankQrImageRov(e.target.value)}
                placeholder="https://..."
                className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20 transition-all font-sans"
              />`;
              
const qrReplacement2 = `<div className="flex items-center gap-2">
                <input
                  type="text"
                  value={bankQrImageRov}
                  onChange={(e) => setBankQrImageRov(e.target.value)}
                  placeholder="URL รูปภาพ หรืออัพโหลด"
                  className="flex-1 bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20 transition-all font-sans"
                />
                <label className="bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white px-4 py-3 rounded-xl cursor-pointer flex items-center justify-center transition-colors whitespace-nowrap gap-2 text-sm font-medium">
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">อัพโหลด</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleImageUpload(e, setBankQrImageRov)}
                  />
                </label>
              </div>`;
              
content = content.replace(qrInput2, qrReplacement2);


fs.writeFileSync('src/components/PaymentSettingsModal.tsx', content);
console.log('Success');
