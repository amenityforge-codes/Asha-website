/**
 * ASHA Website — Form Submission & Dispatcher Module
 * Server-side validation, honeypot protection, application ID generation,
 * and secure provider dispatching without hardcoded credentials.
 */

const crypto = require("crypto");

const AP_DISTRICTS = [
  "Alluri Sitharama Raju",
  "Anakapalli",
  "Ananthapuramu",
  "Annamayya",
  "Bapatla",
  "Chittoor",
  "Dr. B.R. Ambedkar Konaseema",
  "East Godavari",
  "Eluru",
  "Guntur",
  "Kakinada",
  "Krishna",
  "Kurnool",
  "Nandyal",
  "NTR",
  "Palnadu",
  "Parvathipuram Manyam",
  "Prakasam",
  "Sri Potti Sriramulu Nellore",
  "Sri Sathya Sai",
  "Srikakulam",
  "Tirupati",
  "Visakhapatnam",
  "Vizianagaram",
  "West Godavari",
  "YSR Kadapa"
];

const ROLES = [
  "Member hotel",
  "Prospective member",
  "Government or statutory body",
  "Industry partner",
  "Press or public"
];

const CATEGORIES = ["hotel", "industry", "institution"];
const HOTEL_CLASSIFICATIONS = ["3-star", "4-star", "5-star"];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanString(val, maxLen) {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, maxLen);
}

function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.length > 254) return false;
  return EMAIL_REGEX.test(trimmed);
}

function generateApplicationId() {
  const year = new Date().getFullYear();
  const randomSegment = crypto.randomBytes(2).toString("hex").toUpperCase();
  return `ASHA-MEM-${year}-${randomSegment}`;
}

/**
 * Validates Contact form payload
 */
function validateContact(body) {
  const name = cleanString(body.name, 200);
  const org = cleanString(body.org, 200);
  const role = cleanString(body.role, 100);
  const email = cleanString(body.email, 254);
  const phone = cleanString(body.phone, 50);
  const message = cleanString(body.message, 5000);
  const privacy = Boolean(body.privacy);

  if (!name) return { valid: false, error: "Please provide your full name." };
  if (!org) return { valid: false, error: "Please provide your hotel or organisation name." };
  if (!role || !ROLES.includes(role)) return { valid: false, error: "Please select a valid role." };
  if (!isValidEmail(email)) return { valid: false, error: "Please provide a valid email address." };
  if (!message) return { valid: false, error: "Please provide your enquiry message." };
  if (!privacy) return { valid: false, error: "Privacy consent is mandatory to process your enquiry." };

  return {
    valid: true,
    data: { name, org, role, email, phone, message, privacy, submittedAt: new Date().toISOString() }
  };
}

/**
 * Validates Membership Application form payload
 */
function validateMembership(body) {
  const name = cleanString(body.name, 200);
  const org = cleanString(body.org, 200);
  const category = cleanString(body.category, 50);
  const classification = cleanString(body.classification, 50);
  const city = cleanString(body.city, 100);
  const district = cleanString(body.district, 100);
  const email = cleanString(body.email, 254);
  const phone = cleanString(body.phone, 50);
  const message = cleanString(body.message, 5000);
  const privacy = Boolean(body.privacy);

  if (!name) return { valid: false, error: "Please provide applicant name." };
  if (!org) return { valid: false, error: "Please provide hotel or organisation name." };
  if (!category || !CATEGORIES.includes(category)) return { valid: false, error: "Please select a valid membership category." };
  
  if (category === "hotel") {
    if (!classification || !HOTEL_CLASSIFICATIONS.includes(classification)) {
      return { valid: false, error: "Hotels must specify a valid star classification (3-star, 4-star, or 5-star)." };
    }
  }

  if (!city) return { valid: false, error: "Please provide city or municipality." };
  if (!district || !AP_DISTRICTS.includes(district)) return { valid: false, error: "Please select a valid Andhra Pradesh district." };
  if (!isValidEmail(email)) return { valid: false, error: "Please provide a valid email address." };
  if (!phone) return { valid: false, error: "Please provide a contact phone number." };
  if (!privacy) return { valid: false, error: "Privacy consent is mandatory to process your application." };

  return {
    valid: true,
    data: {
      name,
      org,
      category,
      classification: category === "hotel" ? classification : "",
      city,
      district,
      email,
      phone,
      message,
      privacy,
      submittedAt: new Date().toISOString()
    }
  };
}

