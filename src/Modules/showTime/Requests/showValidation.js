const Joi = require('joi');

// Joi Validation for ShowTime
const validateShowTime = (showTimeData) => {
  const schema = Joi.object({
    theatre: Joi.string().required().min(1),
    movie: Joi.string().required().min(1),
    date: Joi.date().iso().required(),
    time: Joi.string().required().pattern(new RegExp('^([01]?[0-9]|2[0-3]):[0-5][0-9]$')), // HH:MM format 
  });

  return schema.validate(showTimeData);
};

module.exports = { validateShowTime };
