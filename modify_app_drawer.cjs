const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /onLoginClick=\{\(\) => \{\s*setAppScreen\("LOGIN"\);\s*setAuthMode\("login"\);\s*\}\}/;
const replacement = `onLoginClick={() => {
              setAppScreen("LOGIN");
              setAuthMode("login");
            }}
            onRegisterClick={() => {
              setAppScreen("LOGIN");
              setAuthMode("register");
            }}`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', content);
