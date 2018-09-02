const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.channel.send("recfactored pong!");
}

 
module.exports.help = {
  name: "ping"
}