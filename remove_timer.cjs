const fs = require('fs');
let content = fs.readFileSync('src/components/TopupPage.tsx', 'utf8');

// Remove angpao timer
const angpaoTimerRegex = /<div className="mt-3 inline-block bg-black\/40 px-3 py-1\.5 rounded-full border border-red-500\/20">[\s\S]*?<\/div>/g;
content = content.replace(angpaoTimerRegex, '');

// Remove bank timer
const bankTimerRegex = /<div className="mt-3 inline-block bg-black\/40 px-3 py-1\.5 rounded-full border border-emerald-500\/20">[\s\S]*?<\/div>/g;
content = content.replace(bankTimerRegex, '');

// Remove timer state and useEffect
const timerLogicRegex = /const \[timeLeft, setTimeLeft\] = useState\(300\); \/\/ 5 minutes in seconds[\s\S]*?const formatTime = \(seconds: number\) => {[\s\S]*?return m \+ ":" \+ \(s < 10 \? '0' : ''\) \+ s;\n  };/g;
content = content.replace(timerLogicRegex, '');

// Remove empty formatTime if it exists
const formatTime2Regex = /const formatTime = \(seconds: number\) => {[\s\S]*?return \`\$\{m\}:\$\{s < 10 \? '0' : ''\}\$\{s\}\`;\n  };/g;
content = content.replace(formatTime2Regex, '');

fs.writeFileSync('src/components/TopupPage.tsx', content);
