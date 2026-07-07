const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// Add a specific route for the zip file to bypass SPA fallback
const routeCode = `
app.get('/download-source', (req, res) => {
  const file = path.join(process.cwd(), 'public', 'KuwashiiShop.zip');
  res.download(file);
});
`;

if (!content.includes('/download-source')) {
  // Insert before the Vite middleware setup
  content = content.replace('// Configure Vite integration', routeCode + '\n// Configure Vite integration');
  fs.writeFileSync('server.ts', content, 'utf8');
}
