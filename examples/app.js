const express = require('express')
const debug = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan')
const helmet = require('helmet')
const logger = require('./middleware/logger');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const home = require('./routes/home');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/vidly' , { useNewUrlParser: true })
.then(() => console.log('Connected to mongoDB...'))
.catch(err => console.log('could not connect to mongoDB..'))


const app = express()
const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on port! ${port}`));

// Route configuration
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/customers', customers);
app.use('/api/rentals', rentals);
app.use('/', home);

// Template engine - here we are using pug
app.set('view engine', 'pug');
app.set('views', './views');

// to check which environment is it
console.log(`NODE_ENV`,process.env.NODE_ENV)
console.log(`app`,app.get('env'))

// Middleware function
app.use(express.json());
app.use(express.static('public'));
app.use(helmet());
app.use(logger)


//Configuration - you can set environemnt variable with export varibalename = value
// console.log('Application name ' + config.get('name'));
// console.log('mail server ' + config.get('mail.host'));
// console.log('Mail password ' + config.get('mail.password'));

// Db work...
dbDebugger('DB deguger enabled');


if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled....')
}

app.use(function(req, res, next) {
    console.log('Authenticating...');
    next()
})