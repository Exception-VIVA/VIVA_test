// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var methodOverride = require('method-override');
// var bodyParser = require('body-parser');

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//const session = require('express-session');

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(session({
//   key: 'sid',
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
//   }
// }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use('/api/user/register', require("./routes/user.register"));
app.use('/api/user/login', require("./routes/user.login"));
app.use('/api/user/profile', require("./routes/user.profile"));
app.use('/api/home', require("./routes/home"));
app.use('/api/search', require("./routes/search"));
app.use('/api/book-list', require("./routes/home"));
app.use('/api/book-list', require("./routes/book-list"));
app.use('/api/incor-note-content', require("./routes/incor-note-content"));

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});