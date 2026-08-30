/**
 * Security middleware to set baseline HTTP security headers.
 * Protects against MIME-type sniffing, clickjacking, XSS attacks, and information disclosure.
 */
export const securityHeaders = (req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "0");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
};
