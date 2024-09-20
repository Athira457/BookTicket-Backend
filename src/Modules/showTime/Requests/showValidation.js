const Joi = require('joi');

// Joi Validation for ShowTime
const validateShowTime = (showTimeData) => {
  const schema = Joi.object({
    theatre: Joi.string().required().min(1),
    movie: Joi.string().required().min(1),
    date: Joi.date().iso().required(),
    time: Joi.array().items(Joi.string()).required(), // HH:MM format 
    seats: Joi.string().required(),
    ticketPrice: Joi.string().required(),
  });

  return schema.validate(showTimeData);
};

module.exports = { validateShowTime };
