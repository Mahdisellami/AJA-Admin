const Question = require("../models/question");

const createQuestion = async (questionData) => {
  const question = new Question(questionData);
  return await question.save();
};

const getAllQuestions = async (isThemeRelated) => {
  let query = {};
  if (isThemeRelated !== undefined) {
    query.isThemeRelated = isThemeRelated;
  }
  return await Question.find(query).populate("answers.nextQuestionId");
};

const getQuestionById = async (id) => {
  return await Question.findById(id).populate("answers.nextQuestionId");
};

const updateQuestion = async (id, updateData) => {
  return await Question.findByIdAndUpdate(id, updateData, {
    new: true,
  }).populate("answers.nextQuestionId");
};

const deleteQuestion = async (id) => {
  return await Question.findByIdAndDelete(id);
};

const getNextQuestion = async (id, answerText) => {
  const question = await Question.findById(id).populate(
    "answers.nextQuestionId",
  );
  const answer = question.answers.find((ans) => ans.answer === answerText); // Note: changed 'text' to 'answer'
  return answer ? answer.nextQuestionId : null;
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getNextQuestion,
};
