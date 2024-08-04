import axios from "axios";

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: "http://localhost:8000/api", // Replace with your API base URL
  timeout: 10000, // Optional: Set a timeout
  headers: {
    "Content-Type": "application/json", // Set default headers if needed
  },
});

// Export the instance to use in other files
export default api;
