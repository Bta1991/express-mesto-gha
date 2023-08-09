const router = require('express').Router()
const userRouter = require('./users')
const cardRouter = require('./cards')
const { handleUndefinedRoute } = require('../utils/errorHandleRoute') // Путь к errorUtils.js

router.use('/users', userRouter)
router.use('/cards', cardRouter)

// Обработка запросов, которые не соответствуют ни одному маршруту
router.use((req, res) => handleUndefinedRoute(req, res));

module.exports = router
