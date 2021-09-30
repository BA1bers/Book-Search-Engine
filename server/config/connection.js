const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;

//mongodb+srv://ba1bers:h4mb0rg3r@transaction.rcce9.mongodb.net/googlebooks?retryWrites=true&w=majority
mongodb+srv://ba1bers:h4mb0rg3r@transaction.rcce9.mongodb.net/librarian?retryWrites=true&w=majority