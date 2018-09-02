const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
    embed.setImage(message.author.avatarURL)
    embed.setColor('#275BF0')
    message.channel.send(embed)
}

 
module.exports.help = {
  name: "avatar"
}