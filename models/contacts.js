const mongoose = require('mongoose');

const Contacts = mongoose.Schema({
    
    Name:{ type: String, required: true},
    CompanyName: { type: String, required: true },
    ContactNumber: { type: Number,  required: true,unique: true   },
    MailId:{ type: String,  required: true , unique: true },
    Reference:{ type: String,  required: false  },
    Requirement:{ type: String,  required: false  },

});
// Project.index({ ProjectId: 1 }, { unique: true });
// const Contacts1 = mongoose.model('Contacts',Contacts );
module.exports = mongoose.model('Contacts',Contacts );
// module.exports = Contacts1;

// module.exports = mongoose.model('Project',Project);
// Name:any;
// CompanyName:any
// ContactNumber!:number;
// MailId:any;
// Reference:any;
// Requirement:any;