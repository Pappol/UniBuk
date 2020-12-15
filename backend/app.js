import express from "express";
import morgan from "morgan";
import bodyparser from "body-parser";
import mongoose from "mongoose";

const app = express();

// DB connection setup
mongoose.connect(process.env.MONGO_CONN_STRING,
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);
mongoose.Promise = global.Promise;

// importing routes
import contentsRoutes from './api/routes/contents.js';
import booksRoutes from './api/routes/books.js';
import userRoutes from './api/routes/user.js';
import searchRoutes from './api/routes/search.js';

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);
app.use(bodyparser.json());

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
app.use('/v1/contents', contentsRoutes);
app.use('/v1/books', booksRoutes);
app.use('/v1/users', userRoutes);
app.use('/v1/search', searchRoutes);

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

export default app;