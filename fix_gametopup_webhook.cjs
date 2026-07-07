const fs = require('fs');
let content = fs.readFileSync('./src/components/GameTopupPage.tsx', 'utf8');

if (!content.includes('sendDiscordPurchaseEmbed')) {
  // Add import
  content = content.replace(
    `import { supabase } from "../supabase";`,
    `import { supabase } from "../supabase";\nimport { sendDiscordPurchaseEmbed } from "../discord";`
  );

  // Add webhook call
  content = content.replace(
    `        showToast("เติมเกมสำเร็จ!", "success");`,
    `        sendDiscordPurchaseEmbed(currentUser.username, \`เติมเกม \${selectedGame.toUpperCase()} - \${selectedPack.name}\`, 1, 0, []);\n        showToast("เติมเกมสำเร็จ!", "success");`
  );
  
  fs.writeFileSync('./src/components/GameTopupPage.tsx', content, 'utf8');
  console.log("Added Webhook to GameTopupPage");
} else {
  console.log("Webhook already exists");
}
