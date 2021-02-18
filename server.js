const dotenv = require('dotenv'); // Environment-specific settings
dotenv.config();
require('./database'); // Init database connection
require('./service/auth'); // Passport strategy

const express = require('express');
const cors = require('cors') // Enable Cross-origin resource sharing, if client makes request outside of this domain
const bodyParser = require('body-parser'); // Parse body request (in our case, JSON data)
const emailService = require('./service/email') // Init email account

const app = express();

/// ************************ CORS ************************
app.use(cors()); // Enable cors support

app.use(bodyParser.json());
emailService.Init()

// Authenticate user route
const userRoute = require('./route/user');
app.use('/user', userRoute);

// User image route
const imageRoute = require('./route/image');
app.use('/user/image', imageRoute);

/// ************************ Validation ************************
const passport = require('passport');
const validateTokenRoute = require('./route/validate');
// Plug in the JWT strategy as a middleware. Call this where login or user info required
app.use('/', passport.authenticate('jwt', {session: false}), validateTokenRoute);


/// ************************ Handle errors ************************
app.use((err, req, res, next) => {
    console.log(`Express caught a next(error): ${err}`);
    return res.status(err.status || 500).send({success: false, error: err});
});


app.listen(process.env.PORT, () => {
    console.log('Server started.')
});