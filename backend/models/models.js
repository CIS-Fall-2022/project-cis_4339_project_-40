const uuid = require('uuid');
const mongoose = require('mongoose');
const { org_id } = require('../app');
const Schema = mongoose.Schema;

//collection for intakeData
let primaryDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumbers: {
        type: Array,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
            required: true
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    orgCode: {
        type: String, // to link the organization code
        required: true,
        default:org_id
    }
}, {
    collection: 'primaryData',
    timestamps: true
});

//collection for eventData
let eventDataSchema = new Schema({
    _id: { 
        type: String, 
        default: uuid.v1 
    },
    eventName: {
        type: String,
        required: true
    },
    services: {
        type: Array
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    description: {
        type: String,
        
    },
    attendees: [{
        type: String
    }],
    orgCode: {
        type: String, // to link the organization code
        required: true,
        default:org_id
    }
}, {
    collection: 'eventData'
});



//collection for organizationData
let organizationDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    orgName: {
        type: String,
        required: true
    },
    orgCode: {
        type: String,
        required: true,
        unique: true
    }
},
 {
    collection: 'organizationData',
    timestamps: true
});

// create models from mongoose schemas
const organizationdata = mongoose.model('organizationData', organizationDataSchema);
const primarydata = mongoose.model('primaryData', primaryDataSchema);
const eventdata = mongoose.model('eventData', eventDataSchema);

// package the models in an object to export 
module.exports = { primarydata, eventdata, organizationdata }