// backend/controllers/volunteerController.js
const Volunteer = require('../models/Volunteer');

exports.apply = async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    const newVolunteer = new Volunteer({ name, email, phone, message });
    await newVolunteer.save();
    res.status(201).json({ msg: 'Thank you for applying to volunteer!' });
  } catch (err) {
    res.status(500).json({ msg: 'Error submitting volunteer application' });
  }
};
