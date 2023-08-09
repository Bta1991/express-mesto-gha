const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes/routes');


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
app.use(routes);

// подключаемся к серверу mongo
mongoose.connect(MONGO_DB)

// Слушаем 3000 порт
app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})
