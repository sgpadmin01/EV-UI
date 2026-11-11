/**
 * Security headers middleware
 * Sets defensive HTTP headers to safeguard against common web vulnerabilities
 * without introducing external dependencies.
 */
const securityHeaders = (req, res, next) => {
  // Prevent MIME-sniffing attacks
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Prevent clickjacking by restricting framing to same origin
  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  // Legacy protection against reflective cross-site scripting (XSS)
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Control referrer information sent in HTTP requests
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Restrict browser features and APIs not needed by the HMI client
  res.setHeader("Permissions-Policy", "geolocation=(), camera=(), microphone=()");

  next();
};

export default securityHeaders;
