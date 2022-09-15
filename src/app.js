const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");

// Configure ENV
require("dotenv").config();

// Initialize express app
const app = express();

// connect to database
require("./config/db")();

// Models
require("./models");

const jwtStrategy = require("./config/passport");

// For Header Security
app.use(helmet());

// Body Parser
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// XXS Protection & Sanitization
app.use(xss());
app.use(mongoSanitize());

// enabling all CORS
app.use(cors());
app.options("*", cors());

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);
require("./config/passport")(passport);

//Routes
app.use("/api/", require("./routes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT ? process.env.PORT : 5000;

app.listen(port, () => {
  console.log(`Listening to Port: ${port}`);
});
