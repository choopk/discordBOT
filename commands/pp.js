const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let user = message.mentions.users.first() || message.author;
  console.log("mavatar");
  console.log(user);
  let embed = new Discord.RichEmbed()
  embed.setImage(user.displayAvatarURL)
  embed.setColor('#275BF0')
  message.channel.send(embed)
}


module.exports.help = {
  name: "pp"
}