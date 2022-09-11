const STATUS_CODE = {
  badRequest: 400,
  notFound: 404,
  internalServerError: 500,
};

const errorHandler = (res, err) => {
  res.status(STATUS_CODE.internalServerError).send({ message: `Произошла ошибка ${err.message}` });
};

module.exports = { STATUS_CODE, errorHandler };
