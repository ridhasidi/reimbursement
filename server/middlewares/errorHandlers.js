function errorHandlers(err, req, res, next) {
  let code = 500;
  let msg = "Internal server error";
  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    msg = err.errors[0].message;
  } else if (err.name === "JsonWebTokenError" || err.message === "INVALID_TOKEN") {
    code = 401;
    msg = "Invalid Token";
  } else if (err.message === "UNAUTHORIZED") {
    code = 403;
    msg = "Not authorized";
  } else if (err.message === "INVALID_USER_OR_PASSWORD") {
    code = 401;
    msg = "Invalid user or password";
  } else if (err.message === "USER_NOT_FOUND") {
    code = 404;
    msg = "User not found";
  }
  console.log(err);
  res.status(code).json({ message: msg });
}

module.exports = errorHandlers;
