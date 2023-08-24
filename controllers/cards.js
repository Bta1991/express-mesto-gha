const Card = require('../models/card'); // путь к модели карточки

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

// Обработчик для получения всех карточек
exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    return res.json(cards);
  } catch (err) {
    throw new Error('Произошла ошибка при получении карточек');
  }
};

// Обработчик для создания новой карточки
exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const newCard = await Card.create({ name, link, owner });
    return res.status(201).json(newCard);
  } catch (err) {
    if (err.name === 'ValidationError') {
      throw new BadRequestError('Переданы некорректные данные карточки');
    }
    throw new Error('Произошла ошибка при создании карточки');
  }
};

// Обработчик для удаления карточки по ID
exports.deleteCardById = async (req, res) => {
  const { cardId } = req.params;
  try {
    const deletedCard = await Card.findByIdAndDelete(cardId);
    if (!deletedCard) {
      throw new NotFoundError('Карточка не найдена');
    }
    return res.json({ message: 'Карточка удалена' });
  } catch (err) {
    if (err.name === 'CastError') {
      throw new BadRequestError('Некорректный ID карточки');
    }
    throw new Error('Произошла ошибка при удалении карточки');
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
      throw new NotFoundError('Карточка не найдена');
    }
    return res.json(updatedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      throw new BadRequestError('Некорректный ID карточки');
    }
    throw new Error('Произошла ошибка при постановке лайка');
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
      throw new NotFoundError('Карточка не найдена');
    }
    return res.json(updatedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      throw new BadRequestError('Некорректный ID карточки');
    }
    throw new Error('Произошла ошибка при снятии лайка');
  }
};
