const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    EmployeeId:{ type: String, unique: true, required: [true, 'EmployeeIdshould be mandatory'] },
    Name: { type: String, unique: false, required: [true, 'Name should be mandatory'] },
    Designation: { type: String, unique: false, required: [true, 'Designation should be mandatory'] },
    Salary: { type: Number, unique: false, required: [false, 'Salary should not be mandatory'] },
    Emailaddress: { type: String, unique: true, required: [true, 'Email should be mandatory'] },
    // Password: { type: String,unique: false,  required: [true, 'Password not matching'] },
    Password: {
        type: String,
        unique: false,
        required: [true, 'Password should be mandatory'],
        minlength: [4, 'Password should be at least 4 characters long'],
        maxlength: [20, 'Password should not exceed 20 characters']
      },
    profilePicture: { type: String, required: [false, 'picture should not be mandatory'] },
});


module.exports = mongoose.model('Employe',employeeSchema);



