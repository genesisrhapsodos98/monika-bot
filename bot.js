const Discord = require('discord.io');
const fs = require('fs');
const config = require('./config.json');
const Helper = require('./helpers');
const logger = require('./logger');
const MonikaRespond = require('./monika_respond');

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
  MonikaRespond.setAuthority(Monika);
});

Monika.on('message', MonikaRespond.respond);
