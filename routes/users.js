const express = require('express')

const router = express.Router()
const userController = require('../controllers/users') //  путь к контроллеру пользователей

// GET / — возвращает всех пользователей
router.get('/', userController.getAllUsers)

// GET /:userId - возвращает пользователя по _id
router.get('/:userId', userController.getUserById)

// POST / — создаёт пользователя
router.post('/', userController.createUser)

// PATCH /me — обновляет профиль
router.patch('/me', userController.updateUserProfile);

// PATCH /me/avatar — обновляет аватар
router.patch('/me/avatar', userController.updateUserAvatar);

module.exports = router