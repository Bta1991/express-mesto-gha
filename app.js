const express = require('express');
const mongoose = require('mongoose');

// Слушаем 3000 порт

const { PORT = 3000, MONGO_DB = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

// подключаемся к серверу mongo
mongoose.connect(MONGO_DB);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
