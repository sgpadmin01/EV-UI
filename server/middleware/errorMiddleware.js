const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Security: Fail securely by only exposing stack traces when explicitly in development.
  // When NODE_ENV is unset, production, test, or staging, stack traces must not be leaked to clients.
  const response = {
    message: err.message,
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.json(response);
};

export { notFound, errorHandler };
