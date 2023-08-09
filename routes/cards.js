const express = require('express');

const router = express.Router();
const cardController = require('../controllers/cards'); //  путь к контроллеру карточек

// GET /cards — возвращает все карточки
router.get('/', cardController.getAllCards);

// POST /cards — создаёт карточку
router.post('/', cardController.createCard);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.delete('/:cardId', cardController.deleteCardById);

// PUT /cards/:cardId/likes — поставить лайк карточке
router.put('/:cardId/likes', cardController.likeCard);

// DELETE /cards/:cardId/likes — убрать лайк с карточки
router.delete('/:cardId/likes', cardController.dislikeCard);

module.exports = router;