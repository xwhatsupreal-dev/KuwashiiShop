export const DISCORD_WEBHOOK_URL_TOPUP = 'https://discord.com/api/webhooks/1510998209936228493/r0qW4fwsKMJoTq4mWlwqY_6yNMKHVOcnG-gtrkURlCA6s2dZFr2it-Vx3I-b_IjeWY92';
export const DISCORD_WEBHOOK_URL_PURCHASE = 'https://discord.com/api/webhooks/1511063935888134284/LoW99CKLEDuscJWdSCTpIOvP30EIdwYo1j8JUdp1RvWORA9392tHhygHwnBP-UC3VsHj';

export const sendDiscordTopupEmbed = async (username: string, amount: number, channel: string, totalBalance: number, isSuccess: boolean = true, mapName?: string) => {
  try {
    const embed = {
      title: isSuccess ? "✅ แจ้งเตือนการเติมเงินสำเร็จ!" : "❌ การเติมเงินล้มเหลว",
      description: isSuccess ? `ผู้ใช้ **${username}** ได้ทำการเติมเงินเข้าสู่ระบบ` : `การเติมเงินสำหรับ **${username}** ไม่สำเร็จ`,
      color: isSuccess ? 0x22c55e : 0xef4444, // green-500 : red-500
      thumbnail: {
        url: isSuccess ? "https://cdn-icons-png.flaticon.com/512/1055/1055183.png" : "https://cdn-icons-png.flaticon.com/512/1055/1055183.png"
      },
      fields: [
        { name: "👤 บัญชีผู้ใช้", value: `\`${username}\``, inline: true },
        { name: "🎮 โซนเกมซัพพอร์ต", value: `**${mapName || 'ASTD'}**`, inline: true },
        { name: "💰 ยอดเติม", value: `\`฿${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}\``, inline: false },
        { name: "🏧 ช่องทาง", value: `**${channel.toUpperCase()}**`, inline: true },
        ...isSuccess ? [{ name: "💳 ยอดเงินคงเหลือรวม", value: `\`฿${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}\``, inline: true }] : []
      ],
      footer: {
        text: "🟢 Kuwashii El Web App - ระบบอัตโนมัติ"
      },
      timestamp: new Date().toISOString()
    };

    await fetch(DISCORD_WEBHOOK_URL_TOPUP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: "Kuwashii Topup Bot",
        avatar_url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=200&q=80",
        embeds: [embed]
      })
    });
  } catch(e) {}
};

export const sendDiscordPurchaseEmbed = async (username: string, itemName: string, qty: number, remainingStock: number, drops: { name: string, isSalt?: boolean }[], mapName?: string) => {
  try {
    const rareDrops = drops.filter(d => !d.isSalt);
    const hasRare = rareDrops.length > 0;
    
    // Group drops by name and count occurrences
    const dropsSummary = drops.reduce((acc, drop) => {
       acc[drop.name] = (acc[drop.name] || 0) + 1;
       return acc;
    }, {} as Record<string, number>);

    const dropsFormatted = Object.entries(dropsSummary).map(([name, count]) => {
       const isRareObj = rareDrops.find(r => r.name === name);
       const prefix = isRareObj ? '✨ **' : '🧂 ';
       const suffix = isRareObj ? '**' : '';
       return `${prefix}${name} x${count}${suffix}`;
    }).join('\n');

    const embed = {
      title: "🛒 รายงานการสั่งซื้อ/สุ่มสินค้า",
      description: `ผู้ใช้ **${username}** ได้ทำการสั่งซื้อสินค้าใหม่`,
      color: hasRare ? 0xf59e0b : 0x3b82f6, // amber-500 : blue-500
      thumbnail: {
        url: hasRare ? "https://cdn-icons-png.flaticon.com/512/3268/3268594.png" : "https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
      },
      fields: [
        { name: "👤 บัญชีผู้ใช้", value: `\`${username}\``, inline: true },
        { name: "🎮 โซนเกม", value: `**${mapName || 'ASTD'}**`, inline: true },
        { name: "📦 สินค้าที่ทำรายการ", value: `**${itemName}**`, inline: false },
        { name: "🔢 จำนวนและสต๊อก", value: `สุ่มจำนวน: \`${qty}\` ครั้ง\nคงเหลือ: \`${remainingStock}\` ชิ้น`, inline: true },
        { name: "🎁 ไอเทมที่ได้รับ", value: dropsFormatted || 'ไม่มีข้อมูลไอเทมที่ได้', inline: false }
      ],
      footer: {
        text: "🟢 Kuwashii El Web App - ระบบอัตโนมัติ"
      },
      timestamp: new Date().toISOString()
    };

    await fetch(DISCORD_WEBHOOK_URL_PURCHASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: "Kuwashii Shop Bot",
        avatar_url: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=200&q=80",
        embeds: [embed]
      })
    });
  } catch(e) {}
};

export const sendDiscordStockUpdateEmbed = async (webhookUrl: string, itemName: string, quantityAdded: number, totalStock: number, imageUrl?: string, mapName?: string) => {
  if (!webhookUrl) return;
  try {
    const embed = {
      title: `🚀 แจ้งเตือนสินค้าเข้าใหม่! > 🆕 ${itemName}`,
      description: `เติมสต๊อกจำนวน **${quantityAdded}** ชิ้น`,
      color: 0x8b5cf6, 
      thumbnail: {
        url: imageUrl || "https://img2.pic.in.th/1000111145.png"
      },
      fields: [
        { name: "📥 Added", value: `\`+${quantityAdded}\` ชิ้น`, inline: true },
        { name: "📦 In Stock", value: `\`${totalStock}\` ชิ้น`, inline: true }
      ],
      footer: {
        text: "Kuwashii Shop - ( kuwashii-shop.vercel.app )",
        icon_url: "https://img2.pic.in.th/1000111145bb818044d3458be6.md.png"
      },
      timestamp: new Date().toISOString()
    };

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: "KuwashiiShop - Stock",
        avatar_url: "https://img2.pic.in.th/1000111145.png",
        embeds: [embed]
      })
    });
  } catch(e) {}
};
