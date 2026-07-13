const fs = require('fs');
let content = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

const oldLogic = `onClick={async (e) => {
                                e.preventDefault();
                                try {
                                  const response = await fetch(qrUrl);
                                  const blob = await response.blob();
                                  const url = window.URL.createObjectURL(blob);
                                  const downloadAnchor = document.createElement('a');
                                  downloadAnchor.style.display = 'none';
                                  downloadAnchor.href = url;
                                  downloadAnchor.download = 'qr-code.jpg';
                                  document.body.appendChild(downloadAnchor);
                                  downloadAnchor.click();
                                  window.URL.revokeObjectURL(url);
                                } catch (error) {
                                  console.error('Download failed:', error);
                                }
                              }}`;

const newLogic = `onClick={async (e) => {
                                e.preventDefault();
                                try {
                                  // Proxy image to bypass CORS
                                  const response = await fetch(\`/api/proxy-image?url=\${encodeURIComponent(qrUrl)}\`);
                                  const blob = await response.blob();
                                  const url = window.URL.createObjectURL(blob);
                                  const downloadAnchor = document.createElement('a');
                                  downloadAnchor.style.display = 'none';
                                  downloadAnchor.href = url;
                                  downloadAnchor.download = 'qr-code.jpg';
                                  document.body.appendChild(downloadAnchor);
                                  downloadAnchor.click();
                                  window.URL.revokeObjectURL(url);
                                  document.body.removeChild(downloadAnchor);
                                } catch (error) {
                                  console.error('Download failed:', error);
                                  // Fallback
                                  const downloadAnchor = document.createElement('a');
                                  downloadAnchor.href = qrUrl;
                                  downloadAnchor.download = 'qr-code.jpg';
                                  downloadAnchor.target = '_blank';
                                  document.body.appendChild(downloadAnchor);
                                  downloadAnchor.click();
                                  document.body.removeChild(downloadAnchor);
                                }
                              }}`;

content = content.replace(oldLogic, newLogic);
fs.writeFileSync('src/components/TopupPage.tsx', content);
console.log('Fixed QR download button');
