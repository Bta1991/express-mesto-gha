const express = require('express')

const router = express.Router()
const userController = require('../controllers/users') //  путь к контроллеру пользователей

// GET /users — возвращает всех пользователей
router.get('/users', userController.getAllUsers)

// GET /users/:userId - возвращает пользователя по _id
router.get('/users/:userId', userController.getUserById)

// POST /users — создаёт пользователя
router.post('/users', userController.createUser)

module.exports = router
