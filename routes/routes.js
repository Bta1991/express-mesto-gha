const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const userController = require('../controllers/users'); // Путь к контроллеру пользователей
const authMiddleware = require('../middlewares/auth'); // Путь к auth.js
const { handleUndefinedRoute } = require('../utils/errorHandleRoute'); // Путь к errorUtils.js

// Роуты авторизации и регистрации
router.post('/signin', userController.login);
router.post('/signup', userController.createUser);

// Применяем мидлвэр проверки авторизации ко всем маршрутам, кроме /signin и /signup
router.use(authMiddleware);

// Роуты пользователей и карточек
router.use('/users', userRouter);
router.use('/cards', cardRouter);

// Обработка запросов, которые не соответствуют ни одному маршруту
router.use((req, res) => handleUndefinedRoute(req, res));

module.exports = router;
