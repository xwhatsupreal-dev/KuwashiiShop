const fs = require('fs');

// 1. CustomerDatabaseModal.tsx
let customerContent = fs.readFileSync('src/components/CustomerDatabaseModal.tsx', 'utf8');
customerContent = customerContent.replace(/แก้ไขพ้อยสินค้า/g, 'แก้ไขยอดเงิน');
customerContent = customerContent.replace(/\{typeof user\.balance === 'number' \? user\.balance\.toLocaleString\(\) : '0'\} \(สินค้า\)/g, `{typeof user.balance === 'number' ? user.balance.toLocaleString() : '0'}`);
customerContent = customerContent.replace(/\{\(user\.balance \|\| 0\)\.toLocaleString\(\)\} \(สินค้า\)/g, `{(user.balance || 0).toLocaleString()}`);
fs.writeFileSync('src/components/CustomerDatabaseModal.tsx', customerContent);

// 2. UserProfileDashboard.tsx
let dashboardContent = fs.readFileSync('src/components/UserProfileDashboard.tsx', 'utf8');
dashboardContent = dashboardContent.replace(/พ้อยสินค้า/g, 'ยอดเงินคงเหลือ');
fs.writeFileSync('src/components/UserProfileDashboard.tsx', dashboardContent);

// 3. ShopHeader.tsx
let headerContent = fs.readFileSync('src/components/ShopHeader.tsx', 'utf8');
headerContent = headerContent.replace(/สินค้า: ฿/g, 'ยอดเงิน: ฿');
fs.writeFileSync('src/components/ShopHeader.tsx', headerContent);

