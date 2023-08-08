const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRouter = require('./routes/users') // путь к роутеру пользователей

const { PORT = 3000, MONGO_DB = 'mongodb://127.0.0.1:27017/mestodb' } =
    process.env

const app = express()

// Middleware для разбора JSON-тела запросов
// app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Роутинг юзеров
app.use(userRouter)

// подключаемся к серверу mongo
mongoose.connect(MONGO_DB)

// Слушаем 3000 порт
app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})
