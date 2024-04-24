const mongoose = require('mongoose');

const AttendanceRecordSchema = new mongoose.Schema({
  date: String,
  time: String,
  isPresent: Boolean
});

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  attendance: [AttendanceRecordSchema]
});

module.exports = mongoose.model('Student', StudentSchema);