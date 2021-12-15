const Discord = require("discord.js");
const { Client, MessageEmbed, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
module.exports = {
  name: "queue",
  alias: ["q"],
  description: "muestra la lista de canciones que hay :3",
  execute(client, message, args) {
    const queue = client.distube.getQueue(message.member.voice.channel);
    if (!queue)
      return message.reply({
        content: "no hay canciones reproduciendoce uwu",
        ephemeral: true,
      });
    const embed = new MessageEmbed()
      .setTitle("playlist")
      .setDescription(
        "\n" +
          queue.songs
            .map(
              (song, id) =>
                `${id + 1}. ${song.name} - \`${song.formattedDuration}\``
            )
            .slice(0, 10)
            .join("\n")
      )
      .setFooter(`playlist pedida por ${message.author.username}`)
      .setColor("GREEN")
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
