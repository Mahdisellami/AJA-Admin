const mongoose = require("mongoose");

const moleculeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  sex: { type: String, required: true },
  woman: { type: String, required: true },
  pathology: { type: Array, required: true },
  medication: { type: Array, required: true },
  alcool: { type: String, required: true },
  smoking: { type: Boolean, required: true },
  diet: { type: String, required: true },
  sport_activity: { type: Boolean, required: true },
  sun_exposition: { type: Boolean, required: true },
  physical_activity: { type: String, required: true },
  sleeping_habits: { type: String, required: true },
  fruit_veg_per_day: { type: String, required: true },
  freq_cons_sup_2: { type: String, required: true },
  water_liters_per_day: { type: String, required: true },
  eyes: { type: String, required: true },
    score: { type: Number, required: true },
  theme:{ type: String, required: true }
});

const Molecule = mongoose.model("Molecule", moleculeSchema);

module.exports = Molecule;
