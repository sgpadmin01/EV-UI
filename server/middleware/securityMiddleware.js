/**
 * Custom Security Middleware to set secure HTTP headers and remove info disclosure headers.
 * Implements Defense-in-Depth without relying on third-party security libraries.
 */
const securityMiddleware = (req, res, next) => {
  // Remove X-Powered-By to prevent software version fingerprinting
  res.removeHeader("X-Powered-By");

  // Prevent Clickjacking attacks
  res.setHeader("X-Frame-Options", "DENY");

  // Prevent MIME-sniffing vulnerabilities
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Control how much referrer information is sent with requests
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Enable legacy XSS filtering in browsers that support it
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Implement Content Security Policy (CSP) to mitigate XSS and injection attacks.
  // Must allow fonts from Google Fonts and scripts from unpkg.com (for Lucide icons).
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://unpkg.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'"
  ];
  res.setHeader("Content-Security-Policy", cspDirectives.join("; "));

  next();
};

export default securityMiddleware;
