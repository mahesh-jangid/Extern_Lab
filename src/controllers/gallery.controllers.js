const express = require("express");
const fs = require("fs");
const Gallery = require("../models/gallery.models");

const upload = require("../middlewares/uploads");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const gallery = await Gallery.find().lean().exec();

    return res.status(200).send(gallery);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", upload.array("pictures", 5), async (req, res) => {
  try {
    const filePaths = req.files.map((file) => {
      return file.path;
    });

    const gallery = await Gallery.create({
      pictures: filePaths,
      userId: req.body.userId,
    });

    return res.status(200).send(gallery);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
router.delete("/delete/:_id", async (req, res) => {
  try {
    let gallery = await Gallery.findById(req.params._id);

    gallery.pictures.map((file) => {
      fs.unlink(file, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Gallery pictures successfully deleted");
        }
      });
    });

    gallery.delete();

    res.status(200).send(gallery);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = router;
