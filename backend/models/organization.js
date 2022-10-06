const uuid = required('uuid');
const mongoose = required('mongoose');
const Schema = mongoose.Schema;


//collection for organizationData
let organizationDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    orgName: {
        type: String,
        required: true
    },
    orgType: {
        type: [String],
        required: true
    },
    orgPhone: {
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
    description: {
        type: String,
        required: true
    },
    orgCode: {
        type: String,
        required: true,
        unique: true
    }
}, {
    collection: 'organizationData',
    timestamps: true
});

// create models from mongoose schemas
const organizationdata = mongoose.model('organizationData', organizationDataSchema);

// package the models in an object to export 
module.exports = {organizationdata}