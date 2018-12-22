const Discord = require("discord.io");
const Winston = require("winston");
const config = require ("./config.json");
const fs = require("fs");

// Configure Winston logger
Winston.remove(Winston.transports.Console);
Winston.add(new Winston.transports.Console, {
  colorize: true
})
Winston.level = "debug";

// Initiate bot
Winston.info("Monika Bot is starting...");
var Monika = new Discord.Client({
  token: config.token,  
  autorun: true,
});

Monika.on("ready", function(event) {
  Winston.info('Connected');
  Winston.info('Logged in as: ');
  Winston.info(Monika.username + '#' + Monika.id);
});

Monika.on("message", function(user, userID, channelID, msg, event) {
  // This is where we will define the command syntax for our bot
  // First off, let's have it listen to messages that starts with '!'
  if (msg.substring(0, 1) == '!') {
    // Split our commands into arguments
    var arguments = msg.substring(1).split(' ');
    // The first argument should be our command's name
    var command = arguments[0];
    
    arguments = arguments.splice(1);
    switch (command) {
      // This is where we will process the command
      // Developer's note: when you develop a new command
      // or update an existing one, please document it in
      // cmdinfo.txt


      // !ping
      case "ping": 
      Monika.sendMessage({
        to: channelID,
        message: "pong!"
      });
      break;

      
      // !commands
      case "commands":
      // Get the information for all commands from a text file
      fs.readFile("./cmdinfo.txt", "utf8", function(err, cmdInfo) {
        if (err) {
          Winston.info("Could not read cmdinfo.txt");
        }
        else {
          // Monika will then tell you about it uwu
          Monika.sendMessage({
            to: channelID,
            message: cmdInfo
          });        
        }
      })    
      break;


      // This is where we will handle undefined commands
      default:
      Monika.sendMessage({
        to: channelID,
        message: "Monika doesn't understand that command. Type '!commands' for a list of available commands uwu."
      });
    }
  }
});