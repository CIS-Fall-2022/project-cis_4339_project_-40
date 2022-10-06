const uuid = required('uuid');
const mongoose = required('mongoose');
const Schema = mongoose.Schema;


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
        required: true,
    },
    attendees: [{
        type: String
    }],
    orgCode: {
        type: [String] // to link the organization code
    }
}, {
    collection: 'eventData'
});

// create models from mongoose schemas
const eventdata = mongoose.model('eventData', eventDataSchema);

// package the models in an object to export 
module.exports = { eventdata }