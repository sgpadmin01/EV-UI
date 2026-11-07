const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Security: Fail securely by only exposing stack traces in development mode.
  // When NODE_ENV is unset, test, staging, or production, avoid leaking sensitive
  // internal paths, architecture, and dependency versions.
  const response = {
    message: err.message,
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.json(response);
};

export { notFound, errorHandler };
