const mongoose = require('mongoose');

const UserTimeSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  userid: { type: String, required: true },
  TodayDate: { type: String, required: true },
  Todayfrom: { type: String },
  Todayto: { type: String },
  totaytotaltime: { type: String },
});

// Add a compound unique index
UserTimeSchema.index({ Name: 1, userid: 1, TodayDate: 1 ,totaytotaltime: 1}, { unique: true });

module.exports = mongoose.model('usertime', UserTimeSchema);
