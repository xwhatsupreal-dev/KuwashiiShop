const fs = require('fs');
let discord = fs.readFileSync('src/discord.ts', 'utf8');

discord = discord.replace(
  /export const sendDiscordTopupEmbed = async \(username: string, amount: number, channel: string, totalBalance: number, isSuccess: boolean = true, mapName\?: string\) => \{/,
  "export const sendDiscordTopupEmbed = async (username: string, amount: number, channel: string, totalBalance: number, isSuccess: boolean = true, errorMessage?: string, mapName?: string) => {"
);

discord = discord.replace(
  /description: \`จำนวนเงิน \*\*฿\$\{amount\.toLocaleString\(undefined, \{ minimumFractionDigits: 2 \}\)\}\*\* ผ่านช่องทาง \*\*\$\{channel\.toUpperCase\(\)\}\*\*\`,/,
  "description: isSuccess ? `จำนวนเงิน **฿${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}** ผ่านช่องทาง **${channel.toUpperCase()}**` : `สาเหตุ: **${errorMessage || 'ไม่ทราบสาเหตุ'}**\\nช่องทาง: **${channel.toUpperCase()}**`,"
);

fs.writeFileSync('src/discord.ts', discord);
console.log("Discord updated.");
