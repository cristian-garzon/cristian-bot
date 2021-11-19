const Discord = require("discord.js");
const { token } = require("./config.json");
const {
  Intents,
  Client,
  MessageEmbed,
  Collection,
  Guild,
} = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_VOICE_STATES],
});
const fs = require("fs");
const { isBuffer } = require("util");
let prefix = "C!";
client.commands = new Discord.Collection();

client.on("ready", () => {
  console.log("bot funcionandoo");
});
// creating module commands
const commandfiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
console.log(commandfiles);

for (const file of commandfiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  let usuario = message.mentions.members.first() || message.member;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase();

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
    console.log(filename)
    client.distube.on(filename, fileContents.bind(null,client))
  }
}
client.login(token);