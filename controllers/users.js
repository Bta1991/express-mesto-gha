const User = require('../models/user') // путь к модели пользователя

const handleErrorResponse = (code, res, errorMessage) => {
    if (!code) {
        res.status(500).json({ error: errorMessage })
    }
    res.status(code).json({ error: errorMessage })
}

// Обработчик для получения всех пользователей
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (err) {
        return handleErrorResponse(res, err)
    }
}

// Обработчик для получения пользователя по ID
exports.getUserById = async (req, res) => {
    const { userId } = req.params
    try {
        const user = await User.findById(userId)
        if (!user) {
            return handleErrorResponse(404, res, 'Такого пользователя нет')
        }
        return res.status(200).json(user)
    } catch (err) {
        return handleErrorResponse(res, err)
    }
}

// Обработчик для создания нового пользователя
exports.createUser = async (req, res) => {
    const { name, about, avatar } = req.body
    console.log({ name, about, avatar })
    try {
        if (!name || !about || !avatar) {
            return handleErrorResponse(
                400,
                res,
                'Не все обязательные поля заполнены'
            )
        }

        const newUser = await User.create({ name, about, avatar })
        return res.status(201).json(newUser)
    } catch (err) {
        return handleErrorResponse(res, err)
    }
}

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
            return handleErrorResponse(404, res, 'Такого пользователя нет')
        }
        return res.status(200).json(updatedUser)
    } catch (err) {
        return handleErrorResponse(res, err)
    }
}

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
            return handleErrorResponse(404, res, 'Такого пользователя нет')
        }
        return res.status(200).json(updatedUser)
    } catch (err) {
        return handleErrorResponse(res, err)
    }
}
