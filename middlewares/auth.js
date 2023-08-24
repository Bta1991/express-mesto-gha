const jwt = require('jsonwebtoken'); // импортируем JSONwebtoken
const UnauthorizedError = require('../errors/unauthorized-err');

const { JWT_SECRET = 'your-secret-key' } = process.env;

// мидлвэр будет проверять токен в заголовках запроса и добавлять пейлоуд токена в объект запроса
const authMiddleware = (req, res, next) => {
  const { cookies } = req;

  if (!cookies || !cookies.token) {
    return next(
      new UnauthorizedError('Токен отсутствует. Авторизация не выполнена.'),
    );
  }
  // Получаем токен из куки
  const { token } = req.cookies;

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
