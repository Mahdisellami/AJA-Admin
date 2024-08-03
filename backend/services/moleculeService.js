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

module.exports = {
  createMolecule,
  getAllMolecules,
  getMoleculeById,
  updateMoleculeById,
  deleteMoleculeById,
};
