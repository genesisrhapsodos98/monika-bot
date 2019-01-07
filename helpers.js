const fs = require('fs');
const config = require('./config.json');
const logger = require('./logger');

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

module.exports = {
  getPrefixStringFromUser,
  saveConfig,
  logger,
};
