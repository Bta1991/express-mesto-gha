const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRouter = require('./routes/users') // путь к роутеру пользователей
const cardRouter = require('./routes/cards') // путь к роутеру пользователей
const { handleUndefinedRoute } = require('./utils/errorHandleRoute') // Путь к errorMiddleware.js

const { PORT = 3000, MONGO_DB = 'mongodb://127.0.0.1:27017/mestodb' } =
    process.env

const app = express()

// Middleware для разбора JSON-тела запросов
// app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// хардкод пользователя
app.use((req, res, next) => {
    req.user = {
        _id: '64d2b7b84f949cddedf4c307', // вставьте сюда _id созданного в предыдущем пункте пользователя
    }

    next()
})

// Роутинг юзеров
app.use(userRouter)
app.use(cardRouter)

// Проверка роутинга
app.use(handleUndefinedRoute)

// подключаемся к серверу mongo
mongoose.connect(MONGO_DB)

// Слушаем 3000 порт
app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})
