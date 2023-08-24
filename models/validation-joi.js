const { Joi } = require('celebrate');

module.exports.signupValidationSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
