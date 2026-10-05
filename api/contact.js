/**
 * Serverless API Endpoint: /api/contact
 * Handles contact form submissions for the Star Hotels Association of Andhra Pradesh.
 */

const { processSubmission } = require("./_lib/dispatcher");

async function readBody(req) {
  if (req.body) {
    if (typeof req.body === "string") {
      try {
        return JSON.parse(req.body);
      } catch (e) {
        return null;
      }
    }
    return req.body;
  }
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1e6) {
        req.destroy();
        resolve(null);
      }
    });
    req.on("end", () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        resolve(null);
      }
    });
    req.on("error", () => resolve(null));
  });
}

function sendResponse(res, status, data) {
  if (typeof res.status === "function") {
    res.status(status).json(data);
  } else {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  }
}

module.exports = async function handler(req, res) {
  // Enforce POST method
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendResponse(res, 405, {
      ok: false,
      error: "Method not allowed. Use POST."
    });
  }

  const body = await readBody(req);
  if (!body || typeof body !== "object") {
    return sendResponse(res, 400, {
      ok: false,
      error: "Malformed request payload. Expected JSON."
    });
  }

  const result = await processSubmission("contact", body);
  return sendResponse(res, result.status, result);
};
