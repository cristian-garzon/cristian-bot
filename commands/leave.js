const Discord = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
  name: "leave",
  alias: ["L", "l"],
  execute(client, message, args) {
    if (!message.member.voice.channel)
      return message.reply("tienes que estar en un voice chat");
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.reply("tienes que estar en el mismo canal que yo");

    const connection = getVoiceConnection(message.guild.id);

    connection.destroy();

    message.reply(`he sido desconectado del canal por **${message.author.username}**`);
  },
};
