const Joi = require('joi');

// Validation function for movie registration
const validateMovie = (movie) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    genre: Joi.string().required(),
    languages: Joi.array().items(Joi.string()).required(), 
    release: Joi.string().required(),
    duration: Joi.string().required(),
    certification: Joi.string().required(),
    synopsis: Joi.string().required(),
    poster: Joi.string().required(),
  });
  
  return schema.validate(movie);
};

module.exports = { validateMovie };
