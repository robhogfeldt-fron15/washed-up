

var mongoose = require('mongoose');



var machineSchema = new mongoose.Schema({
  name: {
      type: String,
      default: ''
  },
  description: {
      type: String,
      default: ''
  }
});



mongoose.model('Machine', machineSchema);
