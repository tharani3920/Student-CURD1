const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  standard: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  mark: {
    type: Number,
    required: true
  },
  comments: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Student', studentSchema);
