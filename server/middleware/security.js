/**
 * Security headers middleware to enhance application HTTP security.
 */
const securityHeaders = (req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  // Protect against clickjacking
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  // Enable XSS protection filter in legacy browsers
  res.setHeader("X-XSS-Protection", "1; mode=block");
  // Limit referrer info sent on cross-origin requests
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
};

export default securityHeaders;
