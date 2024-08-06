const mongoose = require("mongoose");

const moleculeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  priority: { type: Number, required: true },
  score: { type: Number, required: true },
  age: { type: Array, required: false },
  sex: { type: Array, required: false },
  woman: { type: Array, required: false },
  pathology: { type: Array, required: false },
  medication: { type: Array, required: false },
  alcool: { type: Array, required: false },
  smoking: { type: Array, required: false },
  diet: { type: Array, required: false },
  sport_activity: { type: Array, required: false },
  sun_exposition: { type: Array, required: false },
  physical_activity: { type: Array, required: false },
  sleeping_habits: { type: Array, required: false },
  fruit_veg_per_day: { type: Array, required: false },
  freq_cons_sup_2: { type: Array, required: false },
  water_liters_per_day: { type: Array, required: false },
  eyes: { type: Array, required: false },
  theme: { type: Array, required: false },
});

const Molecule = mongoose.model("Molecule", moleculeSchema);

module.exports = Molecule;