/**
 * Providers Implementation
 */
async function dispatchToProvider(type, data, applicationId) {
  const provider = (process.env.FORM_PROVIDER || "").toLowerCase().trim();
  const isProd = process.env.NODE_ENV === "production";

  // 1. Mock / Development Adapter
  if (provider === "mock" || provider === "test" || (!provider && !isProd)) {
    console.log(`[FORM MOCK ADAPTER] Received ${type} submission (Ref: ${applicationId || "N/A"}) at ${data.submittedAt}.`);
    return { ok: true, provider: "mock" };
  }

  // If in production without configured provider or missing destination
  if (!provider) {
    console.error("[FORM ERROR] No FORM_PROVIDER configured in production environment.");
    return {
      ok: false,
      error: `We could not submit your ${type === "membership" ? "application" : "enquiry"} right now. Please try again or contact the ASHA Secretariat directly.`
    };
  }

  // 2. Resend API Integration
  if (provider === "resend") {
    const apiKey = process.env.RESEND_API_KEY;
    const recipient = type === "membership" 
      ? (process.env.MEMBERSHIP_RECIPIENT_EMAIL || process.env.FORM_RECIPIENT_EMAIL)
      : (process.env.CONTACT_RECIPIENT_EMAIL || process.env.FORM_RECIPIENT_EMAIL);
    const sender = process.env.FORM_SENDER_EMAIL || "ASHA Portal <onboarding@resend.dev>";

    if (!apiKey || !recipient) {
      console.error("[FORM RESEND ERROR] Missing RESEND_API_KEY or recipient email in configuration.");
      return {
        ok: false,
        error: `We could not submit your ${type === "membership" ? "application" : "enquiry"} right now. Please try again or contact the ASHA Secretariat directly.`
      };
    }

    const subject = type === "membership"
      ? `[ASHA Membership Application] ${applicationId} — ${data.org} (${data.category})`
      : `[ASHA Secretariat Enquiry] ${data.org} — ${data.name} (${data.role})`;

    const textContent = type === "membership"
      ? `ASHA Membership Application Received\n` +
        `------------------------------------\n` +
        `Application Reference ID: ${applicationId}\n` +
        `Applicant Name: ${data.name}\n` +
        `Hotel / Organisation: ${data.org}\n` +
        `Category: ${data.category}\n` +
        (data.classification ? `Classification: ${data.classification}\n` : "") +
        `Location: ${data.city}, ${data.district}\n` +
        `Contact Email: ${data.email}\n` +
        `Contact Phone: ${data.phone}\n` +
        `Secretariat Notes: ${data.message || "(None provided)"}\n` +
        `Submission Time: ${data.submittedAt}\n`
      : `ASHA Contact Enquiry Received\n` +
        `----------------------------\n` +
        `Name: ${data.name}\n` +
        `Organisation: ${data.org}\n` +
        `Role: ${data.role}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone || "(None provided)"}\n` +
        `Message:\n${data.message}\n` +
        `Submission Time: ${data.submittedAt}\n`;

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: sender,
          to: [recipient],
          subject: subject,
          text: textContent
        })
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("[FORM RESEND ERROR]", res.status, errText);
        return {
          ok: false,
          error: `We could not submit your ${type === "membership" ? "application" : "enquiry"} right now. Please try again or contact the ASHA Secretariat directly.`
        };
      }

      return { ok: true, provider: "resend" };
    } catch (err) {
      console.error("[FORM RESEND EXCEPTION]", err.message);
      return {
        ok: false,
        error: `We could not submit your ${type === "membership" ? "application" : "enquiry"} right now. Please try again or contact the ASHA Secretariat directly.`
      };
    }
  }

  // 3. Formspree Integration
  if (provider === "formspree") {
    const endpoint = type === "membership"
      ? (process.env.FORMSPREE_MEMBERSHIP_URL || process.env.FORMSPREE_ENDPOINT)
      : (process.env.FORMSPREE_CONTACT_URL || process.env.FORMSPREE_ENDPOINT);

    if (!endpoint) {
      console.error("[FORM FORMSPREE ERROR] Missing Formspree endpoint URL.");
      return {
        ok: false,
        error: `We could not submit your ${type === "membership" ? "application" : "enquiry"} right now. Please try again or contact the ASHA Secretariat directly.`
      };
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...data, applicationId: applicationId || undefined })
      });

      if (!res.ok) {
        console.error("[FORM FORMSPREE ERROR]", res.status);
        return {
          ok: false,
          error: `We could not submit your ${type === "membership" ? "application" : "enquiry"} right now. Please try again or contact the ASHA Secretariat directly.`
        };
      }

      return { ok: true, provider: "formspree" };
    } catch (err) {
      console.error("[FORM FORMSPREE EXCEPTION]", err.message);
      return {
        ok: false,
        error: `We could not submit your ${type === "membership" ? "application" : "enquiry"} right now. Please try again or contact the ASHA Secretariat directly.`
      };
    }
  }

  // 4. Generic Webhook / Formkeep Integration
  if (provider === "webhook" || provider === "formkeep") {
    const webhookUrl = type === "membership"
      ? (process.env.MEMBERSHIP_WEBHOOK_URL || process.env.FORM_WEBHOOK_URL)
      : (process.env.CONTACT_WEBHOOK_URL || process.env.FORM_WEBHOOK_URL);

    if (!webhookUrl) {
      console.error("[FORM WEBHOOK ERROR] Missing webhook endpoint URL.");
      return {
        ok: false,
        error: `We could not submit your ${type === "membership" ? "application" : "enquiry"} right now. Please try again or contact the ASHA Secretariat directly.`
      };
    }

    try {
      const headers = { "Content-Type": "application/json" };
      if (process.env.WEBHOOK_SECRET) {
        headers["X-Webhook-Secret"] = process.env.WEBHOOK_SECRET;
      }

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          formType: type,
          applicationId: applicationId || null,
          payload: data
        })
      });

      if (!res.ok) {
        console.error("[FORM WEBHOOK ERROR]", res.status);
        return {
          ok: false,
          error: `We could not submit your ${type === "membership" ? "application" : "enquiry"} right now. Please try again or contact the ASHA Secretariat directly.`
        };
      }

      return { ok: true, provider: "webhook" };
    } catch (err) {
      console.error("[FORM WEBHOOK EXCEPTION]", err.message);
      return {
        ok: false,
        error: `We could not submit your ${type === "membership" ? "application" : "enquiry"} right now. Please try again or contact the ASHA Secretariat directly.`
      };
    }
  }

  // Unsupported provider configured
  console.error(`[FORM ERROR] Unsupported FORM_PROVIDER: ${provider}`);
  return {
    ok: false,
    error: `We could not submit your ${type === "membership" ? "application" : "enquiry"} right now. Please try again or contact the ASHA Secretariat directly.`
  };
}

