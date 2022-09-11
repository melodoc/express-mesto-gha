const { STATUS_CODE, ENTITY_TYPE } = require('../constants/errors');

class ErrorEntityHelper {
  constructor() {
    this.defaultErrorObject = {
      code: STATUS_CODE.notFound,
      message: 'Сущность с указанным id не найдена',
    };
  }

  getEntityErrorByName(entityType) {
    switch (entityType) {
      case ENTITY_TYPE.card: {
        return { ...this.defaultErrorObject, message: 'Карточка с указанным id не найдена' };
      }
      case ENTITY_TYPE.user: {
        return { ...this.defaultErrorObject, message: 'Пользователь с указанным id не найден' };
      }
      default:
        return this.defaultErrorObject;
    }
  }
}

const errorEntityHandler = (res, entityType) => {
  const errorRejectHelper = new ErrorEntityHelper();
  const error = errorRejectHelper.getEntityErrorByName(entityType);

  res.status(error.code).send({ message: `Произошла ошибка: ${error.message}` });
};

module.exports = { errorEntityHandler };
