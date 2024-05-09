// attendance.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  date: { type: Date },
  department: { type: String },
  sno: { type: Number },
  eCode: { type: Number },
  name: { type: String },
  shift: { type: String },
  inTime: { type: String },
  outTime: { type: String },
  workDuration: { type: String },
  OT: { type: String },
  totalDuration: { type: String },
  status: { type: String },
  remarks: { type: String }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
