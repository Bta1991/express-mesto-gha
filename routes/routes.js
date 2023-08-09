const router = require('express').Router()
const userRouter = require('./users')
const cardRouter = require('./cards')
// const { ERROR_CODE, handleErrorResponse } = require('../utils/errorUtils') // Путь к errorUtils.js


router.use('/users', userRouter)
router.use('/cards', cardRouter)

// router.use('*', (req, res, next) => {
//     next(new handleErrorResponse('Страница не найдена'))
// })

module.exports = router
