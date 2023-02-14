const express = require("express");
const app = express();
const db = require("./config/db");
require("dotenv").config();
const branchRoutes = require("./routes/branches");
const routeNotFound = require("./middleware/not-found");
const customErrorHandler = require("./middleware/error-handler");

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URI;

// middleware

app.use(express.json());

//routes
app.use("/api/v1/branches", branchRoutes);
app.use(routeNotFound);
app.use(customErrorHandler);

const startServer = async () => {
	try {
		await db(MONGO_URL);
		app.listen(PORT, () => {
			console.log(`App is running at http://localhost:${PORT}`);
		});
	} catch (err) {
		console.log(err);
	}
};

startServer();
