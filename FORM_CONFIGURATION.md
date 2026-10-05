# ASHA Website — Form Submission & Integration Guide

This guide explains the architecture, security, and deployment configuration for the **Contact** and **Membership Application** forms on the Star Hotels Association of Andhra Pradesh website.

---

## Architecture Overview

The forms operate on a secure, server-validated architecture compatible with Vercel Serverless Functions and Node.js environments:

```
[Visitor / Applicant]
        │
        ▼ (Submits Form)
[Client-Side Validation] ──(HTML5 + Honeypot Check + Submit Button Lock)
        │
        ▼ POST /api/contact OR POST /api/membership
[Serverless API Handler]
        │
        ├─► 1. Check Method (POST only, else 405)
        ├─► 2. Honeypot Anti-Spam Check (Silently drops spam, returns 200 without dispatch)
        ├─► 3. Server-Side Validation (Required fields, email regex, 26 AP districts, field length)
        ├─► 4. Application Reference ID (e.g. ASHA-MEM-2026-XXXX generated for membership)
        └─► 5. Dispatcher: Forwards to configured provider (Resend, Formspree, Webhook)
                │
                ├─► [SUCCESS] Returns 200 with confirmation message & Reference ID
                └─► [FAILURE] Returns 502 with user-facing message, preserves form input for retry
```

---

## Environment Variables & Configuration

Configuration is managed via environment variables. **No secret keys, passwords, or emails are hardcoded in the codebase.**

Copy `.env.example` to `.env` for local testing. In production (e.g., Vercel), add these variables under **Project Settings > Environment Variables**.

### 1. General Settings

| Variable | Description | Allowed Values / Example |
| :--- | :--- | :--- |
| `FORM_PROVIDER` | Selected transmission provider | `resend`, `formspree`, `webhook`, `mock` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `FORM_RECIPIENT_EMAIL` | Default recipient for both forms | `secretariat@example.com` |
| `CONTACT_RECIPIENT_EMAIL` | Optional distinct recipient for contact enquiries | `secretariat@example.com` |
| `MEMBERSHIP_RECIPIENT_EMAIL`| Optional distinct recipient for membership applications | `accreditation@example.com` |

---

### 2. Provider Options

#### Option A: Resend (Recommended for Custom Domain Email)
Resend transmits transactional notifications directly to the Secretariat.

* Required Variables:
  * `FORM_PROVIDER=resend`
  * `RESEND_API_KEY`: API key from [resend.com](https://resend.com) (`re_...`)
  * `FORM_RECIPIENT_EMAIL`: Secretariat destination email
  * `FORM_SENDER_EMAIL`: Verified sender address (e.g. `ASHA Portal <notifications@asha-ap.org>` or `onboarding@resend.dev` for testing)

#### Option B: Formspree
Formspree receives form submissions and handles email dispatch and spam filtering.

* Required Variables:
  * `FORM_PROVIDER=formspree`
  * `FORMSPREE_CONTACT_URL`: Contact form endpoint (e.g. `https://formspree.io/f/xbj...`)
  * `FORMSPREE_MEMBERSHIP_URL`: Membership form endpoint (e.g. `https://formspree.io/f/mwp...`)

#### Option C: Generic Webhook / Formkeep / CRM
Posts JSON payload directly to an external API or workflow automation tool (Make, Zapier, n8n, CRM).

* Required Variables:
  * `FORM_PROVIDER=webhook`
  * `FORM_WEBHOOK_URL` (or `CONTACT_WEBHOOK_URL` / `MEMBERSHIP_WEBHOOK_URL`)
  * `WEBHOOK_SECRET`: Optional authorization header passed as `X-Webhook-Secret`

#### Option D: Local / Development Mock
When `FORM_PROVIDER=mock` or when running locally (`NODE_ENV != "production"`), the server logs submission receipts safely to the console without contacting external APIs or logging sensitive personal data.

---

## What the Client / Deployment Owner Must Supply

Before the forms can deliver real emails in production, the client must decide on a provider and provide:

1. **Official Destination Email(s):** Where the Secretariat wants contact enquiries and membership applications sent.
2. **Provider Account Credentials:**
   - If using **Resend**: `RESEND_API_KEY` and verified sender domain.
   - If using **Formspree**: `FORMSPREE_CONTACT_URL` and `FORMSPREE_MEMBERSHIP_URL`.
   - If using a **Webhook / CRM**: Target endpoint URL and secret.

---

## Local Development & Testing

1. **Start the local server:**
   ```bash
   node dev-server.js 3000
   ```
2. **Open the forms in browser:**
   - Contact: `http://localhost:3000/contact.html`
   - Membership: `http://localhost:3000/membership.html`
3. **Run automated integration test suite:**
   ```bash
   node scratch/test_forms.js
   node scratch/test_http_endpoints.js
   ```

---

## Security & Privacy Safeguards

* **Zero Frontend Exposure:** API keys and credentials exist exclusively on the server side (`process.env`).
* **Honeypot Anti-Spam:** An offscreen `website` field traps automated bots. Submissions with filled honeypots are silently dropped with a simulated 200 response, preventing log pollution and bot retry loops.
* **Mandatory Privacy Consent:** Enforced both on the client (`form.checkValidity()`) and on the server (`body.privacy === true`).
* **Double-Submission Prevention:** Submit buttons are immediately disabled (`aria-disabled="true"`, `disabled=true`) and labeled "Sending enquiry..." / "Submitting application..." until the server responds.
* **Input Retention on Failure:** If an error occurs, user input is strictly preserved in form fields so users never have to re-enter information.
