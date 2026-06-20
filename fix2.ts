import * as fs from 'fs';

let adminModal = fs.readFileSync('src/components/AdminModal.tsx', 'utf8');
adminModal = adminModal.replace(/Array.from\(e.target.files\).forEach\(file => processFile\(file\)\);/g, 'Array.from(e.target.files).forEach((file: any) => processFile(file));');
adminModal = adminModal.replace(/Array.from\(e.dataTransfer.files\).forEach\(file => processFile\(file\)\);/g, 'Array.from(e.dataTransfer.files).forEach((file: any) => processFile(file));');
fs.writeFileSync('src/components/AdminModal.tsx', adminModal);

let inqueryModal = fs.readFileSync('src/components/InquiryModal.tsx', 'utf8');
inqueryModal = inqueryModal.replace(/item.rarity/g, 'item.saleFormat');
fs.writeFileSync('src/components/InquiryModal.tsx', inqueryModal);

let salesChart = fs.readFileSync('src/components/SalesChart.tsx', 'utf8');
salesChart = salesChart.replace(/<CartesianCartProps/g, '<any');
salesChart = salesChart.replace(/<CartesianGrid([^>]*)key=/g, '<CartesianGrid$1');
fs.writeFileSync('src/components/SalesChart.tsx', salesChart);
