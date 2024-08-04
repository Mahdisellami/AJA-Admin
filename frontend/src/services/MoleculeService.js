import api from "../api/api"; // Import the Axios instance

// Define API methods
export const createMolecule = (formData) => {
  return api.post("/molecules", formData); // Replace '/submit' with your API endpoint
};

// Add more API methods as needed
