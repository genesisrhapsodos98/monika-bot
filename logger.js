const Winston = require('winston');

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

module.exports = logger;
