const mongoose = require("mongoose");

const moleculeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  theme: { type: mongoose.ObjectId, required: true },
  answer: { type: mongoose.ObjectId, required: true },
  priority: { type: Number, required: true },
  score: { type: Number, required: true },
  age: { type: [mongoose.ObjectId], required: false },
  sex: { type: [mongoose.ObjectId], required: false },
  woman: { type: [mongoose.ObjectId], required: false },
  pathology: { type: [mongoose.ObjectId], required: false },
  medication: { type: [mongoose.ObjectId], required: false },
  alcohol: { type: [mongoose.ObjectId], required: false },
  smoking: { type: [mongoose.ObjectId], required: false },
  diet: { type: Array, required: false },
  sport_activity: { type: Array, required: false },
  sun_exposition: { type: Array, required: false },
  physical_activity: { type: Array, required: false },
  sleeping_habits: { type: Array, required: false },
  fruit_veg_per_day: { type: Array, required: false },
  freq_cons_sup_2: { type: Array, required: false },
  water_liters_per_day: { type: Array, required: false },
  eyes: { type: Array, required: false },
});

const Molecule = mongoose.model("Molecule", moleculeSchema);

module.exports = Molecule;
