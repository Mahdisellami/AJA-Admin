const Recording = require("../models/recording");

const createRecording = async (data) => {
  const newRecording = new Recording(data);
  return await newRecording.save();
};

const getRecordings = async () => {
  return await Recording.find();
};

const getRecordingById = async (id) => {
  return await Recording.findById(id);
};

const updateRecording = async (id, data) => {
  return await Recording.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteRecording = async (id) => {
  return await Recording.findByIdAndDelete(id);
};

module.exports = {
  createRecording,
  getRecordings,
  getRecordingById,
  updateRecording,
  deleteRecording,
};
