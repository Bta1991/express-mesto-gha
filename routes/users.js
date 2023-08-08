const express = require('express')

const router = express.Router()
const userController = require('../controllers/users') //  путь к контроллеру пользователей

// GET /users — возвращает всех пользователей
router.get('/users', userController.getAllUsers)

// GET /users/:userId - возвращает пользователя по _id
router.get('/users/:userId', userController.getUserById)

// POST /users — создаёт пользователя
router.post('/users', userController.createUser)

// PATCH /users/me — обновляет профиль
router.patch('/users/me', userController.updateUserProfile);

// PATCH /users/me/avatar — обновляет аватар
router.patch('/users/me/avatar', userController.updateUserAvatar);

module.exports = router
