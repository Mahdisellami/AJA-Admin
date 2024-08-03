const moleculeService = require("../services/moleculeService");

const createMolecule = async (req, res) => {
  try {
    const newMolecule = await moleculeService.createMolecule(req.body);
    res.status(201).json(newMolecule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllMolecules = async (req, res) => {
  try {
    const molecules = await moleculeService.getAllMolecules();
    res.status(200).json(molecules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMoleculeById = async (req, res) => {
  try {
    const molecule = await moleculeService.getMoleculeById(req.params.id);
    res.status(200).json(molecule);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateMolecule = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const molecule = await Molecule.findByIdAnd;
    Update(id, updates, { new: true });

    if (!molecule) {
      return res.status(404).json({ message: "Molecule not found" });
    }

    res.status(200).json(molecule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMoleculeById = async (req, res) => {
  try {
    await moleculeService.deleteMoleculeById(req.params.id);
    res.status(200).json({ message: "Molecule deleted" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  createMolecule,
  getAllMolecules,
  getMoleculeById,
  updateMolecule,
  deleteMoleculeById,
};
