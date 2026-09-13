/**
 * Security Headers Middleware
 * Sets HTTP security headers to protect against common web vulnerabilities
 * (MIME-type sniffing, clickjacking, XSS, and information disclosure).
 */
export const securityHeaders = (req, res, next) => {
  // Prevent MIME-type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Prevent framing / clickjacking attacks
  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  // Enable legacy XSS filter protection in browsers
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Control referrer information sent in HTTP headers
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Enforce HTTP Strict Transport Security
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  next();
};
