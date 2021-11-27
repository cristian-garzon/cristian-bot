const Discord = require('discord.js')
const {Client, MessageEmbed, Intents, MessageReaction, User} = require('discord.js')
const lyricsFinder = require('lyrics-finder')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
module.exports = {
    name: "lyrics",
    alias :['ly'],
    async execute(client, message, args) {
        let page = [];
        let paginatos;
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
        let song = queue.songs[0].name
        let lyric = await lyricsFinder(song,'') || await  lyricsFinder('', song) ||'cancion no encontrada D:'
        paginatos = 0;
        for(let i = 0; i <= lyric.length; i += 500){
            let lyrics = lyric.substring(i, Math.min(lyric.length, i+500))
            let pages = new MessageEmbed()
                .setColor("YELLOW")
                .setDescription(lyrics)
                .setFooter(`lyric pedida por ${message.author.username} (si solo sale un botón, por favor escribe el comando denuevo)`)
            page.push(pages)
        }

        page[paginatos].setTitle(`page ${paginatos+1}/${page.length}`)
        const filterEmojis = (reaction , user) => {
            return ['◀','▶'].includes(reaction.emoji.name) && (message.author.id === user.id);
        }
        message.channel.send({embeds: [page[paginatos]] }).then(async msg =>{
            await msg.react('◀');
            await msg.react('▶');
            const reactions = msg.createReactionCollector(filterEmojis, {time: 1500});
            reactions.on('collect',async (reaction, user) =>{
                reaction.users.remove(reaction.users.cache.get(message.author.id))
                if(reaction.emoji.name === '▶'){
                    if(paginatos < page.length - 1){
                        paginatos += 1
                        page[paginatos].setTitle(`page ${paginatos+1}/${page.length}`)
                        msg.edit({embeds: [page[paginatos]]})
                    }
                } else if (reaction.emoji.name === '◀') {
                    if(paginatos !== 0){
                        paginatos -= 1
                        page[paginatos].setTitle(`page ${paginatos+1}/${page.length}`)
                        msg.edit({embeds: [page[paginatos]]})
                    }
                }
            });
            reactions.on('end', collect => {
                paginatos = 0
                console.log("the end")
                msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error))
            })
        })

   }
}
