const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useCreateIndex', true);
    mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
    .then(() => winston.info('Connected to MongoDB...'))
}