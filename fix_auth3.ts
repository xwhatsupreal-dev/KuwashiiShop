import * as fs from 'fs';

const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace setShowAuthModal(false) with setAppScreen("SHOP") in handleAuthSubmit
content = content.replace(/setShowAuthModal\(false\);/g, 'setShowAuthModal(false); setAppScreen("SHOP");');

// We also have the `<AnimatePresence> {showAuthModal && (` in App.tsx that is now disabled or should be disabled.
// Let's replace the whole modal block if it exists. Wait, we already disabled topup modal. Did we disable auth modal?
const authModalRegex = /\{\/\* Authentication Modal \*\/\}\s*<AnimatePresence>\s*\{showAuthModal && \(/;

if (authModalRegex.test(content)) {
    content = content.replace(/\{\/\* Authentication Modal \*\/\}\s*<AnimatePresence>\s*\{showAuthModal && \(/, '{/* Authentication Modal (Disabled) */}\n      <AnimatePresence>\n        {false && (');
}

fs.writeFileSync(file, content);
console.log('Fixed auth submit and disabled auth modal');
