// const mongoose = require('mongoose');
// const rating = mongoose.Schema({
//     EmployeeId:{ type: String,  required: [true, 'EmployeeIdshould be mandatory'] },
//     Name: { type: String,  required: [true, 'Name should be mandatory'] },
//     selectedDate: { type: String, required: [true, 'Data should be mandatory'] },
//     Finalrating: { type: String,  required: [true, 'Rating should be mandatory'] },
// });
// module.exports = mongoose.model('rating',rating);

const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    EmployeeId: { type: String, required: true },
    Name: { type: String, required: true },
    Department:{ type: String, required: true },
    selectedDate: { type: String, required: true },
    Finalrating: { type: String, required: true }
});

// Define compound index for EmployeeId and selectedDate
ratingSchema.index({ EmployeeId: 1, selectedDate: 1,Department }, { unique: true });

// Middleware to check if the selectedDate is unique for the given EmployeeId
ratingSchema.pre('save', async function (next) {
    try {
        const existingRating = await this.constructor.findOne({ EmployeeId: this.EmployeeId, selectedDate: this.selectedDate,Department:this.Department });
        if (existingRating) {
            throw new Error('Selected date already exists for this user');
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('SelfRating', ratingSchema);
