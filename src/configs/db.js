const mongoose = require("mongoose");
require("dotenv").config();
module.exports = () => {
  return mongoose.connect(process.env.MONGO_URI, {
    maxIdleTimeMS: 80000,
    serverSelectionTimeoutMS: 80000,
    socketTimeoutMS: 0,
    connectTimeoutMS: 0,
  });
};
