const Discord = require("discord.js");
const { Client, MessageEmbed, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
module.exports = {
  name: "continue",
  alias: ["c"],
  execute(client, message, args) {
    if (!message.member.voice.channel)
      return message.reply("tienes que estar en un voice chat");
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.reply("tienes que estar en el mismo canal que yo");

    const queue = client.distube.getQueue(message.member.voice.channel);
    if (!queue)
      return message.reply({
        content: "no hay canciones reproduciendoce uwu",
        ephemeral: true,
      });
    if (!queue.pause) {
      return message.reply({
        content: "la canción no estaba pausada D:",
        ephemeral: true,
      });
    }
    try {
      client.distube.resume(message.member.voice.channel);
      return message.reply(
        "la canción ha sido pausada por" + message.author.username
      );
    } catch (e) {
      return message.reply("parece que ha habido un error");
    }
  },
};
