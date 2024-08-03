const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
} = require("../controllers/questionController");

// Create a new question
router.post("/", createQuestion);

// Get all questions
router.get("/", getQuestions);

// Get a question by ID
router.get("/:id", getQuestionById);

// Update a question by ID
router.patch("/:id", updateQuestion);

module.exports = router;
