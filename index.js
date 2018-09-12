const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
var logger = require('winston');
const fs = require("fs")
const config = require("./config.json");
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
bot.commands = new Discord.Collection();

fs.readdir("./commands/",(err, file)=> {
  if(err) console.log(err);

  let jsfile = file.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  jsfile.forEach((f, i) => {
      let props = require(`./commands/${f}`);
      bot.commands.set(props.help.name, props);
      console.log(bot.commands);
  });
})

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

let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let arg1 = messageArray.slice(1);
let prefix = config.prefix;

let commandfile = bot.commands.get(cmd.slice(prefix.length));
   if(commandfile) commandfile.run(bot,message,arg1);
  
});


express()
  .listen(process.env.PORT || 5000, () => console.log(`Listening on ${ PORT }`))


  
/*
show channel type
console.log(message.channel.type);
show channel name
console.log(message.channel.name);
/ console.log(message.channel.type);
 */