import api from "../api/api"; // Import the Axios instance

// Define API methods
export const getQuestions = (formData) => {
  return api.get("/questions", formData); // Replace '/submit' with your API endpoint
};
export const createQuestion = (formData) => {
  return api.post("/questions", formData); // Replace '/submit' with your API endpoint
};

// Add more API methods as needed
