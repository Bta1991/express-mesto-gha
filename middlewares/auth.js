const jwt = require('jsonwebtoken'); // импортируем JSONwebtoken
const UnauthorizedError = require('../errors/unauthorized-err');

const { JWT_SECRET = 'your-secret-key' } = process.env;

// мидлвэр будет проверять токен в заголовках запроса и добавлять пейлоуд токена в объект запроса
const authMiddleware = (req, res, next) => {
  // Получаем токен из куки
  const { token } = req.cookies;

  // Проверяем наличие токена
  if (!token) {
    return next(
      new UnauthorizedError('Токен отсутствует. Авторизация не выполнена.'),
    );
  }

  // Верифицируем токен и получаем пейлоуд
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (error) {
    return next(
      new UnauthorizedError('Токен недействителен. Авторизация не выполнена.'),
    );
  }
};

module.exports = authMiddleware;
