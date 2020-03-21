const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
