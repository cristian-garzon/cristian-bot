const Discord = require('discord.js')

module.exports = (client,Queue,Song) =>{
    Queue.textChannel.send(`reproduciendo la cancion: ${Song.name} `)
}