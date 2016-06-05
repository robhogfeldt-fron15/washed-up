// Invoke 'strict' JavaScript mode
'use strict';

var mongoose = require('mongoose'),
User = mongoose.model('User');



exports.list = function(req, res) {
	User.find(function(err, users) {
		if (err) {
		console.log(err);
		} else {
			console.log(users);
			res.json(users);
		}
	});
};
