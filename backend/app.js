const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// DB connection setup
mongoose.connect(`mongodb+srv://dbadmin:${process.env.MONGO_ATLAS_PW}@cluster0.lgrig.mongodb.net/${process.env.MONGO_ATLAS_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);
mongoose.Promise = global.Promise;

// importing routes
const contentsRoutes = require('./api/routes/contents');
const booksRoutes = require('./api/routes/books');
const userRoutes = require('./api/routes/user');

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// middleware to prevent CORS errors.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// main routes
app.use('/contents', contentsRoutes);
app.use('/books', booksRoutes);
app.use('/user', userRoutes);

// default route
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// generic error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;