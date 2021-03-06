const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
// create express app
const app = express();
app.use(cors());
// Setup server port
const port = process.env.PORT || 4000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// Configuring the database
const dbConfig = require("./config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database.", err);
    process.exit();
  });
// define a root/default route
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// Require Users routes
const userRoutes = require("./src/routes/user.routes");
// using as middleware
app.use("/api/users", userRoutes);

// Require Users routes
const homeRoutes = require("./src/routes/home.routes");
// using as middleware
app.use("/api/homes", homeRoutes);

// listen for requests
app.listen(port, () => {
  console.log(`Node server is listening on port ${port}`);
});
