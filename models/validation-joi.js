const { Joi } = require('celebrate');

// Регулярное выражение для проверки ссылок
const linkValid = /^(https?:\/\/)(www\.)?[\w\-./#?&]+$/i;

// Схема валидации для регистрации пользователя
module.exports.signupValidationSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkValid),
  }),
};

// Схема валидации для входа пользователя
module.exports.signinValidationSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

// Схема валидации для идентификатора пользователя
module.exports.validateUserId = {
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
};

// Схема валидации для обновления информации о пользователе
module.exports.validateUpdateUser = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
};

// Схема валидации для обновления аватара пользователя
module.exports.validateUpdateAvatar = {
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(linkValid),
  }),
};

// Схема валидации для создания карточки
module.exports.validateCreateCard = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(linkValid),
  }),
};

// Схема валидации для идентификатора карточки
module.exports.validateCardId = {
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
};
