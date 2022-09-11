const STATUS_CODE = {
  badRequest: 400,
  notFound: 404,
  internalServerError: 500,
};

const MESSAGE_TYPE = {
  cast: 'Одно или более свойств не могут быть распознаны.',
  validity: 'Некорректный тип данных, длина поля или не хватает обязательных полей',
  absentedUser: 'Пользователь с указанным id не найден',
  absentedCard: 'Карточка с указанным id не найдена',
  default: 'Внутренняя ошибка сервера',
};

const ERROR_TYPE = {
  cast: 'CastError',
  validity: 'ValidationError',
};

module.exports = {
  STATUS_CODE, ERROR_TYPE, MESSAGE_TYPE,
};
