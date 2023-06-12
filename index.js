require("dotenv").config();
const token = process.env.token;
const { Client, Events, GatewayIntentBits, Partials } = require("discord.js");
let fetch = require("node-fetch");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel, Partials.Message],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.substr(0, 7) == "/create") {
    if (message.content.substring(0, 7) == "/create") {
      let prompt = message.content.substr(8).split(" ").join("-");
      const res = await fetch(`https://useless.cyclic.app/create/${prompt}`);
      const json = await res.json();
      message.reply(json.param);
    }
  } else {
    message.reply("\n\nTo get started type /create/your-image-prompt");
  }
});

client.login(token);
