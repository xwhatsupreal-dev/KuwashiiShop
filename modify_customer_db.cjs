const fs = require('fs');
let content = fs.readFileSync('src/components/CustomerDatabaseModal.tsx', 'utf8');

// Add member_id to the arr mapping
content = content.replace(
  /password: d\.password,/,
  `password: d.password,
          member_id: d.member_id,`
);

// Add search support for member_id
content = content.replace(
  /u\.username\.toLowerCase\(\)\.includes\(search\.toLowerCase\(\)\)/,
  `u.username.toLowerCase().includes(search.toLowerCase()) || (u.member_id && u.member_id.toString().includes(search))`
);

fs.writeFileSync('src/components/CustomerDatabaseModal.tsx', content);
