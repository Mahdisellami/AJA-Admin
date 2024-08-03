const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  answer: { type: mongoose.Schema.Types.Mixed, required: true },
  condition_field: { type: String, required: true },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
