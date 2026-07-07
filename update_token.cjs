const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// Replace standard assignments
content = content.replace(/let token = process\.env\.CF_API_TOKEN \|\| process\.env\.VITE_CF_API_TOKEN;/g, 
  `let token = "cfut_CAocuU6UlkyPs3rkQ9PyHL6sGWN6yU0QZrasxiJL548fbed2";`);

// Replace const assignments
content = content.replace(/const rawToken = process\.env\.CF_API_TOKEN \|\| process\.env\.VITE_CF_API_TOKEN;/g, 
  `const rawToken = "cfut_CAocuU6UlkyPs3rkQ9PyHL6sGWN6yU0QZrasxiJL548fbed2";`);

// Find any other usage
content = content.replace(/process\.env\.CF_API_TOKEN \|\| process\.env\.VITE_CF_API_TOKEN/g, 
  `"cfut_CAocuU6UlkyPs3rkQ9PyHL6sGWN6yU0QZrasxiJL548fbed2"`);

fs.writeFileSync('server.ts', content, 'utf8');
console.log('Updated server.ts with new token');
