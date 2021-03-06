const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');

const index = require('./routes/index');
const login = require('./routes/login');
const users = require('./routes/users');
const categories = require('./routes/categories');
const services = require('./routes/services');
const packages = require('./routes/packages');
const customers = require('./routes/customers');

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/login', login);
app.use('/users', users);
app.use('/categories', categories);
app.use('/services', services);
app.use('/packages', packages);
app.use('/customers', customers);

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
