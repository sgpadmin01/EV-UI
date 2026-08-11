const securityHeaders = (req, res, next) => {
  // Prevent clickjacking by preventing page from being framed
  res.setHeader("X-Frame-Options", "DENY");

  // Prevent browsers from MIME-sniffing a response away from the declared content-type
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Control how much referrer information is passed with requests
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Restrict Flash and PDF files from loading resources across domains
  res.setHeader("X-Permitted-Cross-Domain-Policies", "none");

  // Configure a secure Content Security Policy (CSP)
  // Allows native self-hosted assets, required CDN scripts/styles/fonts, and inline scripts
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
