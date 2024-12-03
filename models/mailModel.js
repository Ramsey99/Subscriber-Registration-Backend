const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mailSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Mail', mailSchema);