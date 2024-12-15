const express = require("express");
const Dog = require('../models/dog'); // Ensure correct path and file name


const router = express.Router();

router.post("/rescue", async (req, res) => {
  try {
    const dog = new Dog(req.body);
    await dog.save();
    res.status(201).json({ message: "Dog details submitted for approval" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/adoptable", async (req, res) => {
  try {
    const dogs = await Dog.find({ isApproved: true });
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/approve/:id", async (req, res) => {
  try {
    await Dog.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.json({ message: "Dog approved for adoption" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
