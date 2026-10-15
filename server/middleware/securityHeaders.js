/**
 * Sentinel Security Middleware
 * Protects the application by enforcing secure HTTP response headers.
 */
const securityHeaders = (req, res, next) => {
  // Prevent clickjacking attacks by forbidding framing of this application
  res.setHeader("X-Frame-Options", "DENY");

  // Prevent browsers from MIME-sniffing a response away from the declared content-type
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Protect user privacy by not sending Referer headers
  res.setHeader("Referrer-Policy", "no-referrer");

  // Enforce Content Security Policy (CSP) to mitigate Cross-Site Scripting (XSS)
  // and resource injection vulnerabilities.
  const cspPolicies = [
    "default-src 'self'",
    // Allows self-hosted scripts and the external Lucide Icon CDN used by index.html/navigation.html
    "script-src 'self' 'unsafe-inline' https://unpkg.com",
    // Allows self-hosted styles, Google Fonts styles, and inline style blocks
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    // Allows Google Fonts fonts
    "font-src 'self' https://fonts.gstatic.com",
    // Restricts images to self-hosted images and data URIs (e.g., inline SVGs)
    "img-src 'self' data:",
    // Restricts connections to self (API routes)
    "connect-src 'self'",
    // Prevents framing of the site
    "frame-ancestors 'none'",
  ];

  res.setHeader("Content-Security-Policy", cspPolicies.join("; "));

  next();
};

export default securityHeaders;
