const Discord = require('discord.js')
const {Client, MessageEmbed, Intents} = require('discord.js')
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
module.exports = {
    name: "ping",
    alias :['ping'],
    description: "hago ping uwu",
    execute(client, message, args){
      message.reply("pong!")
    }
}