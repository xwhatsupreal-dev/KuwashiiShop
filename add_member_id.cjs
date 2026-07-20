const fs = require('fs');

let content = fs.readFileSync('src/components/UserProfileDashboard.tsx', 'utf8');

const regex = /<h3 className="font-bold text-zinc-100">\{currentUser\?\.username\}<\/h3>/;
const replacement = `<h3 className="font-bold text-zinc-100">{currentUser?.username}</h3>
            {currentUser?.member_id && (
                <p className="text-xs text-zinc-500 mt-1">ID: {currentUser.member_id}</p>
            )}`;
            
content = content.replace(regex, replacement);
fs.writeFileSync('src/components/UserProfileDashboard.tsx', content);
