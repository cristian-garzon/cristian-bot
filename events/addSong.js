const Discord = require('discord.js')

module.exports = (client,queue,song) =>{
    queue.textChannel.send(`cancion añadida a la playlist: ${song.name}`)
}