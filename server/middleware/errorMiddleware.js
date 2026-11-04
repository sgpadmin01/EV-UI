const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  // Security: Fail securely by withholding stack traces unless explicitly in development mode.
  // This prevents information disclosure (internal file paths, system layout) when NODE_ENV is unset or in staging/production.
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

export { notFound, errorHandler };
