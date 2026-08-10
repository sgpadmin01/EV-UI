const securityHeaders = (req, res, next) => {
  // Prevent clickjacking by restricting embedding to SAMEORIGIN
  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  // Prevent MIME-type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Prevent Cross-Site Scripting (XSS) in legacy browsers
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Prevent leaking referral info to third parties
  res.setHeader("Referrer-Policy", "same-origin");

  // Apply robust Content Security Policy aligned with the CDNs used in this project
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' unpkg.com; " +
    "style-src 'self' 'unsafe-inline' fonts.googleapis.com; " +
    "font-src 'self' fonts.gstatic.com; " +
    "img-src 'self' data:; " +
    "connect-src 'self'; " +
    "frame-ancestors 'self';"
  );

  next();
};

export { securityHeaders };
