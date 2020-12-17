const mongoose = require("mongoose");

// Mongo connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

// Mongoose connection object
const db = mongoose.connection;

// Set up an event listener that will fire once the connection opens for the DB
// Log to the terminal what host and port we are on.
db.once('open', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})

db.on('error', (error) => {
    console.log(`Datatbase error \n ${error}`)
});

// Example of another way to export
// const User = require('./User');
// module.exports = User

module.exports.User = require('./User')