const { CustomErrorAPI } = require("../errors/error");

const customErrorHandler = (err, req, res, next) => {
	if (err instanceof CustomErrorAPI) {
		return res.status(err.statusCode).json({ success: false, message: err.message });
	}
	res.status(500).json({ message: "Something went wrong, try again later" });
};

module.exports = customErrorHandler;
