const recordingService = require("../services/recordingService");

// Create a new recording
const createRecording = async (req, res) => {
  try {
    const savedRecording = await recordingService.createRecording(req.body);
    res.status(201).json(savedRecording);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all recordings
const getRecordings = async (req, res) => {
  try {
    const recordings = await recordingService.getRecordings();
    res.status(200).json(recordings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a recording by ID
const getRecordingById = async (req, res) => {
  try {
    const recording = await recordingService.getRecordingById(req.params.id);
    if (!recording)
      return res.status(404).json({ message: "Recording not found" });
    res.status(200).json(recording);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a recording by ID
const updateRecording = async (req, res) => {
  try {
    const updatedRecording = await recordingService.updateRecording(
      req.params.id,
      req.body,
    );
    if (!updatedRecording)
      return res.status(404).json({ message: "Recording not found" });
    res.status(200).json(updatedRecording);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a recording by ID
const deleteRecording = async (req, res) => {
  try {
    const deletedRecording = await recordingService.deleteRecording(
      req.params.id,
    );
    if (!deletedRecording)
      return res.status(404).json({ message: "Recording not found" });
    res.status(200).json({ message: "Recording deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createRecording,
  getRecordings,
  getRecordingById,
  updateRecording,
  deleteRecording,
};
