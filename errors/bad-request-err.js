class BadRequestError extends Error {
  constructor(message = 'Некорректный тип данных, длина поля или не хватает обязательных полей') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
