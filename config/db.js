const mongoose = require("mongoose");

const databaseServer = (url) => {
	mongoose.set("strictQuery", false);
	return mongoose
		.connect(url)
		.then(() => {
			console.log("connected to database server");
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = databaseServer;
