const Discord = require("discord.js");
const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} = require("@discordjs/voice");
const { Client, MessageEmbed, Intents } = require("discord.js");
const { station } = require("../radioStations.json");
const player = createAudioPlayer();
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

module.exports = {
  name: "radio",
  alias: ["r", "R"],
  async execute(client, message, args) {
    if (!message.member.voice.channel)
      return message.reply("tienes que estar en un voice chat");
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.reply("tienes que estar en el mismo canal que yo");

    const stations = args.join(" ");
    const { station } = require("../radioStations.json");
    if (stations === "") {
      let listRadio = "";
      const radio = new MessageEmbed()
        .setTitle("estaciones de radio")
        .setColor("GREEN")
        .setFooter(`radio solicitada por ${message.author.username}`)
        .setTimestamp();
      station.forEach((fm) => {
        listRadio += `\n ${fm.number}. ${fm.name} \n`;
      });
      radio.setDescription(listRadio);
      return message.channel.send({ embeds: [radio] });
    }
    let resource = "";

    station.forEach((fm) => {
      if (fm.number.toString() === stations) {
        resource = createAudioResource(fm.mp3);
        message.reply(`colocando la radio: **${fm.name}**`);
      }
    });
    if (resource === "") return message.reply("esa radio no está en la lista");

    const conection = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });
    await player.play(resource);
    conection.subscribe(player);
  },
};
