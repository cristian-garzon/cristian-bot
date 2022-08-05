const Discord = require('discord.js')
const {Client, MessageEmbed, Intents} = require('discord.js')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const prefix = process.env.PREFIX
const {Commands} = require('../utilities/commands')
module.exports = {
    name: "help",
    alias :['h'],
    description: 'comando para mostrar que comandos hay :D',
    execute(client, message, args){
        let help = '';
        const helpEmbed = new MessageEmbed()
            .setTitle("help :3")
            .setColor("BLUE")
            .setFooter('cualquier duda, preguntame: Cristian321#3425')
            .setTimestamp();
        for(const file of Commands){
            const cmd = require(`./${file}`)
            help += `**${prefix}${cmd.name}** - ${cmd.description} \n`
        }
        helpEmbed.setDescription(help)


        message.reply({ embeds: [helpEmbed]})
    }
}