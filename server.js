const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", (req, res) => {
  res.json("Welcome to the User Registration");
});

const PORT = 4000;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server is listen port no..${PORT}`);
});
module.exports = app;
