const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('MongoDB Connected');
    await mongoose.connect("mongodb+srv://santoshallu1234:9588799240@cluster0.ie9p5.mongodb.net/therapy");
   
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;