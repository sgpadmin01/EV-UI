/**
 * Security headers middleware to mitigate common web security risks.
 * Sets headers for MIME-sniffing prevention, clickjacking defense,
 * XSS filtering, and referrer leakage control.
 */
export const securityHeaders = (req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
};
