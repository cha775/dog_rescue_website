// backend/models/Dog.js
const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  description: { type: String },
  available: { type: Boolean, default: true }
});

const Dog = mongoose.model('Dog', DogSchema);
module.exports = Dog;
