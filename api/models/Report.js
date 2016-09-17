var mongoose = require('mongoose');

var reportsSchema = mongoose.Schema({
	  date:  Date,
    total_time: String,
    notes: String,
    updatedAt: {
	    type: Date
	  },
   createdAt: {
    type: Date,
    default: new Date()
  }
}, {strict: false});

module.exports = mongoose.model('Report', reportsSchema);;