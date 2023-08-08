const Card = require('../models/card') // путь к модели карточки

const handleErrorResponse = (code, res, errorMessage) => {
    if (!code) {
        res.status(500).json({ error: errorMessage })
    }
    res.status(code).json({ error: errorMessage })
}

// Обработчик для получения всех карточек
exports.getAllCards = async (req, res) => {
    try {
        const cards = await Card.find()
        return res.status(200).json(cards)
    } catch (err) {
        return handleErrorResponse(res, err)
    }
}

// Обработчик для создания новой карточки
exports.createCard = async (req, res) => {
    const { name, link } = req.body
    const owner = req.user._id // захардкоденный владелец
    try {
        if (!name || !link) {
            return handleErrorResponse(
                400,
                res,
                'Не все обязательные поля заполнены'
            )
        }

        const newCard = await Card.create({ name, link, owner })
        return res.status(201).json(newCard)
    } catch (err) {
        return handleErrorResponse(res, err)
    }
}

// Обработчик для удаления карточки по ID
exports.deleteCardById = async (req, res) => {
    const { cardId } = req.params
    try {
        const deletedCard = await Card.findByIdAndDelete(cardId)
        if (!deletedCard) {
            return handleErrorResponse(404, res, 'Карточка не найдена')
        }
        return res.status(200).json({ message: 'Карточка удалена' })
    } catch (err) {
        return handleErrorResponse(res, err)
    }
}

exports.likeCard = async (req, res) => {
    const userId = req.user._id

    try {
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.cardId,
            { $addToSet: { likes: userId } },
            { new: true }
        )
        if (!updatedCard) {
            return handleErrorResponse(404, res, 'Карточка не найдена')
        }
        return res.status(200).json(updatedCard)
    } catch (err) {
        return handleErrorResponse(res, err)
    }
}

exports.dislikeCard = async (req, res) => {
    const userId = req.user._id

    try {
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.cardId,
            { $pull: { likes: userId } },
            { new: true }
        )
        if (!updatedCard) {
            return handleErrorResponse(404, res, 'Карточка не найдена')
        }
        return res.status(200).json(updatedCard)
    } catch (err) {
        return handleErrorResponse(res, err)
    }
}