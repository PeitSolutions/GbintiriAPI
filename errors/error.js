class CustomErrorAPI extends Error {
	constructor(message, statusCode) {
		super(message, statusCode);
		this.statusCode = statusCode;
	}
}

const createCustomError = (message, statusCode) => {
	return new CustomErrorAPI(message, statusCode);
};

module.exports = { createCustomError, CustomErrorAPI };
