const express = require("express");
const router = express.Router();
const {
  createQuestionnaire,
  getQuestionnaires,
  getQuestionnaireById,
  updateQuestionnaire,
  deleteQuestionnaire,
  addQuestions,
} = require("../controllers/questionnaireController");
// Create a new Questionnaire
router.post("/", createQuestionnaire);

// Get all Questionnaires
router.get("/", getQuestionnaires);

// Get a Questionnaire by ID
router.get("/:id", getQuestionnaireById);

// Update a Questionnaire by ID
router.patch("/:id", updateQuestionnaire);

// Delete a Questionnaire by ID
router.delete("/:id", deleteQuestionnaire);

// Add question in a Questionnaire by ID
router.patch("/:id/questions", addQuestions);

module.exports = router;
