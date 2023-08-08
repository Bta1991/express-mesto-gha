const User = require('../models/user') // путь к модели пользователя

// Функция для обработки ошибок
const handleErrorResponse = (res) =>
    res.status(500).json(res.messasge)

// Обработчик для получения всех пользователей
// exports.getAllUsers = async (req, res) => {
//     try {
//         const user = await User.find()
//         return res.status(200).json(user)
//     } catch (err) {
//         return handleErrorResponse(res)
//     }
// }

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
};


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
        return handleErrorResponse(res)
    }
}

// Обработчик для создания нового пользователя
exports.createUser = async (req, res) => {
    const { name, about, avatar } = req.body
    try {
        const newUser = await User.create({ name, about, avatar })
        return res.status(201).json(newUser)
    } catch (err) {
        return handleErrorResponse(res)
    }
}



// module.exports.createFilm = (req, res) => {
//   const { title, genre, directorId } = req.body;

//   Film.create({ title, genre, director: directorId })
//     .then(film => res.send({ data: film }))
//     .catch(err => res.status(500).send({ message: err.message }));
// };
