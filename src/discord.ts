export const DISCORD_WEBHOOK_URL_TOPUP = 'https://discord.com/api/webhooks/1510998209936228493/r0qW4fwsKMJoTq4mWlwqY_6yNMKHVOcnG-gtrkURlCA6s2dZFr2it-Vx3I-b_IjeWY92';
export const DISCORD_WEBHOOK_URL_PURCHASE = 'https://discord.com/api/webhooks/1511063935888134284/LoW99CKLEDuscJWdSCTpIOvP30EIdwYo1j8JUdp1RvWORA9392tHhygHwnBP-UC3VsHj';

export const sendDiscordTopupEmbed = async (username: string, amount: number, channel: string, totalBalance: number, isSuccess: boolean = true, mapName?: string) => {
  try {
    const embed = {
      title: isSuccess ? `💰 แจ้งเตือนการเติมเงิน! > 🆕 ${username}` : `❌ การเติมเงินล้มเหลว > ${username}`,
      description: `จำนวนเงิน **฿${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}** ผ่านช่องทาง **${channel.toUpperCase()}**`,
      color: isSuccess ? 0x22c55e : 0xef4444, // green-500 : red-500
      thumbnail: {
        url: "https://img2.pic.in.th/1000111145.png"
      },
      fields: [
        { name: "👤 User", value: `\`${username}\``, inline: true },
        ...isSuccess ? [{ name: "💵 Balance", value: `\`฿${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}\``, inline: true }] : []
      ],
      footer: {
        text: "Kuwashii Shop - ( kuwashii-shopv1.vercel.app )",
        icon_url: "https://img2.pic.in.th/1000111145bb818044d3458be6.md.png"
      },
      timestamp: new Date().toISOString()
    };

    const res = await fetch(DISCORD_WEBHOOK_URL_TOPUP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: "KuwashiiShop - Topup",
        avatar_url: "https://img2.pic.in.th/1000111145.png",
        embeds: [embed]
      })
    });
    if (!res.ok) {
       console.error('Discord webhook topup failed:', await res.text());
    }
  } catch(e) {
    console.error('Discord webhook topup exception:', e);
  }
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
      title: `🛒 รายงานการสั่งซื้อ! > 🆕 ${username}`,
      description: `ซื้อสินค้า **${itemName}** จำนวน **${qty}** ครั้ง`,
      color: hasRare ? 0xf59e0b : 0x3b82f6, // amber-500 : blue-500
      thumbnail: {
        url: "https://img2.pic.in.th/1000111145.png"
      },
      fields: [
        { name: "📦 Item", value: `\`${itemName}\``, inline: true },
        { name: "📋 Left", value: `\`${remainingStock}\` ชิ้น`, inline: true },
        { name: "🎁 Drops", value: dropsFormatted || 'ไม่มีข้อมูล', inline: false }
      ],
      footer: {
        text: "Kuwashii Shop - ( kuwashii-shopv1.vercel.app )",
        icon_url: "https://img2.pic.in.th/1000111145bb818044d3458be6.md.png"
      },
      timestamp: new Date().toISOString()
    };

    const res = await fetch(DISCORD_WEBHOOK_URL_PURCHASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: "KuwashiiShop - Purchase",
        avatar_url: "https://img2.pic.in.th/1000111145.png",
        embeds: [embed]
      })
    });
    if (!res.ok) {
       console.error('Discord webhook purchase failed:', await res.text());
    }
  } catch(e) {
    console.error('Discord webhook purchase exception:', e);
  }
};

export const sendDiscordStockUpdateEmbed = async (webhookUrl: string, itemName: string, quantityAdded: number, totalStock: number, imageUrl?: string, mapName?: string) => {
  if (!webhookUrl) return;
  try {
    const embed = {
      title: `🚀 แจ้งเตือนสินค้าเข้าใหม่! > 🆕 ${itemName}`,
      description: `เติมสต๊อกจำนวน **${quantityAdded}** ชิ้น`,
      color: 0x8b5cf6, 
      thumbnail: {
        url: (imageUrl && imageUrl.startsWith('http')) ? imageUrl : "https://img2.pic.in.th/1000111145.png"
      },
      fields: [
        { name: "📥 Added", value: `\`+${quantityAdded}\` ชิ้น`, inline: true },
        { name: "📦 In Stock", value: `\`${totalStock}\` ชิ้น`, inline: true }
      ],
      footer: {
        text: "Kuwashii Shop - ( kuwashii-shopv1.vercel.app )",
        icon_url: "https://img2.pic.in.th/1000111145bb818044d3458be6.md.png"
      },
      timestamp: new Date().toISOString()
    };

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: "KuwashiiShop - Stock",
        avatar_url: "https://img2.pic.in.th/1000111145.png",
        embeds: [embed]
      })
    });
    if (!res.ok) {
      console.error('Discord webhook failed:', await res.text());
    }
  } catch(e) {
    console.error('Discord webhook exception:', e);
  }
};
