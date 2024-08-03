const Questionnaire = require("../models/questionnaire");

const createQuestionnaire = async (data) => {
  const newQuestionnaire = new Questionnaire(data);
  return await newQuestionnaire.save();
};

const getQuestionnaires = async () => {
  return await Questionnaire.find();
};

const getQuestionnaireById = async (id) => {
  return await Questionnaire.findById(id);
};

const updateQuestionnaire = async (id, data) => {
  return await Questionnaire.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteQuestionnaire = async (id) => {
  return await Questionnaire.findByIdAndDelete(id);
};

const addQuestions = async (id, questions) => {
  const questionnaire = await Questionnaire.findById(id);
  if (!questionnaire) return null;

  questionnaire.questions.push(...questions);
  return await questionnaire.save();
};

module.exports = {
  createQuestionnaire,
  getQuestionnaires,
  getQuestionnaireById,
  updateQuestionnaire,
  deleteQuestionnaire,
  addQuestions,
};
