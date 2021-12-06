const Discord = require("discord.js");
const { Client, MessageEmbed, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
module.exports = {
  name: "skip",
  alias: ["skip"],
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
    if (!queue.autoplay && queue.songs.length <= 1)
      return message.reply("solo hay una canción en la lista");
    client.distube.skip(message.member.voice.channel);
    message.reply(
      `la canción ${queue.songs[0].name} ha sido skipeada por ${message.author.username}`
    );
  },
};
