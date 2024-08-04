const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// Connect to MongoDB
connectDB();

// Routes
app.use("/api/molecules", require("./routes/moleculeRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/questionnaires", require("./routes/questionnaireRoutes"));
module.exports = app;
