const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Error handling middleware
// SECURITY CONCERN: Exposing full stack traces in non-development environments leaks sensitive
// internal architecture details (e.g., file paths, module structures).
// Stack traces are strictly restricted to 'development' mode; in production or unset NODE_ENV, stack is set to null.
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

export { notFound, errorHandler };
