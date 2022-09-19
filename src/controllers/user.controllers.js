const express = require("express");
const router = express.Router();

const fs = require("fs");

const User = require("../models/user.models.js");

const upload = require("../middlewares/uploads.js");

router.get("", async (req, res) => {
  try {
    const user = await User.find().lean().exec();

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", upload.single("profilePic"), async (req, res) => {
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      profilePic: req.file.path,
    });
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.patch("/update/:_id", upload.single("profilePic"), async (req, res) => {
  try {
    const user = await User.findById(req.params._id);

    fs.unlink(user.profilePic, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("user profilePic updated");
      }
    });

    updateduser = await User.findByIdAndUpdate(req.params._id, {
      profilePic: req.file.path,
    });

    return res.status(200).send(updateduser);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.delete("/delete/:_id", async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    console.log(user);

    fs.unlink(user.profilePic, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("user profilePic deleted");
      }
    });

    user.delete();

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
