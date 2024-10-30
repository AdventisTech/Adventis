const mongoose = require('mongoose');
const locationSchema = mongoose.Schema({
    latitude:{ type: Number, unique: false, required: [true, 'latitude should be mandatory'] },
    longitude: { type: Number, unique: false, required: [true, 'longitude should be mandatory'] },
    name: { type: String, unique: false, required: [true, 'name should be mandatory'] },
    EmployeeId: { type: String, unique: false, required: [true, 'EmployeeId should be mandatory'] },
    department:{ type: String, unique: false, required: [true, 'department should be mandatory'] },
    timestamp: { type: String, unique: false, required: [true, 'timestamp should be mandatory'] },
});
module.exports = mongoose.model('Location',locationSchema);