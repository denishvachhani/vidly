const winston = require('winston');
require('express-async-errors');

module.exports = function () {
    winston.add(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'logfile.log', handleExceptions: true }));
    // Unhandled promise rejection
    process.on('unhandledRejection', (reason, promise) => {
        throw reason;
    })
}