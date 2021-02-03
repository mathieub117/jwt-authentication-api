const mongoose = require('mongoose'); // MongoDB

mongoose.connect('mongodb://mongodb:27017/data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on('error', error => console.log(error) );
mongoose.connection.once('open', function() {
  console.log('MongoDB connection made')
});
mongoose.Promise = global.Promise;