const Discord = require("discord.js");
const client = new Discord.Client();
var logger = require('winston');
//var auth = require('./auth.json');
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
// Initialize Discord Bot
client.login(config.token);

const prefix = "!";
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (message.content.startsWith(prefix + "Bing")) {
    message.channel.send("pong!");
  } else
  if (message.content.startsWith(prefix + "foo")) {
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
});


express()
  .listen(process.env.PORT || 5000, () => console.log(`Listening on ${ PORT }`))
