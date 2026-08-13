/**
 * Custom Security Headers Middleware
 * Protects the application from common web vulnerabilities and information disclosure.
 */
const securityHeaders = (req, res, next) => {
  // Prevent clickjacking by restricting framing to only our own origin
  res.setHeader("X-Frame-Options", "DENY");

  // Prevent MIME-sniffing by instructing browsers to adhere to declared Content-Types
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Mitigate information leakage via the Referer header
  res.setHeader("Referrer-Policy", "no-referrer");

  // Implement Content Security Policy (CSP) to restrict resource origins.
  // This allows the HMI client app to load Lucide icons via CDN (unpkg.com)
  // and Google Fonts via unpkg/fonts.googleapis.com and fonts.gstatic.com.
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://unpkg.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data:; " +
    "connect-src 'self';"
  );

  next();
};

export default securityHeaders;
