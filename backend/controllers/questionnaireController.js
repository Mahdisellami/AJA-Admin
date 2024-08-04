const questionnaireService = require("../services/questionnaireService");

// Create a new questionnaire
const createQuestionnaire = async (req, res) => {
  try {
    const savedQuestionnaire = await questionnaireService.createQuestionnaire(
      req.body,
    );
    res.status(201).json(savedQuestionnaire);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all questionnaires
const getQuestionnaires = async (req, res) => {
  try {
    const questionnaires = await questionnaireService.getQuestionnaires();
    res.status(200).json(questionnaires);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a questionnaire by ID
const getQuestionnaireById = async (req, res) => {
  try {
    const questionnaire = await questionnaireService.getQuestionnaireById(
      req.params.id,
    );
    if (!questionnaire)
      return res.status(404).json({ message: "Questionnaire not found" });
    res.status(200).json(questionnaire);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a questionnaire by ID
const updateQuestionnaire = async (req, res) => {
  try {
    const updatedQuestionnaire = await questionnaireService.updateQuestionnaire(
      req.params.id,
      req.body,
    );
    if (!updatedQuestionnaire)
      return res.status(404).json({ message: "Questionnaire not found" });
    res.status(200).json(updatedQuestionnaire);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a questionnaire by ID
const deleteQuestionnaire = async (req, res) => {
  try {
    const deletedQuestionnaire = await questionnaireService.deleteQuestionnaire(
      req.params.id,
    );
    if (!deletedQuestionnaire)
      return res.status(404).json({ message: "Questionnaire not found" });
    res.status(200).json({ message: "Questionnaire deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add questions to a questionnaire
const addQuestions = async (req, res) => {
  try {
    const updatedQuestionnaire = await questionnaireService.addQuestions(
      req.params.id,
      req.body.questions,
    );
    if (!updatedQuestionnaire)
      return res.status(404).json({ message: "Questionnaire not found" });
    res.status(200).json(updatedQuestionnaire);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createQuestionnaire,
  getQuestionnaires,
  getQuestionnaireById,
  updateQuestionnaire,
  deleteQuestionnaire,
  addQuestions,
};
