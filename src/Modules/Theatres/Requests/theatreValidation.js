const Joi = require('joi');

// Validation function for theatre registration
const validateTheatre = (theatre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    location: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    seatingCapacity: Joi.string().required(),
  });
  
  return schema.validate(theatre);
};

module.exports = { validateTheatre };
