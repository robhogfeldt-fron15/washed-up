var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlMachines = require('../controllers/machines');
var ctrlUsers = require('../controllers/users');
var ctrlTimeslots = require('../controllers/timeslots');


// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// machines
router.get('/machines', ctrlMachines.list);
router.post('/machines', ctrlMachines.create);
router.delete('/machines/:machine_id', ctrlMachines.delete);

// timeslots
router.get('/timeslots', ctrlTimeslots.list);
router.post('/timeslots', ctrlTimeslots.create);


// users
router.get('/users', ctrlUsers.list);



// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/logout', ctrlAuth.logout);

module.exports = router;
