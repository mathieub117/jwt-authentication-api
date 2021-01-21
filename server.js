const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const UserModel = require('./model/model');

mongoose.connect('mongodb://mongodb:27017/data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on('error', error => console.log(error) );
mongoose.connection.once('open', function() {
  // we're connected!
  console.log('MongoDB connection made')
});
mongoose.Promise = global.Promise;

require('./auth/auth');

const route = require('./route/route');
const validateTokenRoute = require('./route/validate');

const app = express();

app.use(bodyParser.json());

app.use('/', route);

// Plug in the JWT strategy as a middleware. Call this where login or user info required
app.use('/', passport.authenticate('jwt', { session: false }), validateTokenRoute);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ success: false, error: err });
});

app.listen(3000, () => {
  console.log('Server started.')
});