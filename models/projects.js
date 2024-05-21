const mongoose = require('mongoose');
const Project = mongoose.Schema({
    ProjectId:{ type: String, required: true, unique: true},
    Title: { type: String, required: true },
    Client: { type: String,  required: true  },
    ProjectValue:{ type: Number,  required: false },
    ResourceBudget:{ type: Number,  required: false  },
    ProjectDurationFrom:{ type: String,  required: true  },
    ProjectDurationTo:{ type: String,  required: true  },
    Description:{ type: String,  required: false },
    PONumber:{ type: String, required: false},
    PODate:{ type: String,  required: false  },
    departments: [{
        name: { type: String, required: false },
        numEmployees: { type: Number, required: false }
    }]

});
Project.index({ ProjectId: 1 }, { unique: true });
const Project1 = mongoose.model('Project',Project );
module.exports = Project1;