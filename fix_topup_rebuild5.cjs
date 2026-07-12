const fs = require('fs');
let content = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

content = content.replace(/\s*\)\n\s*\)\}\n\s*\{topupModalStep === "angpao" && \(/, `
                  );
                })()}
                </div>
             )}
             
             {topupModalStep === "angpao" && (`);

fs.writeFileSync('src/components/TopupPage.tsx', content);
