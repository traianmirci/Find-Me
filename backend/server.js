const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
//dev
const cors = require('cors');

//load env vars
dotenv.config({ path: `./backend/config/.env.${process.env.NODE_ENV}` });

const app = express();

//dev -- cors
app.use(cors());

// Connect to db
connectDB(app);

// Route files
const user = require('./routes/user');
const auth = require('./routes/auth');
const link = require('./routes/link');

//Body parser
app.use(express.json());
// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Cookie
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  maxRequest: 100,
});
// TODO: app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// File upload
app.use(fileupload());
// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/api/v1/user', user);
app.use('/api/v1/auth', auth);
app.use('/api/v1/link', link);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.on('connectedToDB', function () {
  const server = app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT} `.yellow
        .bold
    )
  );
  app.emit('ready');
});

// Handle unhandled promis rejections
process.on('unhandledRejection', (reason, promise) => {
  console.log(`Error: ${reason.stack || reason.message || reason}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});

module.exports = app;
