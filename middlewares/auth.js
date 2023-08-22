const jwt = require('jsonwebtoken'); // импортируем JSONwebtoken
const { ERROR_CODE, handleErrorResponse } = require('../utils/errorUtils');

const { JWT_SECRET = 'your-secret-key' } = process.env;

// мидлвэр будет проверять токен в заголовках запроса и добавлять пейлоуд токена в объект запроса
const authMiddleware = (req, res, next) => {
  // Получаем токен из заголовков
  const token = req.header('Authorization');

  // Проверяем наличие токена
  if (!token) {
    return handleErrorResponse(ERROR_CODE.UNAUTHORIZED, res, 'Токен отсутствует. Авторизация не выполнена.');
  }

  try {
    // Верифицируем токен и получаем пейлоуд
    const payload = jwt.verify(token, JWT_SECRET);

    // Добавляем пейлоуд в объект запроса
    req.user = payload;

    // Продолжаем выполнение следующего мидлвэра
    return next();
  } catch (error) {
    // Если токен не верен, возвращаем ошибку 401
    return handleErrorResponse(ERROR_CODE.UNAUTHORIZED, res, 'Токен недействителен. Авторизация не выполнена.');
  }
};

module.exports = authMiddleware;
