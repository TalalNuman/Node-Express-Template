const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI
  ? process.env.MONGO_URI
  : "mongodb://localhost:27017/test";

module.exports = async () => {
  await mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};
