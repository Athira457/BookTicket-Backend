const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { validateTheatre } = require('../Requests/theatreValidation.js'); 

// Theatre Schema
const theatreSchema = new mongoose.Schema({
  theatreId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  seatingCapacity: {
    type: String,
    required: true,
  },
  ticketPrice:{
    type: String,
  }
});

// Auto-increment for theatreId
theatreSchema.plugin(AutoIncrement, { inc_field: 'theatreId' });

// Static method to validate theatre data
theatreSchema.statics.validateTheatreData = (theatreData) => {
  const { error } = validateTheatre(theatreData); 
  if (error) {
    throw new Error(error.details[0].message);
  }
};

const Theatre = mongoose.model('Theatre', theatreSchema);

module.exports = Theatre;
