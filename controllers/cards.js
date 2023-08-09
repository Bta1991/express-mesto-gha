const Card = require('../models/card'); // путь к модели карточки

const { ERROR_CODE, handleErrorResponse } = require('../utils/errorUtils'); // Путь к errorUtils.js

// Обработчик для получения всех карточек
exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    return res.json(cards);
  } catch (err) {
    return handleErrorResponse(ERROR_CODE.INTERNAL_SERVER_ERROR, res, 'Произошла ошибка');
  }
};

// Обработчик для создания новой карточки
exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id; // захардкоденный владелец
  try {
    const newCard = await Card.create({ name, link, owner });
    return res.status(201).json(newCard);
  } catch (err) {
    return err.name === 'ValidationError'
      ? handleErrorResponse(ERROR_CODE.BAD_REQUEST, res, 'Переданы некорректные данные карточки')
      : handleErrorResponse(ERROR_CODE.INTERNAL_SERVER_ERROR, res, 'Произошла ошибка');
  }
};

// Обработчик для удаления карточки по ID
exports.deleteCardById = async (req, res) => {
  const { cardId } = req.params;
  try {
    const deletedCard = await Card.findByIdAndDelete(cardId);
    if (!deletedCard) {
      return handleErrorResponse(ERROR_CODE.NOT_FOUND, res, 'Карточка не найдена');
    }
    return res.json({ message: 'Карточка удалена' });
  } catch (err) {
    return err.name === 'CastError'
      ? handleErrorResponse(ERROR_CODE.BAD_REQUEST, res, 'Некорректный ID карточки')
      : handleErrorResponse(ERROR_CODE.INTERNAL_SERVER_ERROR, res, 'Произошла ошибка');
  }
};

// Обработчик для лайка карточки по ID
exports.likeCard = async (req, res) => {
  const userId = req.user._id;

  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
    if (!updatedCard) {
      return handleErrorResponse(ERROR_CODE.NOT_FOUND, res, 'Карточка не найдена');
    }
    return res.json(updatedCard);
  } catch (err) {
    return err.name === 'CastError'
      ? handleErrorResponse(ERROR_CODE.BAD_REQUEST, res, 'Некорректный ID карточки')
      : handleErrorResponse(ERROR_CODE.INTERNAL_SERVER_ERROR, res, 'Произошла ошибка');
  }
};

// Обработчик для удаления лайка карточки по ID
exports.dislikeCard = async (req, res) => {
  const userId = req.user._id;

  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: userId } },
      { new: true },
    );
    if (!updatedCard) {
      return handleErrorResponse(ERROR_CODE.NOT_FOUND, res, 'Карточка не найдена');
    }
    return res.json(updatedCard);
  } catch (err) {
    return err.name === 'CastError'
      ? handleErrorResponse(ERROR_CODE.BAD_REQUEST, res, 'Некорректный ID карточки')
      : handleErrorResponse(ERROR_CODE.INTERNAL_SERVER_ERROR, res, 'Произошла ошибка');
  }
};