/**
 * Main handler entry point
 */
async function processSubmission(type, body) {
  // 1. Honeypot Anti-Spam Check
  const honeypot = cleanString(body.website || body["hp-website"], 100);
  if (honeypot.length > 0) {
    const fakeAppId = type === "membership" ? generateApplicationId() : undefined;
    return {
      status: 200,
      ok: true,
      applicationId: fakeAppId,
      message: type === "membership"
        ? `Your application${fakeAppId ? ` (Reference ID: ${fakeAppId})` : ""} has been received and is pending review by the ASHA Secretariat.`
        : "Your enquiry has been received by the ASHA Secretariat."
    };
  }

  // 2. Server-side validation
  const validation = type === "membership" ? validateMembership(body) : validateContact(body);
  if (!validation.valid) {
    return {
      status: 400,
      ok: false,
      error: validation.error
    };
  }

  // 3. Application ID generation for membership
  const applicationId = type === "membership" ? generateApplicationId() : undefined;

  // 4. Dispatch to configured provider
  const dispatchResult = await dispatchToProvider(type, validation.data, applicationId);
  if (!dispatchResult.ok) {
    return {
      status: 502,
      ok: false,
      error: dispatchResult.error
    };
  }

  // 5. Success confirmation
  return {
    status: 200,
    ok: true,
    applicationId: applicationId,
    message: type === "membership"
      ? `Your application (Reference ID: ${applicationId}) has been received and is pending review by the ASHA Secretariat.`
      : "Your enquiry has been received by the ASHA Secretariat."
  };
}

module.exports = {
  processSubmission,
  validateContact,
  validateMembership,
  generateApplicationId,
  AP_DISTRICTS
};
