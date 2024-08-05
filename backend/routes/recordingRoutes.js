const express = require("express");
const router = express.Router();
const {
  createRecording,
  getRecordings,
  getRecordingById,
  updateRecording,
  deleteRecording,
} = require("../controllers/recordingController");

// Create a new Recording
router.post("/", createRecording);

// Get all Recordings
router.get("/", getRecordings);

// Get a Recording by ID
router.get("/:id", getRecordingById);

// Update a Recording by ID
router.patch("/:id", updateRecording);

// Delete a Recording by ID
router.delete("/:id", deleteRecording);

module.exports = router;
