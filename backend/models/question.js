const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  answer: { type: mongoose.Schema.Types.Mixed, required: true },
  nextQuestionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: false }
});

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  answers: { type: [answerSchema], required: true },
    condition_field: { type: String, required: true },
  options: {type: Boolean, required: true}
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
