// Invoke 'strict' JavaScript mode
'use strict';

var mongoose = require('mongoose'),
Machine = mongoose.model('Machine');

exports.create = function(req, res) {
	var machine = new Machine({
		'name': req.body.name,
		'description': req.body.description,
	});
	machine.save(function(err) {
		if (err) {
			console.log(err);
		} else {
			res.json(machine);
		}
	});
};

exports.list = function(req, res) {
	Machine.find(function(err, machines) {
		if (err) {
		console.log(err);
		} else {
			console.log(machines);
			res.json(machines);
		}
	});
};

exports.delete = function(req, res) {
	Machine.remove({ _id: req.params.machine_id }, function(err) {
    if (!err) {
            console.log('OK');
    }
    else {
            console.log('BAD');
    }
});
};
