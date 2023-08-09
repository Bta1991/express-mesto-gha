const { ERROR_CODE, handleErrorResponse } = require('./errorUtils'); // Путь к errorUtils.js

const handleUndefinedRoute = (req, res) => handleErrorResponse(ERROR_CODE.NOT_FOUND, res, 'Маршрут не найден');

module.exports = {
  handleUndefinedRoute,
};
