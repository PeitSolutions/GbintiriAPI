const mongoose = require("mongoose");

const branchSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "name cannot be null"],
		maxLength: 250,
	},
	location: {
		type: String,
		required: [true, "location cannot be null"],
		maxLength: 50,
	},
	district: {
		type: String,
		required: [true, "required field"],
		maxLength: 50,
	},
	region: {
		type: String,
		required: [true, "required field"],
		maxLength: 50,
	},

	contactNumber: {
		type: String,
		default: null,
		maxLength: 30,
	},
	GPSAddress: {
		type: String,
		default: null,
	},
});

module.exports = mongoose.model("branches", branchSchema);
