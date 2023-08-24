const router = require('express').Router();
const { celebrate, errors } = require('celebrate'); // Подключаем celebrate и Joi
const {
  signupValidationSchema,
  signinValidationSchema,
} = require('../models/validation-joi'); // Импорт схемы валидации
const userRouter = require('./users');
const cardRouter = require('./cards');
const userController = require('../controllers/users'); // Путь к контроллеру пользователей
const authMiddleware = require('../middlewares/auth'); // Путь к auth.js

const NotFoundError = require('../errors/not-found-err');

const errorHandler = require('../middlewares/error-handler');

// Роуты авторизации и регистрации
router.post('/signin', celebrate(signinValidationSchema), userController.login);
router.post(
  '/signup',
  celebrate(signupValidationSchema),
  userController.createUser,
);

// Применяем мидлвэр проверки авторизации ко всем маршрутам, кроме /signin и /signup
router.use(authMiddleware);

// Роуты пользователей и карточек
router.use('/users', userRouter);
router.use('/cards', cardRouter);

// Обработка запросов, которые не соответствуют ни одному маршруту
router.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

router.use(errors());

router.use(errorHandler);

module.exports = router;
