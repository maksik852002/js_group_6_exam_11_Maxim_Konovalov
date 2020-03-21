const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config");

const products = require("./app/products");
const categories = require("./app/categories");
const users = require("./app/users");

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  app.use("/products", products);
  app.use("/categories", categories);
  app.use("/users", users);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

run().catch(e => {
  console.error(e);
});
