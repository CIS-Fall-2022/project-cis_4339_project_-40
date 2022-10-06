const uuid = required('uuid');
const mongoose = required('mongoose');
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
        type: [String] // to link the organization code
    }
}, {
    collection: 'primaryData',
    timestamps: true
});


// create models from mongoose schemas
const primarydata = mongoose.model('primaryData', primaryDataSchema);


// package the models in an object to export 
module.exports = { primarydata }