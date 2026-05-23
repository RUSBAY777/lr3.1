const ERROR_CODES = {
  EMAIL_TAKEN: "EMAIL_TAKEN",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  REVIEW_NOT_FOUND: "REVIEW_NOT_FOUND",
  GAME_NOT_FOUND: "GAME_NOT_FOUND",
  FORBIDDEN: "FORBIDDEN",
  NO_FIELDS_TO_UPDATE: "NO_FIELDS_TO_UPDATE"
};

function createAppError(code, message = code) {
  const err = new Error(message);
  err.code = code;
  return err;
}

module.exports = { ERROR_CODES, createAppError };
