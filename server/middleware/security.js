/**
 * Security middleware to set HTTP headers for defense in depth.
 */
const securityHeaders = (req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Prevent clickjacking by denying iframe embedding
  res.setHeader("X-Frame-Options", "DENY");

  // Disable XSS Auditor in legacy browsers (recommended standard setting)
  res.setHeader("X-XSS-Protection", "0");

  // Control referrer information sent in requests
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Restrict sensitive browser features
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  next();
};

export { securityHeaders };
