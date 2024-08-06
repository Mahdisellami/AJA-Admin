const express = require("express");
const router = express.Router();
const moleculeController = require("../controllers/moleculeController");

// Create a new Molecule
router.post("/", moleculeController.createMolecule);

// Get all Molecules
router.get("/", moleculeController.getAllMolecules);

// Get a Molecule by ID
router.get("/:id", moleculeController.getMoleculeById);

// Delete a Molecule by ID
router.delete("/:id", moleculeController.deleteMoleculeById);

// Patch a Molecule by ID
router.patch("/:id", moleculeController.updateMolecule);

// Select best 5 Molecules
router.get("/selectBestFive", moleculeController.selectBestFiveMolecules);

module.exports = router;
