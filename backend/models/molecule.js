const mongoose = require("mongoose");

const moleculeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Array, required: true },
  sex: { type: Array, required: true },
  woman: { type: Array, required: true },
  pathology: { type: Array, required: true },
  medication: { type: Array, required: true },
  alcool: { type: Array, required: true },
  smoking: { type: Array, required: true },
  diet: { type: Array, required: true },
  sport_activity: { type: Array, required: true },
  sun_exposition: { type: Array, required: true },
  physical_activity: { type: Array, required: true },
  sleeping_habits: { type: Array, required: true },
  fruit_veg_per_day: { type: Array, required: true },
  freq_cons_sup_2: { type: Array, required: true },
  water_liters_per_day: { type: Array, required: true },
  eyes: { type: Array, required: true },
  score: { type: Number, required: true },
  theme: { type: Array, required: true },
});

const Molecule = mongoose.model("Molecule", moleculeSchema);

module.exports = Molecule;
