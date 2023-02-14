const connectDB = require("./config/db");
const branchData = require("./branchdata.json");
require("dotenv").config();
const Branch = require("./models/branches");

const populateDB = async () => {
	try {
		// connectDB
		await connectDB(process.env.MONGO_URI);
		await Branch.deleteMany();
		await Branch.create(branchData);
		console.log("Success");
		process.exit(0);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

populateDB();
