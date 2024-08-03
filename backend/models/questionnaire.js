const mongoose = require("mongoose");

const questionnaireSchema = new mongoose.Schema({
  questions: { type: Array, required: true },
  answers: { type: Array, required: true },
});

const Questionnaire = mongoose.model("Questionnaire", questionnaireSchema);

module.exports = Questionnaire;
