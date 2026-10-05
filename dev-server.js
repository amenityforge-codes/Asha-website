/**
 * ASHA Website — Local Development Server
 * Serves static HTML/CSS/JS and routes /api/contact and /api/membership
 * using Node.js built-in modules (zero npm dependencies).
 *
 * Usage: node dev-server.js [port]
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

// Simple built-in .env parser
function loadEnv() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;
  try {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
        if (key && !process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  } catch (err) {
    console.warn("Could not read .env file:", err.message);
  }
}

loadEnv();

const contactHandler = require("./api/contact");
const membershipHandler = require("./api/membership");

const PORT = parseInt(process.env.PORT || process.argv[2] || "3000", 10);
const ROOT = path.resolve(__dirname);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".txt": "text/plain; charset=utf-8"
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = url.pathname;

  // 1. API Route: Contact
  if (pathname === "/api/contact") {
    try {
      await contactHandler(req, res);
    } catch (err) {
      console.error("API Contact Exception:", err);
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: false, error: "Internal server error." }));
    }
    return;
  }

  // 2. API Route: Membership
  if (pathname === "/api/membership") {
    try {
      await membershipHandler(req, res);
    } catch (err) {
      console.error("API Membership Exception:", err);
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: false, error: "Internal server error." }));
    }
    return;
  }

  // 3. Static Files
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  let filePath = pathname === "/" ? "/index.html" : pathname;
  filePath = path.normalize(path.join(ROOT, filePath));

  // Security: prevent directory traversal outside ROOT
  if (!filePath.startsWith(ROOT)) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  // If path is a directory, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("404 Not Found");
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  res.statusCode = 200;
  res.setHeader("Content-Type", contentType);

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`ASHA local server running at http://localhost:${PORT}`);
  console.log(`- API endpoints: http://localhost:${PORT}/api/contact, http://localhost:${PORT}/api/membership`);
  console.log(`- Provider mode: ${process.env.FORM_PROVIDER || "(default mock/local)"}`);
});
