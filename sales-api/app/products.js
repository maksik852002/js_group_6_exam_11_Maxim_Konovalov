const path = require("path");
const express = require("express");
const multer = require("multer");
const nanoid = require("nanoid");

const auth = require("../authMiddleware");
const config = require("../config");

const Product = require("../models/Product");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
const router = express.Router();

router.get("/", async (req, res) => {
  let products = [];
  try {
    if (req.query.category) {
      products = await Product.find({
        category: req.query.category
      }).populate("user", ["name", "phone"]);
    } else {
      products = await Product.find().populate("user", ["name", "phone"]);
    }
    return res.send(products);
  } catch (e) {
    return res.status(404).send({ message: "Not found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("user");
    return res.send(product);
  } catch (e) {
    return res.status(404).send({ message: "Not found" });
  }
});

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    req.body.user = req.user._id;
    const product = new Product(req.body);
    if (req.file) {
      product.image = req.file.filename;
    }
    await product.save();
    res.send({ id: product._id });
  } catch (e) {
    res.status(422).send(e);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    req.body.user = req.user._id;
    const del = await Product.findOneAndRemove({
      _id: req.params.id,
      user: req.user._id
    });
    if (!del) {
      return res
        .status(403)
        .send({ message: "You don't have privileges for this operation" });
    }
    return res.send({ message: `${req.params.id} removed` });
  } catch (e) {
    return res.status(422).send(e);
  }
});

module.exports = router;
