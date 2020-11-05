const mongoose = require('mongoose');

const connectDB = (app) => {
  console.log(process.env.MONGO_URI);
  const conn = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  mongoose.connection.on('error', function (err) {
    process.exit(1);
  });
  mongoose.connection.once('open', function () {
    console.log(`MongoDB connected: ${db.host}`.cyan.underline.bold);
    app.emit('connectedToDB');
  });
};

module.exports = connectDB;
