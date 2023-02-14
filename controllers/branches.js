const Branch = require("../models/branches");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/error");

const createBranch = asyncWrapper(async (req, res) => {
	const branchData = req.body;
	const branch = await Branch.create(branchData);
	res.status(201).json({ branch });
});

const getAllBranches = asyncWrapper(async (req, res) => {
	const queryObject = {};
	const { region, name, district, sort, fields } = req.query;
	if (region) {
		queryObject.region = { $regex: region, $options: "i" };
	}

	if (name) {
		queryObject.name = { $regex: name, $options: "i" };
	}

	if (district) {
		queryObject.district = { $regex: district, $options: "i" };
	}

	let result = Branch.find(queryObject);

	// sort branches
	if (sort) {
		const sortedList = sort.split(",").join(" ");
		result = result.sort(sortedList);
	} else {
		result = result.sort("name");
	}

	// select some fields

	if (fields) {
		const fieldsList = fields.split(",").join(" ");
		result = result.select(fieldsList);
	}

	// limits, pagination and skip

	const limit = Number(req.query.limit) || 10;
	const page = Number(req.query.page) || 1;
	const skip = (page - 1) * limit;
	result = result.skip(skip).limit(limit);

	const branches = await result;
	console.log(queryObject);
	res.status(200).json({ status: "success", data: { branches }, nHbits: branches.length });
});

const getSingleBranch = asyncWrapper(async (req, res, next) => {
	const { id: branchID } = req.params;
	const branch = await Branch.findOne({ _id: branchID });
	if (!branch) {
		return next(createCustomError(`No Resource Found with id: ${branchID}`, 404));
	}
	res.status(200).json({ status: "success", data: branch });
});

const deleteBranch = asyncWrapper(async (req, res, next) => {
	const { id: branchID } = req.params;
	const branch = await Branch.findOneAndDelete({ _id: branchID });
	!branch ? next(createCustomError(`No Resource Found with id: ${branchID}`, 404)) : res.status(200).json({ status: "success", data: branch });
});

const updateBranch = asyncWrapper(async (req, res, next) => {
	const { id: branchID } = req.params;
	const branch = await Branch.findOneAndUpdate({ _id: branchID }, req.body, {
		new: true,
		runValidators: true,
	});
	!branch ? next(createCustomError(`No Resource Found with id: ${branchID}`, 404)) : res.status(200).json({ status: "success", data: branch });
});

module.exports = { createBranch, getAllBranches, getSingleBranch, deleteBranch, updateBranch };
