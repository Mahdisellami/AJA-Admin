const Question = require("../models/questionModel");

// Service to create a question
const createQuestion = async (data) => {
  const question = new Question(data);
  return await question.save();
};

// Service to get all questions
const getQuestions = async () => {
  return await Question.find();
};

// Service to get a question by ID
const getQuestionById = async (id) => {
  return await Question.findById(id);
};

// Service to update a question by ID
const updateQuestion = async (id, updates) => {
  return await Question.findByIdAndUpdate(id, updates, { new: true });
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
};
