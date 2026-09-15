/**
 * Middleware to apply standard HTTP security headers and remove server fingerprinting headers.
 */
const securityHeaders = (req, res, next) => {
  // Disable X-Powered-By header to prevent technology disclosure
  res.removeHeader("X-Powered-By");

  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Mitigate clickjacking attacks
  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  // Enable browser XSS filtering
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Control referrer information sent in HTTP headers
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  next();
};

export default securityHeaders;
