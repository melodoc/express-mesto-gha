const errors = require('../constants/errors');

const { STATUS_CODE } = errors;

class ErrorRejectHelper {
  constructor() {
    this.ERROR_TYPES = {
      cast: 'CastError',
      validity: 'ValidationError',
    };

    this.defaultErrorObject = {
      code: STATUS_CODE.internalServerError,
      message: 'внутренняя ошибка сервера',
    };

    this.castErrorObject = {
      code: STATUS_CODE.badRequest,
      message: 'одно или более свойств не могут быть распознаны.',
    };

    this.validationErrorObject = {
      ...this.castErrorObject,
      message: 'некорректный тип данных, длина поля или не хватает обязательных полей',
    };
  }

  getRejectErrorByName(name) {
    switch (name) {
      case this.ERROR_TYPES.cast: {
        return this.castErrorObject;
      }
      case this.ERROR_TYPES.validity: {
        return this.validationErrorObject;
      }
      default:
        return this.defaultErrorObject;
    }
  }
}

const errorRejectHandler = (res, err) => {
  const errorRejectHelper = new ErrorRejectHelper();
  const error = errorRejectHelper.getRejectErrorByName(err.name);

  res.status(error.code).send({ message: `Произошла ошибка: ${error.message}` });
};

module.exports = { errorRejectHandler };
