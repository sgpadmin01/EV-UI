export const securityHeaders = (req, res, next) => {
  // Remove X-Powered-By to prevent technology fingerprinting
  res.removeHeader("X-Powered-By");

  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Prevent clickjacking attacks
  res.setHeader("X-Frame-Options", "DENY");

  // Enable XSS filtering in older browsers
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Control referrer information sent in requests
  res.setHeader("Referrer-Policy", "no-referrer");

  // Content Security Policy (CSP) tailored for EAV HMI client needs
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';"
  );

  next();
};
