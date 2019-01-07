const Discord = require('discord.io');
const Winston = require('winston');
const fs = require('fs');
const config = require('./config.json');

// Configure Winston logger
const logger = Winston.createLogger({
  format: Winston.format.combine(
    Winston.format.colorize(),
    Winston.format.timestamp(),
    Winston.format.prettyPrint(),
    Winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [new Winston.transports.Console()],
});
Winston.addColors({
  silly: 'magenta',
  debug: 'blue',
  verbose: 'cyan',
  info: 'green',
  warn: 'yellow',
  error: 'red',
});
Winston.level = 'debug';

// Initiate bot
logger.info('Monika is coming to life...');
const Monika = new Discord.Client({
  token: config.token,
  autorun: true,
});

Monika.on('ready', () => {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(` - ${Monika.username} - ${Monika.id}`);
});

function getPrefixStringFromUser(userID) {
  let string;
  let existing = false;
  let at = -1;
  logger.info(`Attempting to get prefix string from user: ${userID}`);
  const loadedPrefixList = config.prefixList;
  if (loadedPrefixList && loadedPrefixList.length > 0) {
    logger.info('Prefix list found, attempt to find existing prefix...');
    loadedPrefixList.forEach((loadedPrefix, index) => {
      if (loadedPrefix.user === userID) {
        logger.info(`Prefix found: ${loadedPrefix.prefix}`);
        string = loadedPrefix.prefix;
        existing = true;
        at = index;
      } else {
        logger.info('Prefix not found');
        string = '';
      }
    });
  } else {
    logger.info('Prefix list not found');
    string = '';
  }
  return { string, existing, at };
}

function saveConfig() {
  logger.info('Attempting to save config.json...');
  const cfgJSON = JSON.stringify(config);
  fs.writeFile('./config.json', cfgJSON, 'utf8', (err) => {
    if (err) {
      logger.info('Could not save config.json.');
    } else {
      logger.info('Successfully saved config.json.');
    }
  });
}

Monika.on('message', (user, userID, channelID, msg) => {
  // Ignore messages posted by the bot itself
  if (userID !== Monika.id) {
  // This is where we will define the command syntax for our bot
    // First off, let's prepare some config variables
    // const serverID = Monika.channels[channelID].guild_id;
    const MonikaPrefixObj = getPrefixStringFromUser(userID);
    let MonikaPrefix = MonikaPrefixObj.string;
    // Then, let's have it listen to messages that starts with '!'
    if (msg.search(`${MonikaPrefix}!`) === 0 || msg.substring(0, 1) === '!') {
      // Find the position of our command (i.e. everything after '!')
      const cmdPos = msg.indexOf('!') + 1;
      // Split our commands into arguments
      let args = msg.substring(cmdPos).split(' ');
      // The first argument should be our command's name
      const command = args[0];
      logger.info(`Monika received a command: !${command}`);

      args = args.splice(1);
      switch (command) {
        // This is where we will process the command
        // Developer's note: when you develop a new command
        // or update an existing one, please document it in
        // cmdinfo.txt

        // !ping
        case 'ping':
          Monika.sendMessage({
            to: channelID,
            message: 'pong!',
          });
          break;


        // !commands
        case 'commands':
        // Get the information for all commands from a text file
          fs.readFile('./cmdinfo.txt', 'utf8', (err, cmdInfo) => {
            if (err) {
              logger.info('!ping: Could not read cmdinfo.txt.');
            } else {
            // Monika will then tell you about it uwu
              Monika.sendMessage({
                to: channelID,
                message: cmdInfo,
              });
            }
          });
          break;

        case 'setprefix': {
          // Set the prefix
          const thisUserPrefix = { user: userID, prefix: args[0].toString() };
          // TODO: validate input


          if (thisUserPrefix.prefix !== MonikaPrefix) {
            MonikaPrefix = thisUserPrefix.prefix;
            if (MonikaPrefixObj.existing) {
              // Overwrite existing prefix
              logger.info('Existing prefix found, overwriting...');
              config.prefixList[MonikaPrefixObj.at] = thisUserPrefix;
            } else {
              logger.info('Creating new prefix...');
              config.prefixList.push(thisUserPrefix);
            }
            saveConfig();
          }

          Monika.sendMessage({
            to: channelID,
            message: `Set prefix to: \`${MonikaPrefix}\`.`,
          });
          break;
        }

        case 'prefix': {
          Monika.sendMessage({
            to: channelID,
            message: `Current prefix: \`${MonikaPrefix}\``,
          });
          break;
        }

        case 'uwu': {
          if (!args[0]) {
            logger.info('!uwu: insufficient arguments');
            Monika.sendMessage({
              to: channelID,
              message: 'Insufficient argument to execute this command.',
            });
            break;
          }
          switch (args[0].toString().toLowerCase()) {
            case 'true':
              logger.info('Monika will now uwu.');
              config.uwu = true;
              Monika.sendMessage({
                to: channelID,
                message: 'Monika will now uwu.',
              });
              break;
            case 'false':
              logger.info('Monika will stop uwu-ing.');
              config.uwu = false;
              Monika.sendMessage({
                to: channelID,
                message: 'Monika will stop uwu-ing.',
              });
              break;
            default:
              logger.info("!uwu: Monika didn't understand that parameter");
              Monika.sendMessage({
                to: channelID,
                message: `'${args[0]}' is not a valid argument for this command. The correct syntax is '!uwu true/false'`,
              });
          }
          // Update config file
          saveConfig();
          break;
        }

        // This is where we will handle undefined commands
        default:
          logger.info(" - Monika didn't understand that command.");
          Monika.sendMessage({
            to: channelID,
            message: "Monika doesn't understand that command. Type '!commands' for a list of available commands uwu.",
          });
      }
    } else if (config.uwu) { // any message that doesn't start with '!' or '<prefix>!'
      // Monika would still response to whoever calls her name uwu
      if (
        // Message contains a variation of 'monika'
        (msg.search(/m[ \-.]{0,2}o[ \-.]{0,2}n[ \-.]{0,2}i[ \-.]{0,2}k[ -.]{0,2}a/i) !== -1
        // or Monika was mentioned
        || msg.search(`<@${Monika.id}>`) !== -1)
      ) {
        logger.info('Monika was summoned');
        Monika.sendMessage({
          to: channelID,
          message: 'D-did you call for Monika? uwu',
        });
      }
    }
  }  
});
