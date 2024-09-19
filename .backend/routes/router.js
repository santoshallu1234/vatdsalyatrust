var express = require('express');
const { register, login, getUserProfile } = require('../controllers/authController');
const {bookAppointment,getUserAppointments,getTherapistAppointments  } = require('../controllers/appointmentController');
const { insertTherapist, getTherapists, getTherapistById } = require('../controllers/therapistController');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', register);
router.post('/login', login);
router.post('/thereapp',insertTherapist);
router.get('/gettherapist',getTherapists);
router.post('/appoint',bookAppointment);
router.get('/userappoint',getUserAppointments );
router.get('/therapistappoint',getTherapistAppointments);
router.get('/gettherapistById',getTherapistById);

module.exports = router;
