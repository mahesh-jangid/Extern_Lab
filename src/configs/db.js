const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://MaheshJ:1234@cluster0.ecrkt.mongodb.net/Extern_Labs"
  );
};
