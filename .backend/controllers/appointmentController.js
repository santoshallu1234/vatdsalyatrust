// controllers/appointmentController.js
const Appointment = require('../models/appointmentModel');

// Book an appointment
exports.bookAppointment = async (req, res) => {
  const { therapistId, date } = req.body;

  try {
    const newAppointment = new Appointment({
      //user: req.userId,
      user:"66ea39a10eeb7e093d9eec2f",
      therapist: therapistId,
      date:date,
      status: 'pending',
    });
    await newAppointment.save();

    res.status(201).json(newAppointment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get appointments for the logged-in user
exports.getUserAppointments = async (req, res) => {
    const {userId} = req.body;
    console.log(userId);
  try {
    const appointments = await Appointment.find({ user: userId }).populate('therapist');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all appointments for a specific therapist
exports.getTherapistAppointments = async (req, res) => {
  //const { therapistId } = req.params;
  const { therapistId } = req.body;
  try {
    const appointments = await Appointment.find({ therapist: therapistId }).populate('user');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};
