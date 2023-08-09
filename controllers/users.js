const User = require('../models/user') // путь к модели пользователя

const { ERROR_CODE, handleErrorResponse } = require('../utils/errorUtils') // Путь к errorUtils.js

// Обработчик для получения всех пользователей
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (err) {
        return handleErrorResponse(
            ERROR_CODE.INTERNAL_SERVER_ERROR,
            res,
            err.message
        )
    }
}

// Обработчик для получения пользователя по ID
exports.getUserById = async (req, res) => {
    const { userId } = req.params
    try {
        const user = await User.findById(userId)
        if (!user) {
            return handleErrorResponse(
                ERROR_CODE.NOT_FOUND,
                res,
                'Такого пользователя нет'
            )
        }
        return res.status(200).json(user)
    } catch (err) {
        return handleErrorResponse(
            ERROR_CODE.BAD_REQUEST,
            res,
            err.message
        )
    }
}

// Обработчик для создания нового пользователя
exports.createUser = async (req, res) => {
    const { name, about, avatar } = req.body
    try {
        if (!name || !about || !avatar) {
            return handleErrorResponse(
                ERROR_CODE.BAD_REQUEST,
                res,
                'Не все обязательные поля заполнены'
            )
        }

        const newUser = await User.create({ name, about, avatar })
        return res.status(201).json(newUser)
    } catch (err) {
        return handleErrorResponse(ERROR_CODE.BAD_REQUEST, res, err.message)
    }
}

// Обработчик для изменения данных пользователя
exports.updateUserProfile = async (req, res) => {
    const { name, about } = req.body
    const userId = req.user._id

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, about },
            { new: true }
        )
        if (!updatedUser) {
            return handleErrorResponse(
                ERROR_CODE.BAD_REQUEST,
                res,
                'Такого пользователя нет'
            )
        }
        return res.status(200).json(updatedUser)
    } catch (err) {
        return handleErrorResponse(ERROR_CODE.NOT_FOUND, res, err.message)
    }
}

// Обработчик для изменения аватара пользователя
exports.updateUserAvatar = async (req, res) => {
    const { avatar } = req.body
    const userId = req.user._id

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { avatar },
            { new: true }
        )
        if (!updatedUser) {
            return handleErrorResponse(
                ERROR_CODE.NOT_FOUND,
                res,
                'Такого пользователя нет'
            )
        }
        return res.status(200).json(updatedUser)
    } catch (err) {
        return handleErrorResponse(
            ERROR_CODE.INTERNAL_SERVER_ERROR,
            res,
            err.message
        )
    }
}
