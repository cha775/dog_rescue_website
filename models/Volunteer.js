const mongoose = require('mongoose');

// Define the Volunteer schema
const VolunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String }
});

// Check if the model already exists to avoid OverwriteModelError
const Volunteer = mongoose.models.Volunteer || mongoose.model('Volunteer', VolunteerSchema);

module.exports = Volunteer;
