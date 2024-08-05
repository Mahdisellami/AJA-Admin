const express = require("express");
const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getNextQuestion,
} = require("../controllers/questionController");

const router = express.Router();

router.post("/", createQuestion);
router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);
router.post("/:id/next", getNextQuestion);

module.exports = router;
