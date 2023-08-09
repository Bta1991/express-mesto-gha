const User = require('../models/user'); // путь к модели пользователя

const { ERROR_CODE, handleErrorResponse } = require('../utils/errorUtils'); // Путь к errorUtils.js

// Обработчик для получения всех пользователей
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    return handleErrorResponse(ERROR_CODE.INTERNAL_SERVER_ERROR, res, 'Произошла ошибка');
  }
};

// Обработчик для получения пользователя по ID
exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return handleErrorResponse(ERROR_CODE.NOT_FOUND, res, 'Такого пользователя нет');
    }
    return res.json(user);
  } catch (err) {
    return err.name === 'CastError'
      ? handleErrorResponse(ERROR_CODE.BAD_REQUEST, res, 'Некорректный ID пользователя')
      : handleErrorResponse(ERROR_CODE.INTERNAL_SERVER_ERROR, res, 'Произошла ошибка');
  }
};

// Обработчик для создания нового пользователя
exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });
    return res.status(201).json(newUser);
  } catch (err) {
    return err.name === 'ValidationError'
      ? handleErrorResponse(ERROR_CODE.BAD_REQUEST, res, 'Переданы некорректные данные пользователя')
      : handleErrorResponse(ERROR_CODE.INTERNAL_SERVER_ERROR, res, 'Произошла ошибка');
  }
};

// Обработчик для изменения данных пользователя
exports.updateUserProfile = async (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      return handleErrorResponse(ERROR_CODE.NOT_FOUND, res, 'Такого пользователя нет');
    }
    return res.json(updatedUser);
  } catch (err) {
    return err.name === 'ValidationError'
      ? handleErrorResponse(ERROR_CODE.BAD_REQUEST, res, 'Переданые некорректные данные')
      : handleErrorResponse(ERROR_CODE.INTERNAL_SERVER_ERROR, res, 'Произошла ошибка');
  }
};

// Обработчик для изменения аватара пользователя
exports.updateUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      return handleErrorResponse(ERROR_CODE.NOT_FOUND, res, 'Такого пользователя нет');
    }
    return res.json(updatedUser);
  } catch (err) {
    return err.name === 'ValidationError'
      ? handleErrorResponse(ERROR_CODE.BAD_REQUEST, res, 'Переданы некорректные данные')
      : handleErrorResponse(ERROR_CODE.INTERNAL_SERVER_ERROR, res, 'Произошла ошибка');
  }
};
