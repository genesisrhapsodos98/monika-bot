const Discord = require("discord.io");
const Winston = require("winston");
const config = require ("./config.json");
const fs = require("fs");

// Configure Winston logger
var logger = Winston.createLogger({
  format: Winston.format.combine(
    Winston.format.colorize(),
    Winston.format.timestamp(),
    Winston.format.prettyPrint(),
    Winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new Winston.transports.Console()]
})
Winston.addColors({
  silly: 'magenta',
  debug: 'blue',
  verbose: 'cyan',
  info: 'green',
  warn: 'yellow',
  error: 'red'
});
Winston.level = "debug";

// Initiate bot
logger.info("Monika is coming to life...");
var MonikaPrefix = config.prefix;
var Monika = new Discord.Client({
  token: config.token,  
  autorun: true
});

Monika.on("ready", function(event) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(' - ' + Monika.username + ' - ' + Monika.id);
});

Monika.on("message", function(user, userID, channelID, msg, event) {
  // This is where we will define the command syntax for our bot
  // First off, let's have it listen to messages that starts with '!'
  if (msg.search(MonikaPrefix + '!') == 0 || msg.substring(0, 1) == '!') {
    logger.info("Monika received a command");
    // Find the position of our command (i.e. everything after '!')
    var cmdPos = msg.indexOf('!') + 1;
    // Split our commands into arguments
    var arguments = msg.substring(cmdPos).split(' ');
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
          logger.info("!ping: Could not read cmdinfo.txt.");
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

      case "setprefix":
      // Set the prefix
      MonikaPrefix = arguments[0].toString();
      config.prefix = arguments[0].toString();
      // and save it back to config.json
      var cfgJSON = JSON.stringify(config);
      fs.writeFile("./config.json", cfgJSON, "utf8", function(err) {
        if (err) {
          logger.info("!setprefix: Could not save config.json.");
        }
      });
      break;


      // This is where we will handle undefined commands
      default:
      logger.info(" - Monika didn't understand that command.");
      Monika.sendMessage({
        to: channelID,
        message: "Monika doesn't understand that command. Type '!commands' for a list of available commands uwu."
      });
    }
  } else { // any message that doesn't start with '!'
    // Monika would still response to whoever calls her name uwu    
    if (msg.search(/m[ \-.]{0,2}o[ \-.]{0,2}n[ \-.]{0,2}i[ \-.]{0,2}k[ -.]{0,2}a/i) != -1 && userID != Monika.id) {
      logger.info("Monika was summoned");
      Monika.sendMessage({
        to: channelID,
        message: "D-did you call for Monika? uwu"
      });
    }
  }
});