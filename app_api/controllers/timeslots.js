'use strict';

var mongoose = require('mongoose'),
	Timeslot = mongoose.model('Timeslot');

exports.create = function(req, res) {

	var timeslot = new Timeslot(req.body);

	timeslot.save(function(err) {
		if (err) {
			console.log(err);
		} else {

			res.json(timeslot);
		}
	});
};


exports.list = function(req, res) {
	Timeslot.find(function(err, timeslots) {
		if (err) {
		console.log(err);
		} else {
			res.json(timeslots);
		}
	});
};

exports.getByMachine = function(req, res) {
	console.log(req.params);
	Timeslot.find({'machineId' : req.params.machineId }, function(err, timeslots) {
		if (err) {
		console.log(err);
		} else {
			res.json(timeslots);
		}
	});
};
