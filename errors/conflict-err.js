class ConflictError extends Error {
  constructor(message = 'Аккаунт уже существует') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
