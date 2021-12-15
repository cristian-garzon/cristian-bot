const Discord = require("discord.js");
const { token, prefix } = require("./config.json");
const {
  Intents,
  Client,
  MessageEmbed,
  Collection,
  Guild,
} = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_VOICE_STATES, 'GUILD_MESSAGE_REACTIONS'],
});
const {Commands} = require('./utilities/commands')
const fs = require("fs");
client.commands = new Collection();

client.on("ready", () => {
  console.log("bot funcionndoo");
});

for (const file of Commands) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  let usuario = message.mentions.members.first() || message.member;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  const command = args.shift();

  // handlers
  let cmd = client.commands.find(
    (c) => c.name === command || (c.alias && c.alias.includes(command))
  );
  if (cmd) {
    cmd.execute(client, message, args);
  }
});

//event songs
const Distube = require('distube')
client.distube = new Distube.default(client)


for(const file of fs.readdirSync('./events/')){
  if(file.endsWith('.js')){
    let filename = file.substr(0,file.length-3)
    let fileContents = require(`./events/${filename}`)
    client.distube.on(filename, fileContents.bind(null,client))
  }
}
client.login(token);
