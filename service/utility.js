const dotenv = require('dotenv'); // Environment-specific settings
dotenv.config();

const ServerURL = `${process.env.SCHEME}${process.env.CLIENT_DOMAIN}`;

module.exports = { ServerURL };