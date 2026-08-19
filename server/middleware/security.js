/**
 * Security middleware to set essential HTTP security headers
 * and protect against common web vulnerabilities like clickjacking and MIME-sniffing.
 */
const securityHeaders = (req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  // Protect against clickjacking attacks
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  // Enable XSS filtering in legacy browsers
  res.setHeader("X-XSS-Protection", "1; mode=block");
  // Limit referrer information sent with requests
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  next();
};

export default securityHeaders;
