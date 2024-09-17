const mongoose = require('mongoose');
const { validateShowTime } = require('../Requests/showValidation'); 

const showTimeSchema = new mongoose.Schema({
  theatre: {
    type: String,
    required: true,
  },
  movie: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

// Static method to validate movie data
showTimeSchema.statics.showTimeData = (showData) => {
  const { error } = validateShowTime(showData);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = mongoose.model('ShowTime', showTimeSchema);
