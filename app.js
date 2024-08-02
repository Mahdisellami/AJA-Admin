const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");

require("dotenv").config();

connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);

module.exports = app;
