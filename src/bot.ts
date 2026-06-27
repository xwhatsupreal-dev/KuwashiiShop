import { Client, GatewayIntentBits, Partials, Events } from 'discord.js';

let client: Client | null = null;

export const initDiscordBot = () => {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) {
    console.log("Discord Bot Token not found. Skipping bot initialization.");
    return null;
  }

  try {
    client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      partials: [Partials.Channel, Partials.Message],
    });

    client.once(Events.ClientReady, (readyClient) => {
      console.log(`Discord Bot logged in as ${readyClient.user.tag}`);
    });

    client.on(Events.MessageCreate, async (message) => {
      if (message.author.bot) return;

      if (message.content === '!ping') {
        await message.reply('Pong! 🏓');
      }

      if (message.content === '!help') {
        await message.reply('Kuwashii Shop Bot is here to help! \nCommands: `!ping`, `!shop`');
      }

      if (message.content === '!shop') {
        await message.reply('Visit our shop at: https://kuwashii-shopv1.vercel.app');
      }
    });

    client.login(token).catch(err => {
      console.error("Failed to login Discord Bot:", err);
    });

    return client;
  } catch (err) {
    console.error("Error initializing Discord Bot:", err);
    return null;
  }
};
