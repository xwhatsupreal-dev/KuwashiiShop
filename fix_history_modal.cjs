const fs = require('fs');
let content = fs.readFileSync('src/components/HistoryModal.tsx', 'utf8');
content = content.replace(/filteredPurchases/g, 'filteredNormalPurchases');
fs.writeFileSync('src/components/HistoryModal.tsx', content);
