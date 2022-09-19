const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    profilePic: { type: String, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// userSchema.pre("save", function (next) {
//   const deletefileRecursive = function (directoryPath) {
//     if (fs.existsSync(directoryPath)) {
//       fs.readdirSync(directoryPath).forEach((file, index) => {
//         const curPath = path.join(directoryPath, file);
//         if (fs.lstatSync(curPath).isDirectory()) {
//           // recurse
//           deletefileRecursive(curPath);
//         } else {
//           // delete file
//           fs.unlinkSync(curPath);
//         }
//       });
//       fs.rmdirSync(directoryPath);
//     }
//   };

//   return next();
// });

module.exports = mongoose.model("user", userSchema);
