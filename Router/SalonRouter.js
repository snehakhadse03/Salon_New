const express = require('express');
 
const router = express.Router();

const user_request = require('../Controller/User');
const employee_request = require('../Controller/Employee');

 const auth = require('../Middleware/auth')


router.post('/signup', user_request.SignUp);
router.post('/login',user_request.LogIn);
// router.post('/logout',user_request.LogOut)
 router.post('/forgotpassword',user_request.ForgotPassword);
// router.post('/appointment',user_request.addAppointment);

// router.get('/allemployee',employee_request.AllListOfEmployee)
router.post('/addemployee',employee_request.AddEmployee)
router.post('/sendmail',user_request.sendEmail)

 module.exports = router;