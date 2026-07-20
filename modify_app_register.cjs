const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');

const regex1 = /let insertRes = await supabase\.from\("profiles"\)\.insert\(\[\s*\{\s*username: targetUsername,\s*email: authEmail\.trim\(\),\s*password: authPassword,\s*balance: 0,\s*\},/;
const replacement1 = `const newMemberId = Math.floor(100000 + Math.random() * 900000).toString();
        let insertRes = await supabase.from("profiles").insert([
          {
            username: targetUsername,
            email: authEmail.trim(),
            password: authPassword,
            balance: 0,
            member_id: newMemberId,
          },`;
          
app = app.replace(regex1, replacement1);

const regex2 = /insertRes = await supabase\.from\("profiles"\)\.insert\(\[\s*\{\s*username: targetUsername,\s*password: authPassword,\s*balance: 0,\s*\},/;
const replacement2 = `insertRes = await supabase.from("profiles").insert([
            {
              username: targetUsername,
              password: authPassword,
              balance: 0,
              member_id: newMemberId,
            },`;

app = app.replace(regex2, replacement2);

fs.writeFileSync('src/App.tsx', app);
