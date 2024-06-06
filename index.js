////////////// importing modules
const express = require("express"); // imports express.js
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express(); // defining the app
//////////using mongo db
mongoose.connect("mongodb://localhost:27017/TheBestDB");
const dataSchema = new mongoose.Schema({
  name: { type: String },
  desc: { type: String },
  userID: { type: String },
});
const Data = mongoose.model("data", dataSchema);
////////// using middlewares
app.use(bodyParser.urlencoded({ extended: true }));
////////////// routes
app.get("/", (req, res) => {
  res.send(`<form action="/" method="post">
    <input type="text" name="name">
    <input type="text" name="desc">
    <input type="text" name="userID">
    <button type="submit">Submit</button>
  </form>`);
  console.log(req.url);
});
app.get("/data", (req, res) => {
  Data.find().then((data) => {
    res.send(data);
  });
});
app.post("/", (req, res) => {
  const newData = new Data({
    name: req.body.name,
    desc: req.body.desc,
    userID: req.body.userID,
  });
  newData.save().then(() => {
    res.send("Data Saved success fully");
    console.log(req.body);
  });
});
//////////// listening on the port
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
