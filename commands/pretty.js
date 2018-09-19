const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.channel.send(bot.user.avatarURL);
}


module.exports.help = {
  name: "pretty"
}