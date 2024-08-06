const express = require("express");
const router = express.Router();
const moleculeController = require("../controllers/moleculeController");

router.get("/selectBestFive", moleculeController.selectBestFiveMolecules);

module.exports = router;
