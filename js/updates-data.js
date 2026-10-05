/**
 * ASHA (Star Hotels Association of Andhra Pradesh)
 * Master Data Store for Initiatives, News, Events, and Sectoral Activities.
 *
 * CRITICAL RULE:
 * The client-provided material is the ONLY source of truth for ASHA-specific facts.
 * Do NOT search the internet for ASHA-specific information.
 * Do NOT invent ASHA activities, meetings, workshops, conferences, or achievements.
 * Do NOT assume general Andhra Pradesh tourism events were conducted by ASHA.
 * Keep arrays empty until real, verified client records are provided.
 *
 * ============================================================================
 * SCHEMA SPECIFICATIONS FOR VERIFIED CLIENT DATA
 * ============================================================================
 *
 * 1. INITIATIVE RECORD SCHEMA (window.ASHA_INITIATIVES)
 * {
 *   id: "init-01",
 *   title: "Initiative Name",
 *   category: "advocacy" | "training" | "networking" | "tourism" | "support" | "future",
 *   description: "Full description of verified association initiative...",
 *   date: "2026-03-15",
 *   location: "Vijayawada / Amaravati",
 *   participants: "Delegation members / Committee attendees",
 *   outcome: "Documented institutional outcome or government response",
 *   status: "Planned" | "Ongoing" | "Completed", // If omitted or unverified: UI renders 'STATUS: CLIENT DATA REQUIRED'
 *   image: "assets/initiatives/photo.jpg",       // If omitted: UI renders 'CLIENT PHOTOS REQUIRED'
 *   document: "documents/representation.pdf",
 *   link: "https://example.com"
 * }
 *
 * 2. NEWS RECORD SCHEMA (window.ASHA_NEWS)
 * {
 *   id: "news-01",
 *   title: "Official News Headline",
 *   category: "Policy" | "Regulatory" | "Secretariat" | "Membership",
 *   date: "2026-02-10",
 *   summary: "Short verified summary of official circular or statement...",
 *   image: "assets/news/photo.jpg",             // If omitted: UI renders 'CLIENT IMAGE REQUIRED'
 *   document: "documents/circular.pdf",
 *   link: "https://example.com"
 * }
 *
 * 3. EVENT RECORD SCHEMA (window.ASHA_EVENTS)
 * {
 *   id: "event-01",
 *   title: "Event Title",
 *   type: "meeting" | "training" | "workshop" | "conference" | "other",
 *   date: "2026-04-20",
 *   time: "10:00 AM - 1:00 PM IST",
 *   location: "Vijayawada",
 *   description: "Agenda and scope of verified association event...",
 *   organizer: "ASHA Secretariat",
 *   participants: "Accredited General Managers and Owners",
 *   registration: "Official registration / RSVP instructions",
 *   image: "assets/events/photo.jpg",           // If omitted: UI renders 'CLIENT PHOTOS REQUIRED'
 *   document: "documents/agenda.pdf",
 *   link: "https://example.com"
 * }
 *
 * 4. GOVERNMENT MEETINGS SCHEMA (window.ASHA_GOVERNMENT_REPRESENTATIONS)
 * {
 *   governmentBody: "Department of Tourism, Government of Andhra Pradesh",
 *   date: "2026-01-20",
 *   purpose: "Inter-departmental star hotel classification liaison",
 *   representatives: "President, General Secretary",
 *   outcome: "Official memorandum submitted for review",
 *   document: "documents/memo.pdf",
 *   image: "assets/reps/photo.jpg"
 * }
 *
 * 5. CRISIS ADVISORY SCHEMA (window.ASHA_CRISIS_ADVISORIES)
 * {
 *   title: "Operational Advisory Title",
 *   date: "2026-01-10",
 *   issue: "Operational disruption or regulatory alert summary",
 *   guidance: "Prescribed protocol for member hotels",
 *   document: "documents/advisory.pdf"
 * }
 *
 * 6. INDUSTRY DATA & REPORTS SCHEMA (window.ASHA_INDUSTRY_REPORTS)
 * {
 *   title: "Report Title",
 *   date: "2026-01-01",
 *   scope: "Statewide hospitality benchmarking or occupancy analysis",
 *   document: "documents/report.pdf"
 * }
 */

window.ASHA_INITIATIVES = [];
window.ASHA_NEWS = [];
window.ASHA_EVENTS = [];
window.ASHA_GOVERNMENT_REPRESENTATIONS = [];
window.ASHA_CRISIS_ADVISORIES = [];
window.ASHA_INDUSTRY_REPORTS = [];

// Backward-compatibility alias
window.ASHA_UPDATES = [];
