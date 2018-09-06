const Discord = require("discord.js");
const fetch = require("snekfetch");


module.exports.run = async (bot, message, args) => {
if(args.length == 0){
    return  message.channel.send("Give me something to search!");
}
    fetch.get(`http://api.urbandictionary.com/v0/define?term=${args}`).then(res => {
        if(res.body.list[0] === undefined){
            return  message.channel.send("Couldn't find the term!");
        }
        const definition = res.body.list[0].definition;
        const word = res.body.list[0].word;
        const Author = res.body.list[0].Author;
        const exam = res.body.list[0].example;
        const thumpUP = res.body.list[0].thumbs_up;
        const thumpDown = res.body.list[0].thumbs_down;
        const embed = new Discord.RichEmbed()
        .setColor("#ff9900")
        .setTitle(`Info on the word:${word}`)
        .addField("Definition:",`${definition}`)

        message.channel.send(embed);
    });
 
}

 
module.exports.help = {
  name: "urban"
}