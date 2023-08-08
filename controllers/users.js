const User = require('../models/user') // путь к модели пользователя

const handleErrorResponse = (res, error) => {
    console.error(error) // Логируем ошибку для отладки
    return res.status(500).json({ message: 'Произошла ошибка на сервере' })
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
            return res.status(404).json({ error: 'Такого пользователя нет' })
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
            return res
                .status(400)
                .json({ message: 'Не все обязательные поля заполнены' })
        }

        const newUser = await User.create({ name, about, avatar })
        return res.status(201).json(newUser)
    } catch (err) {
        return handleErrorResponse(res, err)
    }
}

// exports.createUser = async (req, res) => {
//   try {
//     const { name, about, avatar } = req.body;
//     if (!name || !about || !avatar) {
//       return res.status(400).json({ message: 'Не все обязательные поля заполнены' });
//     }

//     const newUser = await User.create({ name, about, avatar });
//     return res.status(201).json(newUser);
//   } catch (err) {
//     return handleErrorResponse(res, err);
//   }
// };
