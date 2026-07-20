const fs = require('fs');

let content = fs.readFileSync('src/components/ImageSettingsModal.tsx', 'utf8');

const importRegex = /import \{ X, Image as ImageIcon, Save, Check \} from 'lucide-react';/;
const importReplacement = `import { X, Image as ImageIcon, Save, Check, Upload } from 'lucide-react';`;

content = content.replace(importRegex, importReplacement);

const newFunctions = `
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
        
        // Max dimensions
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
        
        // Compress to JPEG
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setSettings({ ...settings, [fieldName]: dataUrl });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };
`;

const handleSaveRegex = /const handleSave = async \(\) => \{/;
content = content.replace(handleSaveRegex, newFunctions + '\n  const handleSave = async () => {');

// We need to replace all instances of input type text with a combined input for text and file upload.
// For example:
/*
<input
  type="text"
  value={settings.shopLogoUrl || ''}
  onChange={(e) => setSettings({ ...settings, shopLogoUrl: e.target.value })}
  placeholder="https://..."
  className="..."
/>
*/

// Let's replace the repetitive blocks using a helper function in React.
const renderInputBlock = `
  const renderImageInput = (label: string, fieldName: string) => (
    <div className="mb-4">
      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
        {label}
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
          <label className="bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white px-4 py-2.5 rounded-xl cursor-pointer flex items-center justify-center transition-colors">
            <Upload className="w-4 h-4" />
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

const loadSettingsRegex = /const loadSettings = async \(\) => \{/;
content = content.replace(loadSettingsRegex, renderInputBlock + '\n  const loadSettings = async () => {');

fs.writeFileSync('src/components/ImageSettingsModal.tsx.new', content);
