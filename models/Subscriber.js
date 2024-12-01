const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  applicantName: { type: String, required: true },
  applicantDesignation: { type: String, required: true },
  applicantAddress: { type: String, required: true },
  applicantCity: { type: String, required: true },
  applicantState: { type: String, required: true },
  applicantCountry: { type: String, required: true },
  applicantMobile: { 
    type: String, 
    required: true, 
    validate: {
      validator: (v) => /^[0-9]{10}$/.test(v), // 10-digit mobile number
      message: (props) => `${props.value} is not a valid mobile number!`
    }
  },
  applicantEmail: { 
    type: String, 
    required: true, 
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format.'] 
  },
  organizationName: { type: String },
  organizationAddress: { type: String },
  organizationCity: { type: String },
  organizationState: { type: String },
  organizationCountry: { type: String },
  organizationContactNumber: { type: String },
  organizationEmail: { 
    type: String, 
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format.'] 
  },
  conferenceTitle: { type: String, required: true },
  conferenceDiscipline: { type: String },
  conferenceCountry: { type: String },
  conferenceEmail: { 
    type: String, 
    required: true, 
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format.'] 
  },
  authorizedSignatory: { type: String },
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
