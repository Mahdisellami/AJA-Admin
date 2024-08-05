const questionService = require("../services/questionService");

// Create a new question
const createQuestion = async (req, res) => {
  try {
    const savedQuestion = await questionService.createQuestion(req.body);
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const isThemeRelated =
      req.query.isThemeRelated === "true"
        ? true
        : req.query.isThemeRelated === "false"
          ? false
          : undefined;
    const questions = await questionService.getAllQuestions(isThemeRelated);
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a question by ID
const getQuestionById = async (req, res) => {
  try {
    const question = await questionService.getQuestionById(req.params.id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a question by ID
const updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await questionService.updateQuestion(
      req.params.id,
      req.body,
    );
    if (!updatedQuestion)
      return res.status(404).json({ message: "Question not found" });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a question by ID
const deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await questionService.deleteQuestion(req.params.id);
    if (!deletedQuestion)
      return res.status(404).json({ message: "Question not found" });
    res.status(200).json({ message: "Question deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get the next question based on the current question ID and answer text
const getNextQuestion = async (req, res) => {
  try {
    const nextQuestion = await questionService.getNextQuestion(
      req.params.id,
      req.query.answerText,
    );
    if (!nextQuestion)
      return res.status(404).json({ message: "Next question not found" });
    res.status(200).json(nextQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getNextQuestion,
};
