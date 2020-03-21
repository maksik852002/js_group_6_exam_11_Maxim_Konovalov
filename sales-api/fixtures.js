const mongoose = require("mongoose");
const config = require("./config");
const nanoid = require('nanoid')
const Category = require("./models/Category");
const Product = require("./models/Product");
const User = require("./models/User");


const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();
  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [computers, furniture, cars, clothes] = await Category.create(
    {
      title: "Computers"
    },
    {
      title: "Furniture"
    },
    {
      title: "Cars"
    },
    {
      title: "Clothes"
    }
  );

  const [user, max, test] = await User.create(
    {
      username: "user",
      password: "123",
      name: "Александр",
      phone: "0555-96-89-54",
      token: nanoid()
    },
    {
      username: "max",
      password: "123",
      name: "Максим",
      phone: "0555-96-87-54",
      token: nanoid()
    },
    {
      username: "test",
      password: "123",
      name: "Марина",
      phone: "0554-45-82-74",
      token: nanoid()
    }
  );

  await Product.create(
    {
      title: "HP 15-rb021ur AMD A6-9220 (2.2 GHz-2.5 GHz)",
      price: 10000,
      category: computers,
      user: user,
      description: "Пользовался 3 месяца, отличное состояние, как новый",
      image: "fixtures/notebook.jpg"
    },
    {
      title: "Intel core i7 6700K 4.00 Ghz",
      price: 4000,
      category: computers,
      user: test,
      description:
        "Продам процессор, хотела апгрейдить компьютер, но купила ноутбук",
      image: "fixtures/cpu.jpg"
    },
    {
      title: "Продам пальто фирмы ZARA",
      price: 2500,
      category: clothes,
      user: test,
      description:
        "Продам новое пальто размер 56, заказывала из европы, не подошло по размеру",
      image: "fixtures/palto.jpg"
    },
    {
      title: "Honda Fit 2002 года",
      price: 700000,
      category: cars,
      user: max,
      description: "Комплектация Mugen, красный цвет, пробег 89000км",
      image: "fixtures/honda.jpg"
    },
    {
      title: "Офисный стол",
      price: 700,
      category: furniture,
      user: user,
      description:
        "Почти новый, с замочками, ни одной царапины, цвет отличается от того что на изображении",
      image: "fixtures/stol.jpg"
    }
  );

  mongoose.connection.close();
};

run().catch(e => {
  mongoose.connection.close();
  throw e;
});
