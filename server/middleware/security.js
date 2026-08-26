// Security headers middleware to enhance app security against common web vulnerabilities
const securityHeaders = (req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  // Prevent clickjacking by restricting framing
  res.setHeader("X-Frame-Options", "DENY");
  // Enable XSS filtering in legacy browsers
  res.setHeader("X-XSS-Protection", "1; mode=block");
  // Restrict referrer information sent with requests
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
};

export default securityHeaders;
