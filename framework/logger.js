let log4js = require('log4js')

log4js.configure({
  appenders: [{
    type: 'console'
  }, {
    type: 'file',
    filename: 'logs/log-file.log',
    categore: 'log-file'
  }],
  'replaceConsole': true,
  'levels': {
    'console': 'ALL'
  }
});

module.exports = log4js.getLogger()