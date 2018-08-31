const Discord = require("discord.js");
const client = new Discord.Client();
var logger = require('winston');
//var auth = require('./auth.json');
const fs = require("fs")
const config = require("./config.json");
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const randomCat = require("./randomcat.js");
console.log( randomCat() );
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
client.login(config.token);

//const prefix = "!";
client.on("message", (message) => {
  /*
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (message.content.startsWith(prefix + "Bing")) {
    message.channel.send("pong!");
  } else
  if (message.content.startsWith(prefix + "foo")) {
    message.channel.send("bar!");
  }
*/

if (!message.content.startsWith(config.prefix) || message.author.bot) return;
if (message.content.startsWith(config.prefix + "ping")) {
  message.channel.send("pong pong!");
} else
if (message.content.startsWith(config.prefix + "foo")) {
  message.channel.send("bar!");
}
  
if(message.content.startsWith(config.prefix + "prefix")) {
    // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
    let newPrefix = message.content.split(" ").slice(1, 2)[0];
    console.log(newPrefix);
    // change the configuration in memory
    config.prefix = newPrefix;
    // Now we have to save the file.
    fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
}


const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
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
