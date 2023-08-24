const jwt = require('jsonwebtoken'); // импортируем JSONwebtoken
const UnauthorizedError = require('../errors/unauthorized-err');

const { JWT_SECRET = 'your-secret-key' } = process.env;

// мидлвэр будет проверять токен в заголовках запроса и добавлять пейлоуд токена в объект запроса
module.exports = (req, res, next) => {
  const { token } = req.cookies;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация.'));
  }
  req.user = payload;
  next();
};
