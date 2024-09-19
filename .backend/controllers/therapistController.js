// controllers/therapistController.js
const Therapist = require('../models/therapistModel');


// Add a new therapist (admin only)
exports.insertTherapist = async (req, res) => {
  const { name, specialization, experience, availability } = req.body;
  console.log(name);
  console.log(Therapist);
  try {
    const newTherapist = new Therapist({ name, specialization, experience, availability });
    console.log(newTherapist);
     await newTherapist.save();
    
    res.status(201).json(newTherapist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

/*
 {
    "name": "Dr. Emily Thompson",
    "specialization": "Cognitive Behavioral Therapy",
    "experience": 8,
    "availability": [
      { "day": "Monday", "timeSlots": ["09:00-10:00", "11:00-12:00"] },
      { "day": "Wednesday", "timeSlots": ["14:00-15:00", "16:00-17:00"] },
      { "day": "Friday", "timeSlots": ["10:00-11:00", "13:00-14:00"] }
    ]
  } */
// Get all therapists
exports.getTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.find();
    res.status(200).json(therapists);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get therapist by ID
exports.getTherapistById = async (req, res) => {
 // const { therapistId } = req.params;
 const { therapistId } = req.body;
  try {
    const therapist = await Therapist.findById(therapistId);
    if (!therapist) return res.status(404).json({ msg: 'Therapist not found' });

    res.status(200).json(therapist);
  } catch (error) {
    res.status(500).json({ msg: 'Server error',error :error});
  }
};
