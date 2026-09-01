/**
 * Security headers middleware to protect against common web vulnerabilities:
 * - X-Content-Type-Options: Prevents MIME-sniffing
 * - X-Frame-Options: Protects against clickjacking
 * - X-XSS-Protection: Enables legacy XSS filter in browsers
 * - Referrer-Policy: Controls referrer information sent in HTTP requests
 */
export const securityHeaders = (req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
};
