const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/molecules", require("./routes/moleculeRoutes"));

module.exports = app;
