const dotenv = require('dotenv'); // Environment-specific settings
dotenv.config();

const ServerURL = `${process.env.SCHEME}${process.env.CLIENT_DOMAIN}:${process.env.PORT}`;

module.exports = { ServerURL };