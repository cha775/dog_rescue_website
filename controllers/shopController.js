// backend/controllers/shopController.js
const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching products' });
  }
};

exports.addProduct = async (req, res) => {
  const { name, description, price, image, category } = req.body;
  try {
    const newProduct = new Product({ name, description, price, image, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ msg: 'Error adding product' });
  }
};
