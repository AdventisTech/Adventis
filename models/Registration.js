const mongoose = require('mongoose');
const employeeSchema = mongoose.Schema({
  EmployeeId: { type: String, unique: true, required: [true, 'EmployeeId should be mandatory'] },
  Name: { type: String, required: [true, 'Name should be mandatory'] },
  Designation: { type: String, required: [true, 'Designation should be mandatory'] },
  Department: { type: String, required: [true, 'Department should be mandatory'] },
  DOB: { type: String, required: [true, 'DOB should be mandatory'] },
  DOJ: { type: String, required: [true, 'DOJ should be mandatory'] },
  EmployeeStatus: { type: String, required: [true, 'EmployeeStatus should be mandatory'] },
  DOL: { type: String, required: false },
  Salary: { type: Number, required: false },
  Emailaddress: { type: String, unique: true, required: [true, 'Email should be mandatory'] },
  Password: { type: String, required: [true, 'Password should be mandatory'] },
  profilePicture: { type: String, required: false },
});
module.exports = mongoose.model('Employee', employeeSchema);
