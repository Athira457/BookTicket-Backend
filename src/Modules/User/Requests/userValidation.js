const Joi = require('joi');

// Validation function for user registration
const validateUser = (user) => {
  const schema = Joi.object({
    uname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().min(10).required(),
    role: Joi.string().valid('user', 'admin').default('user'),
  });
  return schema.validate(user);
};

module.exports = { validateUser };
