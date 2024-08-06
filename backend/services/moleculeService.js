const Molecule = require("../models/molecule");

const createMolecule = async (data) => {
  const newMolecule = new Molecule(data);
  await newMolecule.save();
  return newMolecule;
};

const getAllMolecules = async () => {
  const molecules = await Molecule.find();
  return molecules;
};

const getMoleculeById = async (id) => {
  const molecule = await Molecule.findById(id);
  if (!molecule) {
    throw new Error("Molecule not found");
  }
  return molecule;
};

const updateMoleculeById = async (id, data) => {
  const molecule = await Molecule.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!molecule) {
    throw new Error("Molecule not found");
  }
  return molecule;
};

const deleteMoleculeById = async (id) => {
  const molecule = await Molecule.findByIdAndDelete(id);
  if (!molecule) {
    throw new Error("Molecule not found");
  }
  return molecule;
};

const selectBestFiveMolecules = async () => {
  const selectedMolecules = [];
  const molecules = await Molecule.find();
  if (!molecules) {
    throw new Error("Molecule not found");
  }
  // Sort by priority, then score (descending)
  molecules.sort((a, b) => (a.priority - b.priority) || (b.score - a.score));

  // Select first molecule of priority 1
  const priorityOneMolecules = molecules.filter(m => m.priority === 1);
  if (priorityOneMolecules.length > 0) {
    selectedMolecules.push(priorityOneMolecules[0]);
  }
  const currentLength = selectedMolecules.length

  // Randomly select remaining molecules from priority 2 (or higher)
  const priorityTwoMolecules = molecules.filter(m => m.priority === 2);
  for (let i = 0; (i < priorityTwoMolecules.length) && (i < 5 - currentLength); i++) {
    selectedMolecules.push(priorityTwoMolecules[i]);
  }
  return selectedMolecules;
};

module.exports = {
  createMolecule,
  getAllMolecules,
  getMoleculeById,
  updateMoleculeById,
  deleteMoleculeById,
  selectBestFiveMolecules,
};
