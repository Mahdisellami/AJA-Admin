const mongoose = require("mongoose");

const recordingSchema = new mongoose.Schema({
  conditions: { type: Array, required: true },
  answers: { type: Array, required: true },
  themes: { type: Array, required: true },
});

const Recording = mongoose.model("Recording", recordingSchema);

module.exports = Recording;
