const fs = require('fs');
let content = fs.readFileSync('src/components/AuthPage.tsx', 'utf8');

const target = /<Turnstile\s*siteKey=\{import\.meta\.env\.VITE_TURNSTILE_SITE_KEY \|\| "1x00000000000000000000AA"\}\s*onSuccess=\{\(\) => setIsCaptchaVerified\(true\)\}\s*options=\{\{ theme: 'dark' \}\}\s*\/>/g;

const replacement = `
                  {import.meta.env.VITE_TURNSTILE_SITE_KEY && import.meta.env.VITE_TURNSTILE_SITE_KEY !== "1x00000000000000000000AA" && (
                    <Turnstile 
                      siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                      onSuccess={() => setIsCaptchaVerified(true)}
                      options={{ theme: 'dark' }}
                    />
                  )}
`;

content = content.replace(target, replacement);

fs.writeFileSync('src/components/AuthPage.tsx', content);
