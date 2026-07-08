const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = /const \[isCaptchaVerified, setIsCaptchaVerified\] = useState\(false\);/g;
const replacement = `const [isCaptchaVerified, setIsCaptchaVerified] = useState(!import.meta.env.VITE_TURNSTILE_SITE_KEY || import.meta.env.VITE_TURNSTILE_SITE_KEY === "1x00000000000000000000AA");`;

content = content.replace(target, replacement);

fs.writeFileSync('src/App.tsx', content);
