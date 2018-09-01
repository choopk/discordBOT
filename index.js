const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
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

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  //waifu Activity
 // bot.user.setActivity("Husbando Games");
  bot.user.setActivity("boku no pico", {type:"WATCHING"});
});

// Initialize Discord Bot
bot.login(config.token);

//const prefix = "!";


bot.on("message", async (message) => {

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
  message.channel.send(bot.user.avatarURL);
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
}else//Display bot info
if (cmd === `${prefix}botinfo`) {
 let bicon = bot.user.displayAvatarURL;
 let botembed = new Discord.RichEmbed()
 .setDescription("Bot Information")
 .setColor("#15f153")
 .setThumbnail(bicon)
 .setTimestamp(message.createdAt)
 .addField("Bot Name", bot.user.username)
 .addField('Created On',bot.user.createdAt);
 return message.channel.send(botembed);
}else if(cmd === `${prefix}serverinfo`){ //Display server info
  let sicon = message.guild.displayAvatarURL;
  let serverembed = new Discord.RichEmbed()
  .setDescription("Server Information")
  .setColor("#15f153")
  .setThumbnail(sicon)
  .addField("Server name", message.guild.name)
  .addField("Created On", message.guild.createdAt)
  .addField("You joined", message.member.joinedAt)
  .addField("Total Members", message.guild.memberCount);
  return message.channel.send(serverembed);
}else// report users
if (cmd === `${prefix}report`) {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arg1[0]));
  if(!rUser) return message.channel.send("Couldn't find user.");
  let reason = arg1.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Reports")
  .setColor("#15f153")
  .addField("Reported User",`${rUser} wtih ID: ${rUser.id}`)
  .addField("Reported By",`${message.author} wtih ID: ${message.author.id}`)
  .addField("Channel",message.channel)
  .addField("Time",message.channel)
  .addField("Time",message.channel)
  .addField("Reason",reason);

  let reportschannel = message.guild.channels.find(`name`,"reports");
  if(!reportschannel) return message.channel.send("Couldn't find reports channel");

  message.delete().catch(O_o=>{});
  reportschannel.send(reportEmbed);
  return;
}else
if(cmd === `${prefix}kick`){
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arg1[0]));
  if(!kUser) return message.channel.send("Can't find uesr");
  let kReason = arg1.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nope");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked");
  let kickEmbed = new Discord.RichEmbed()
  .setDescription("~Kick~")
  .setColor("#e56b00")
  .addField("Kicked User", `${kUser} with ID ${kUser.ud}`)
  .addField("KickedBy", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Kicked In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", kReason);

  let kickChannel = message.guild.channels.find(`name`, "incidents");
  if(!kickChannel) return message.channel.send("Can't find incidents channel.");
  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);
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
