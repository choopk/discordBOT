const Discord = require("discord.js");

const client = new Discord.Client();
var logger = require('winston');
const fs = require("fs")
const config = require("./config.json");
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000



// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

client.on("ready", async () => {
  console.log(`${client.user.username} is online!`);
  //waifu Activity
  client.user.setActivity("Husbando Games");
});

// Initialize Discord Bot
client.login(config.token);

//const prefix = "!";


client.on("message", async (message) => {

/*
show channel type
console.log(message.channel.type);
show channel name
console.log(message.channel.name);
 */

let messageArray = message.content.split(" ");

let cmd = messageArray[0];
let arg1 = messageArray.slice(1);
let prefix = config.prefix;

if (!`${prefix}` || message.author.bot) return;
if (cmd === `${prefix}ping`) {
  message.channel.send("pong new!");
 // console.log(message.channel.type);
} else
if (cmd === `${prefix}pretty`) {
  //send waifuBot Avatar
  message.channel.send(client.user.avatarURL);
}else
if (message.content.startsWith(prefix + "OwO")) {
  //send embedded messages
  message.channel.send({embed: {
    color: 3447003,
    description: "OwO!"
  }});
}else
if (cmd === `${prefix}avatar`) {
  //send own Avatar
  let embed = new Discord.RichEmbed()
  embed.setImage(message.author.avatarURL)
  embed.setColor('#275BF0')
  message.channel.send(embed)
}
if(message.content.startsWith(prefix + "prefix")) {
    // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
    let newPrefix = message.content.split(" ").slice(1, 2)[0];
    console.log(newPrefix);
    // change the configuration in memory
    prefix = newPrefix;
    // Now we have to save the file.
    fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
}else
if (cmd === `${prefix}mavatar`) {
  //get User avatar
  let user = message.mentions.users.first() || message.author;
  console.log("mavatar");
  console.log(user);
  let embed = new Discord.RichEmbed()
  embed.setImage(user.displayAvatarURL)
  embed.setColor('#275BF0')
  message.channel.send(embed)
}


const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

if (command === "asl") {
//  let age = args[0]; // Remember arrays are 0-based!.
 // let sex = args[1];
 // let location = args[2];
  let [age, sex, location] = args;
  if(age > 18){
    message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
  }else {
    message.reply(`Hello ${message.author.username}, I see you are ${age} and underage. I'm sorry, but I will have to reject you`);
  }
}


});
express()
  .listen(process.env.PORT || 5000, () => console.log(`Listening on ${ PORT }`))
