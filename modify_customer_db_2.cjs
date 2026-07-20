const fs = require('fs');
let content = fs.readFileSync('src/components/CustomerDatabaseModal.tsx', 'utf8');

// Fix search logic
content = content.replace(
  /u && \(u\.username \|\| ''\)\.toLowerCase\(\)\.includes\(\(search \|\| ''\)\.toLowerCase\(\)\)/,
  `u && ((u.username || '').toLowerCase().includes((search || '').toLowerCase()) || (u.member_id || '').includes(search))`
);

fs.writeFileSync('src/components/CustomerDatabaseModal.tsx', content);
