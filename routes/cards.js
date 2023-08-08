const express = require('express');

const router = express.Router();
const cardController = require('../controllers/cards'); //  путь к контроллеру карточек

// GET /cards — возвращает все карточки
router.get('/cards', cardController.getAllCards);

// POST /cards — создаёт карточку
router.post('/cards', cardController.createCard);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.delete('/cards/:cardId', cardController.deleteCardById);

// PUT /cards/:cardId/likes — поставить лайк карточке
router.put('/cards/:cardId/likes', cardController.likeCard);

// DELETE /cards/:cardId/likes — убрать лайк с карточки 
router.delete('/cards/:cardId/likes', cardController.dislikeCard);

module.exports = router;