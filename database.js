const dotenv = require('dotenv'); // Environment-specific settings
dotenv.config();
const mongoose = require('mongoose'); // MongoDB

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
//mongoose.connection.on('error', error => console.log(error) );
mongoose.connection.once('open', function() {
  console.log('MongoDB connection made')
});
mongoose.Promise = global.Promise;