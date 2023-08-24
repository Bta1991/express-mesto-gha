const { Joi } = require('celebrate');

module.exports.signupValidationSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string()
      .custom((value, err) => {
        if (!/^(https?:\/\/)(www\.)?[\w\-./#?&]+$/i.test(value)) {
          return err.message('Некорректная ссылка');
        }
        return value;
      })
      .required(),
  }),
};

module.exports.signinValidationSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
