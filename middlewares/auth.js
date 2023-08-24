const jwt = require('jsonwebtoken'); // импортируем JSONwebtoken
const UnauthorizedError = require('../errors/unauthorized-err');

const { JWT_SECRET = 'your-secret-key' } = process.env;

// мидлвэр будет проверять токен в заголовках запроса и добавлять пейлоуд токена в объект запроса
const authMiddleware = (req, res, next) => {
  // Получаем токен из заголовков
  const token = req.header('Authorization');

  // Проверяем наличие токена
  if (!token) {
    return next(
      new UnauthorizedError('Токен отсутствует. Авторизация не выполнена.'),
    );
  }

  // Верифицируем токен и получаем пейлоуд
  jwt.verify(token, JWT_SECRET, (error, payload) => {
    if (error) {
      return next(
        new UnauthorizedError('Токен недействителен. Авторизация не выполнена.'),
      );
    }
    // Добавляем пейлоуд в объект запроса
    req.user = payload;
    // Продолжаем выполнение следующего мидлвэра
    return next();
  });
  // Добавляем оператор return для возврата значения
  return null;
};

module.exports = authMiddleware;
