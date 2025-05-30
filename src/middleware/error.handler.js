// Generic error handler middleware
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.send(status, {
    error: err.name || 'Error',
    message: err.message || 'An unexpected error occurred.',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

// 404 Not Found handler
const notFoundHandler = (req, res, next) => {
  res.send(404, {
    error: 'Not Found',
    message: `The requested URL ${req.url} was not found on this server.`,
  });
};

// 400 Bad Request handler
const badRequestHandler = (msg = 'Bad Request') => (req, res, next) => {
  res.send(400, {
    error: 'Bad Request',
    message: msg,
  });
};

// 401 Unauthorized handler
const unauthorizedHandler = (msg = 'Unauthorized') => (req, res, next) => {
  res.send(401, {
    error: 'Unauthorized',
    message: msg,
  });
};

// 403 Forbidden handler
const forbiddenHandler = (msg = 'Forbidden') => (req, res, next) => {
  res.send(403, {
    error: 'Forbidden',
    message: msg,
  });
};

module.exports = {
  errorHandler,
  notFoundHandler,
  badRequestHandler,
  unauthorizedHandler,
  forbiddenHandler,
};

