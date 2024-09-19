// models/Therapist.js
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://santoshallu1234:9588799240@cluster0.ie9p5.mongodb.net/therapy");
   
const TherapistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  availability: [{ day: String, timeSlots: [String] }]
});

module.exports = mongoose.model('Therapist', TherapistSchema);
