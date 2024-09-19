// controllers/authController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
    
  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
   if (user) return res.status(400).json({ msg: 'User already exists' });
    // Create new user
     user = new User({ name, email, password, role });
    await user.save();
    // Create JWT token
    const payload = { userId: user.id, role: user.role };
    console.log(payload)
    const token = jwt.sign(payload, "sshnnnnnn", { expiresIn: '1h' });
    res.status(201).json({ payload });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' ,error:error});
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
   console.log("meee");
  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    // Create JWT token
    const payload = { userId: user.id, role: user.role };
    console.log(payload);
   const token = jwt.sign(payload, "sshnnnnnn", { expiresIn: '1h' });
    console.log(token);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};
