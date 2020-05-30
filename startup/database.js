const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function() {
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useCreateIndex', true);
    mongoose.connect(config.get('db'), { useNewUrlParser: true })
    .then(() => winston.info(`Connected to ${config.get('db')}...`))
}