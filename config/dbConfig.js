const mongoose = require("mongoose");
require("dotenv").config();

const dburl = process.env.MONGO_DB_URL;

exports.databaseConnection = () => {
  mongoose.Promise = global.Promise;
  mongoose
    .connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connect..");
    })
    .catch((error) => {
      console.error(`Database Connection Error:- ${error}`);
      process.exit();
    });
};
