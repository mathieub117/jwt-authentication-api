require('./database'); // Init database connection
require('./auth/auth'); // Passport strategy

const express = require('express');
const cors = require('cors') // Enable Cross-origin resource sharing, if client makes request outside of this domain
const bodyParser = require('body-parser'); // Parse body request (in our case, JSON data)

const app = express();

/// ************************ CORS ************************
app.use(cors()); // Enable cors support

app.use(bodyParser.json());

// Authenticate route has no prefix
const route = require('./route/route');
app.use('/', route);

/// ************************ Validation ************************
const passport = require('passport');
const validateTokenRoute = require('./route/validate');
// Plug in the JWT strategy as a middleware. Call this where login or user info required
app.use('/', passport.authenticate('jwt', { session: false }), validateTokenRoute);


/// ************************ Handle errors ************************
app.use(function(err, req, res, next) {
  console.log(err)
  res.status(err.status || 500);
  res.json({ success: false, error: err });
});


app.listen(3000, () => {
  console.log('Server started.')
});