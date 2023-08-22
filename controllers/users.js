const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken'); // импортируем JSONwebtoken
const User = require('../models/user'); // путь к модели пользователя

const { JWT_SECRET = 'your-secret-key' } = process.env;

const { ERROR_CODE, handleErrorResponse } = require('../utils/errorUtils'); // Путь к errorUtils.js

// Обработчик для получения всех пользователей
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    return handleErrorResponse(
      ERROR_CODE.INTERNAL_SERVER_ERROR,
      res,
      'Произошла ошибка',
    );
  }
};

// Обработчик для получения пользователя по ID
exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return handleErrorResponse(
        ERROR_CODE.NOT_FOUND,
        res,
        'Такого пользователя нет',
      );
    }
    return res.json(user);
  } catch (err) {
    return err.name === 'CastError'
      ? handleErrorResponse(
        ERROR_CODE.BAD_REQUEST,
        res,
        'Некорректный ID пользователя',
      )
      : handleErrorResponse(
        ERROR_CODE.INTERNAL_SERVER_ERROR,
        res,
        'Произошла ошибка',
      );
  }
};

// Обработчик для получения инфы о своем пользователе
exports.getCurrentUser = async (req, res) => {
  const { userId } = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return handleErrorResponse(
        ERROR_CODE.NOT_FOUND,
        res,
        'Такого пользователя нет',
      );
    }
    return res.json(user);
  } catch (err) {
    return err.name === 'CastError'
      ? handleErrorResponse(
        ERROR_CODE.BAD_REQUEST,
        res,
        'Некорректный ID пользователя',
      )
      : handleErrorResponse(
        ERROR_CODE.INTERNAL_SERVER_ERROR,
        res,
        'Произошла ошибка',
      );
  }
};

// Обработчик для создания нового пользователя
exports.createUser = async (req, res) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  try {
    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя с хешированным паролем
    const newUser = await User.create({
      email,
      password: hashedPassword, // Сохраняем хешированный пароль
      name,
      about,
      avatar,
    });
    // удалим password из объекта перед отправкой ответа
    newUser.password = undefined;
    return res.status(201).json(newUser);
  } catch (err) {
    // console.error(err);
    return err.name === 'ValidationError'
      ? handleErrorResponse(
        ERROR_CODE.BAD_REQUEST,
        res,
        'Переданы некорректные данные пользователя',
      )
      : handleErrorResponse(
        ERROR_CODE.INTERNAL_SERVER_ERROR,
        res,
        'Произошла ошибка',
      );
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
      return handleErrorResponse(
        ERROR_CODE.NOT_FOUND,
        res,
        'Такого пользователя нет',
      );
    }
    return res.json(updatedUser);
  } catch (err) {
    return err.name === 'ValidationError'
      ? handleErrorResponse(
        ERROR_CODE.BAD_REQUEST,
        res,
        'Переданые некорректные данные',
      )
      : handleErrorResponse(
        ERROR_CODE.INTERNAL_SERVER_ERROR,
        res,
        'Произошла ошибка',
      );
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
      return handleErrorResponse(
        ERROR_CODE.NOT_FOUND,
        res,
        'Такого пользователя нет',
      );
    }
    return res.json(updatedUser);
  } catch (err) {
    return err.name === 'ValidationError'
      ? handleErrorResponse(
        ERROR_CODE.BAD_REQUEST,
        res,
        'Переданы некорректные данные',
      )
      : handleErrorResponse(
        ERROR_CODE.INTERNAL_SERVER_ERROR,
        res,
        'Произошла ошибка',
      );
  }
};

// Обработчик логина
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Находим пользователя по email
    const user = await User.findOne({ email }).select('+password'); // вызова метода модели, нужно добавить вызов метода select, передав ему строку +password:

    // Если пользователя нет или пароль неверный
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return handleErrorResponse(
        ERROR_CODE.UNAUTHORIZED,
        res,
        'Неправильные почта или пароль',
      );
    }

    // Создаем JWT токен
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1w' });

    // Отправляем токен в куку с httpOnly для безопасности
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // Завершаем ответ, так как у него нет тела, ретурн должен быть для стрелочных функций
    return null;
  } catch (err) {
    return handleErrorResponse(
      ERROR_CODE.INTERNAL_SERVER_ERROR,
      res,
      'Произошла ошибка',
    );
  }
};
