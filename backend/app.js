const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require('fs');
const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");
const connectDB = require("./config/database");
const cors = require('cors')
const passport = require("passport")
const bodyParser = require('body-parser');
const session = require('express-session')
app.use(cors())

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

connectDB()
//Body Parsing

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

app.use(session({
  // store: new FileStore(fileStoreOptions),
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 3600000
  }
}))
require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next();
})
app.get('/', (req, res) => {
  res.send("GET Request Called")
})

app.use("/api", apiRoutes);
app.use('/auth', authRoutes)
//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
