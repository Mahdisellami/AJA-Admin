const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// Helper function to convert an array of string IDs to ObjectIds
exports.convertToObjectIdArray = (arr) => {
  return arr.map(id => new ObjectId(id));
};