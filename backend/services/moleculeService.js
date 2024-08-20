const Molecule = require("../models/molecule");
const utils = require("../utils/utils");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

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

const selectBestFiveMolecules = async (data) => {
  // Extract the filters from the request body
  const { allegation, age, sex, woman, medications, pathology, smoking, alcohol } = data;
  if (!allegation || !ObjectId.isValid(allegation)) {
    throw new Error("Please provide a targeted allegation! Make sure it has a valid ObjectId value.");
  }
  // Build the query object dynamically based on available filters
  const query = {};
  
  query.allegation = new ObjectId(allegation);

  if (age && Array.isArray(age)) {
    query.age = { $nin: utils.convertToObjectIdArray(age) };
  }

  if (sex && Array.isArray(sex)) {
    query.sex = { $nin: utils.convertToObjectIdArray(sex) };
  }

  if (woman && Array.isArray(woman)) {
    query.woman = { $nin: utils.convertToObjectIdArray(woman) };
  }
  if (medications && Array.isArray(medications)) {
    query.medication = { $nin: utils.convertToObjectIdArray(medications) };
  }

  if (pathology && Array.isArray(pathology)) {
    query.pathology = { $nin: utils.convertToObjectIdArray(pathology) };
  }

  if (smoking && Array.isArray(smoking)) {
    query.smoking = { $nin: utils.convertToObjectIdArray(smoking) };
  }

  if (alcohol && Array.isArray(alcohol)) {
    query.alcohol = { $nin: utils.convertToObjectIdArray(alcohol) };
  }
  const molecules = await Molecule.find(query);

  // Select Best fitting molecules (max five) based on pre-defined logic

  const selectedMolecules = [];
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
