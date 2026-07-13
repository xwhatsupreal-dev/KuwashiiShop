const fs = require('fs');
let content = fs.readFileSync('src/components/UserProfileDashboard.tsx', 'utf8');

// Remove the "พ้อยเติมเกม" section
content = content.replace(
  /<div className="bg-cyan-500\/10 border border-cyan-500\/20 rounded-xl p-3 flex justify-between items-center">\s*<span className="text-xs text-cyan-300 font-medium whitespace-nowrap">\s*พ้อยเติมเกม\s*<\/span>\s*<span className="text-cyan-400 font-bold">\s*฿\{\(currentUser\?\.balance_rov \|\| 0\)\.toLocaleString\(\)\}\s*<\/span>\s*<\/div>/g,
  ``
);

fs.writeFileSync('src/components/UserProfileDashboard.tsx', content);
