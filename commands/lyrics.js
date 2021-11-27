const Discord = require('discord.js')
const {Client, MessageEmbed, Intents} = require('discord.js')
const lyricsFinder = require('lyrics-finder')
const {channel} = require("diagnostics_channel");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
module.exports = {
    name: "lyrics",
    alias :['ly'],
    async execute(client, message, args) {
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
            lyric = await lyricsFinder(queue.songs[0].name,'') || 'cancion no encontrada D:'
            console.log(lyric)

   }
}
