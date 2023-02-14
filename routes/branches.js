const express = require("express");
const router = express.Router();
const { createBranch, getAllBranches, getSingleBranch, deleteBranch, updateBranch } = require("../controllers/branches");

router.route("/").post(createBranch).get(getAllBranches);
router.route("/:id").get(getSingleBranch).delete(deleteBranch).patch(updateBranch);

module.exports = router;
