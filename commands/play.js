const Discord = require("discord.js");
const { Client, MessageEmbed, Intents } = require("discord.js");
const { measureMemory } = require("vm");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
module.exports = {
  name: "play",
  alias: ["p"],
  description: "busco y coloco la canción que quieras :D",
  execute(client, message, args) {
    const song = args.join(' ');
    if (!message.member.voice.channel)
      return message.reply("tienes que estar en un voice chat");
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.reply("tienes que estar en el mismo canal que yo");
    if(song.trim() === '') return message.reply("tienes que colocar alguna canción");
    message.client.distube.playVoiceChannel(
        message.member.voice.channel,
        args.join(' '),
        {
            textChannel: message.channel,
            member: message.member
        }
    )


  }
  
};
