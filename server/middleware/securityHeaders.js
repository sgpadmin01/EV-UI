/**
 * Custom middleware to set security-related HTTP headers.
 * Protects against clickjacking, MIME sniffing, and cross-site scripting risks.
 */
const securityHeaders = (req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Prevent framing to protect against Clickjacking
  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  // Enable legacy XSS filter in browsers
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Restrict referrer information sent on cross-origin requests
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  next();
};

export default securityHeaders;
