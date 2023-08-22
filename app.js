const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes/routes');

const { PORT = 3000, MONGO_DB = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

// лимитер для защиты от DDOS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Превышено количество запросов на сервер',
});

// включаем внешние мидлверы
app.use(limiter);
app.use(helmet());
app.use(cors());

// Middleware для разбора JSON-тела запросов
// app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Основной роутинг
app.use(routes);

// подключаемся к серверу mongo
mongoose.connect(MONGO_DB);

// Слушаем 3000 порт
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`); // eslint-disable-line
});
