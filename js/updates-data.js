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

window.ASHA_INITIATIVES = [
  {
    id: "init-cm-meeting-2026",
    title: "ASHA Representatives Meet the Chief Minister of Andhra Pradesh",
    category: "advocacy",
    description: "A delegation representing the Star Hotels Association of Andhra Pradesh met the Hon’ble Chief Minister to present association materials and discuss hospitality development across Andhra Pradesh.",
    date: "2026-06-26",
    location: "Vijayawada / Amaravati",
    status: "Completed",
    image: "assets/events/cm-meeting-presentation.jpeg",
    link: "news-cm-meeting.html",
    linkText: "View Meeting Record & Media \u2192"
  },
  {
    id: "init-amaravati-ceremony-2025",
    title: "ASHA Representatives at the Amaravati Foundation Stone-Laying Ceremony",
    category: "advocacy",
    description: "Representatives of the Star Hotels Association of Andhra Pradesh attended the foundation stone-laying ceremony for 15 public sector banking and insurance offices in Amaravati, addressed by Union Finance Minister Smt. Nirmala Sitharaman.",
    date: "2025-11-28",
    location: "Amaravati",
    status: "Completed",
    image: "assets/events/amaravati-ceremony-representation.jpeg",
    link: "news-amaravati-ceremony.html",
    linkText: "View Meeting Record & Media \u2192"
  },
  {
    id: "init-gst-representation-2025",
    title: "Representation on Input Tax Credit (ITC) for GST to Hon'ble Tourism Minister",
    category: "advocacy",
    description: "The Andhra Pradesh Star Hotels Association submitted a representation concerning Input Tax Credit (ITC) under GST to Hon'ble Tourism Minister Kandula Durgesh in Vijayawada, advocating for a 5% GST structure with Input Tax Credit to alleviate operational and renovation cost burdens on hotels and restaurants.",
    date: "2025-10-08",
    location: "Vijayawada",
    participants: "President R.V. Swamy, General Secretary S. Murthy Chittoory, Council Member Sharan V.",
    outcome: "Detailed memorandum submitted urging 5% GST with ITC; presented for ministerial review and state advocacy",
    status: "Completed",
    image: "assets/events/tourism-minister-gst-representation.jpeg",
    link: "news-gst-representation.html",
    linkText: "View Official Report & Details \u2192"
  }
];

window.ASHA_NEWS = [
  {
    id: "news-cm-meeting-2026",
    title: "ASHA Representatives Meet the Chief Minister of Andhra Pradesh",
    category: "Official Meeting / Government Engagement",
    date: "2026-06-26",
    association: "Star Hotels Association of Andhra Pradesh (ASHA)",
    summary: "A delegation representing the association met the Chief Minister of Andhra Pradesh. The supplied photographs document the meeting and presentation materials. The accompanying Telugu newspaper clipping provides additional media context.",
    description: "A delegation representing the Star Hotels Association of Andhra Pradesh (ASHA) met the Hon’ble Chief Minister of Andhra Pradesh. The delegation presented association materials and representations regarding the state's hospitality sector, accompanied by photographic documentation and regional press coverage.",
    image: "assets/events/cm-meeting-presentation.jpeg",
    thumbnail: "assets/events/cm-meeting-presentation.jpeg",
    location: "Vijayawada / Amaravati",
    detailUrl: "news-cm-meeting.html",
    gallery: [
      {
        id: "img-presentation",
        src: "assets/events/cm-meeting-presentation.jpeg",
        originalFile: "assets/events/Pic 2026-06-26 CM Meeting.jpeg",
        title: "Presentation of Association Materials",
        alt: "ASHA delegation presenting official association representation and materials to the Chief Minister of Andhra Pradesh",
        caption: "ASHA representatives presenting official association documents and hospitality development materials to the Hon’ble Chief Minister of Andhra Pradesh.",
        type: "event-photo",
        isPrimary: true
      },
      {
        id: "img-delegation",
        src: "assets/events/cm-meeting-delegation.jpeg",
        originalFile: "assets/events/Pic 2026-06-26 CM Meeting (1).jpeg",
        title: "Delegation with the Chief Minister",
        alt: "Formal delegation of the Star Hotels Association of Andhra Pradesh with the Chief Minister in front of the Andhra Pradesh State emblem",
        caption: "Delegation representing the Star Hotels Association of Andhra Pradesh with the Hon’ble Chief Minister in front of the Andhra Pradesh State emblem.",
        type: "event-photo"
      },
      {
        id: "img-portrait",
        src: "assets/events/cm-meeting-portrait.jpeg",
        originalFile: "assets/events/Pic 2026-06-26 CM Meeting (3).jpeg",
        title: "Executive Representation",
        alt: "Association executive representative alongside the Chief Minister of Andhra Pradesh",
        caption: "Association executive representative alongside the Hon’ble Chief Minister during the delegation meeting.",
        type: "event-photo"
      },
      {
        id: "img-clipping",
        src: "assets/events/cm-meeting-press-clipping.jpeg",
        originalFile: "assets/events/Pic 2026-06-26 CM Meeting (2).jpeg",
        title: "Regional Telugu Newspaper Coverage",
        alt: "Telugu newspaper report published by Andhra Jyothy covering the Star Hotels Association meeting with the Chief Minister",
        caption: "Telugu newspaper coverage (Andhra Jyothy print edition). Provided as supporting media context; subject to publication approval and copyright verification.",
        type: "press-clipping",
        isPress: true
      }
    ],
    pressCoverage: {
      source: "Andhra Jyothy (ఆంధ్రజ్యోతి)",
      portal: "www.andhrajyothy.com",
      clippingSrc: "assets/events/cm-meeting-press-clipping.jpeg",
      clippingOriginal: "assets/events/Pic 2026-06-26 CM Meeting (2).jpeg",
      caption: "Telugu newspaper coverage (Andhra Jyothy print edition). Displayed as supporting media reference; subject to publication approval.",
      verificationNotice: "Regional press coverage is archived for contextual media reference. Specific statements and financial references reported in press clippings are subject to formal confirmation by the ASHA Secretariat.",
      // Internal review metadata (retained for administrative audit; not rendered as public alarm banners)
      internalReviewNotes: {
        provisionalDate: "26 June 2026 (based on image filenames; newspaper report datelined 29 June)",
        financialReferenceFlagged: "₹50 Lakh reference in Andhra Jyothy report flagged for Secretariat review; omitted from official association statements until ratified",
        attendeesMentionedInClipping: "Clipping reports association representatives met CM Chandrababu (names cited: RV Swamy, Pavan Karthik, C. Murthy, Malineni Rajaiah, Muttavarapu Murali Krishna, V. Sharan); preserved without unverified endorsement"
      }
    }
  },
  {
    id: "news-amaravati-ceremony-2025",
    title: "ASHA Representatives at the Amaravati Foundation Stone-Laying Ceremony",
    category: "Official Ceremony & Amaravati Development",
    date: "2025-11-28",
    association: "Star Hotels Association of Andhra Pradesh (ASHA)",
    summary: "Representatives of the Star Hotels Association of Andhra Pradesh attended the foundation stone-laying ceremony for 15 public sector banking and insurance offices in Amaravati. The ceremony was addressed by Chief Guest Smt. Nirmala Sitharaman, Hon'ble Union Minister for Finance & Corporate Affairs.",
    description: "Representatives of the Star Hotels Association of Andhra Pradesh (ASHA) attended the foundation stone-laying ceremony for 15 public sector banking and insurance offices in Amaravati on November 28, 2025. The event was addressed by Chief Guest Smt. Nirmala Sitharaman, Hon'ble Union Minister for Finance & Corporate Affairs, and attended by Andhra Pradesh Chief Minister N. Chandrababu Naidu. The accompanying photographs document association representatives attending the ceremony, presenting representations, and participating at the ceremonial venue.",
    image: "assets/events/amaravati-ceremony-representation.jpeg",
    thumbnail: "assets/events/amaravati-ceremony-representation.jpeg",
    location: "Amaravati",
    detailUrl: "news-amaravati-ceremony.html",
    gallery: [
      {
        id: "img-amaravati-rep",
        src: "assets/events/amaravati-ceremony-representation.jpeg",
        originalFile: "assets/events/amaravati-ceremony-representation.jpeg",
        title: "Presentation of Sectoral Memorandum to Union Finance Minister",
        alt: "ASHA representatives presenting official memorandum to Union Finance Minister Smt. Nirmala Sitharaman in Amaravati",
        caption: "ASHA representatives presenting an official memorandum concerning hospitality and state infrastructure to Union Finance Minister Smt. Nirmala Sitharaman.",
        type: "event-photo",
        isPrimary: true
      },
      {
        id: "img-amaravati-outdoor",
        src: "assets/events/amaravati-ceremony-delegation-outdoor.jpeg",
        originalFile: "assets/events/amaravati-ceremony-delegation-outdoor.jpeg",
        title: "ASHA Representatives at the Amaravati Ceremony Venue",
        alt: "ASHA representatives at the foundation stone-laying ceremony for banking and public insurance offices in Amaravati",
        caption: "Association representatives attending the foundation stone-laying ceremony for banking and public insurance offices in Amaravati.",
        type: "event-photo"
      },
      {
        id: "img-amaravati-pavilion",
        src: "assets/events/amaravati-ceremony-delegation-pavilion.jpeg",
        originalFile: "assets/events/amaravati-ceremony-delegation-pavilion.jpeg",
        title: "Representatives at the Ceremonial Pavilion",
        alt: "ASHA representatives attending the ceremonial assembly in Amaravati",
        caption: "ASHA representatives inside the ceremonial pavilion at the foundation stone-laying event in Amaravati.",
        type: "event-photo"
      },
      {
        id: "img-amaravati-stage",
        src: "assets/events/amaravati-ceremony-stage-inauguration.jpeg",
        originalFile: "assets/events/amaravati-ceremony-stage-inauguration.jpeg",
        title: "Ceremonial Stage & Inaugural Dais",
        alt: "Ceremonial stage backdrop featuring Chief Guest Smt. Nirmala Sitharaman and state leadership for the laying of foundation stone for 15 banking and public insurance offices",
        caption: "Inaugural dais and stage backdrop at Amaravati featuring Chief Guest Smt. Nirmala Sitharaman, Hon'ble Union Minister for Finance & Corporate Affairs.",
        type: "event-photo"
      },
      {
        id: "img-amaravati-collage",
        src: "assets/events/amaravati-ceremony-collage.jpeg",
        originalFile: "assets/events/amaravati-ceremony-collage.jpeg",
        title: "Four-Photo Event Montage",
        alt: "Four-photo collage documenting ASHA representatives at the Amaravati foundation stone-laying ceremony",
        caption: "Four-photograph archival montage documenting ASHA representatives at the foundation stone-laying ceremony in Amaravati.",
        type: "event-photo"
      }
    ]
  },
  {
    id: "news-gst-representation-2025",
    title: "Representation on ITC for GST Submitted to Hon'ble Tourism Minister Kandula Durgesh",
    category: "Government Representation / GST Policy / Hospitality Industry",
    date: "2025-10-08",
    association: "Star Hotels Association of Andhra Pradesh (ASHA)",
    summary: "The Andhra Pradesh Star Hotels Association submitted a representation concerning Input Tax Credit (ITC) under GST to Hon'ble Tourism Minister Kandula Durgesh. The newspaper report discusses GST-related concerns affecting the hospitality sector, including hotels and restaurants, and requests consideration of the industry's representation.",
    description: "The Andhra Pradesh Star Hotels Association submitted a representation concerning Input Tax Credit (ITC) under GST to Hon'ble Tourism Minister Kandula Durgesh in Vijayawada. The submission highlighted the necessity of a 5% GST structure with Input Tax Credit to alleviate cost burdens on hotels and restaurants, reduce capital expenditure inflation on renovations, and promote tourism growth.",
    image: "assets/events/tourism-minister-gst-representation.jpeg",
    thumbnail: "assets/events/tourism-minister-gst-representation.jpeg",
    location: "Vijayawada",
    detailUrl: "news-gst-representation.html",
    gallery: [
      {
        id: "img-tourism-delegation",
        src: "assets/events/tourism-minister-gst-representation.jpeg",
        originalFile: "assets/events/Pic 2025-10-08 Tourism Minister.jpeg",
        title: "Delegation Submitting Representation to Hon'ble Tourism Minister",
        alt: "ASHA delegation presenting the official representation on ITC for GST to Hon'ble Tourism Minister Kandula Durgesh",
        caption: "ASHA leadership delegation presenting the official representation on Input Tax Credit (ITC) under GST to Hon'ble Tourism Minister Kandula Durgesh in Vijayawada.",
        type: "event-photo",
        isPrimary: true
      },
      {
        id: "img-tourism-clipping",
        src: "assets/events/tourism-minister-gst-press-clipping.jpeg",
        originalFile: "assets/events/News 2025-10-08 bharat ITC Fot GST.jpeg",
        title: "Regional Newspaper Report (Bharat News)",
        alt: "Newspaper report in Bharat News titled 'Representation on ITC fot GST Submitted to Hon'ble Tourism Minister Kandula Durgesh'",
        caption: "Newspaper clipping from Bharat News (Vijayawada, 8 October 2025) detailing the association's representation on GST and Input Tax Credit. Reproduced for archival reference subject to publication permissions.",
        type: "press-clipping",
        isPress: true
      }
    ],
    pressCoverage: {
      source: "Bharat News",
      portal: "Vijayawada Print Edition",
      clippingSrc: "assets/events/tourism-minister-gst-press-clipping.jpeg",
      clippingOriginal: "assets/events/News 2025-10-08 bharat ITC Fot GST.jpeg",
      caption: "Newspaper coverage (Bharat News, 8 October 2025). Provided as supporting media context; subject to publication permissions.",
      verificationNotice: "Regional press coverage is archived for contextual reference. The report documents the submission of an industry representation to the Hon'ble Minister; government outcomes and policy changes are subject to official State and GST Council notifications.",
      internalReviewNotes: {
        verifiedDate: "8 October 2025 (Bharat News dateline: Vijayawada, October 08)",
        namesInClipping: "President R.V. Swamy, General Secretary S. Murthy Chittoory, and Council Member Sharan V. (Clipping text prints 'Council Member Sharan V.', whereas submission brief cited S. V. Murthy; verified against clipping)",
        policyStatus: "Submitted representation urging 5% GST with ITC; no policy change or outcome claimed"
      }
    }
  }
];

window.ASHA_EVENTS = [
  {
    id: "event-cm-meeting-2026",
    title: "ASHA Representatives Meet the Chief Minister of Andhra Pradesh",
    type: "meeting",
    category: "Official Meeting / Government Engagement",
    date: "2026-06-26",
    time: "Official Delegation Session",
    location: "Vijayawada / Amaravati",
    association: "Star Hotels Association of Andhra Pradesh (ASHA)",
    description: "A delegation representing the association met the Chief Minister of Andhra Pradesh. The supplied photographs document the meeting and presentation materials. The accompanying Telugu newspaper clipping provides additional media context.",
    organizer: "Star Hotels Association of Andhra Pradesh (ASHA)",
    participants: "ASHA Delegation & State Leadership",
    image: "assets/events/cm-meeting-presentation.jpeg",
    thumbnail: "assets/events/cm-meeting-presentation.jpeg",
    detailUrl: "news-cm-meeting.html",
    gallery: window.ASHA_NEWS[0].gallery,
    pressCoverage: window.ASHA_NEWS[0].pressCoverage
  },
  {
    id: "event-amaravati-ceremony-2025",
    title: "ASHA Representatives at the Amaravati Foundation Stone-Laying Ceremony",
    type: "ceremony",
    category: "Official Ceremony / Government Engagement / Amaravati Infrastructure",
    date: "2025-11-28",
    time: "Official Foundation Stone Ceremony",
    location: "Amaravati",
    association: "Star Hotels Association of Andhra Pradesh (ASHA)",
    description: "Representatives of the Star Hotels Association of Andhra Pradesh (ASHA) attended the foundation stone-laying ceremony for 15 public sector banking and insurance offices in Amaravati on November 28, 2025, addressed by Chief Guest Smt. Nirmala Sitharaman, Hon'ble Union Minister for Finance & Corporate Affairs.",
    organizer: "Government of Andhra Pradesh & Public Financial Institutions",
    participants: "ASHA Representatives, Chief Guest Smt. Nirmala Sitharaman, Chief Minister N. Chandrababu Naidu, Banking & Insurance Leaders",
    image: "assets/events/amaravati-ceremony-representation.jpeg",
    thumbnail: "assets/events/amaravati-ceremony-representation.jpeg",
    detailUrl: "news-amaravati-ceremony.html",
    gallery: [
      {
        id: "img-amaravati-rep",
        src: "assets/events/amaravati-ceremony-representation.jpeg",
        originalFile: "assets/events/amaravati-ceremony-representation.jpeg",
        title: "Presentation of Sectoral Memorandum to Union Finance Minister",
        alt: "ASHA representatives presenting official memorandum to Union Finance Minister Smt. Nirmala Sitharaman in Amaravati",
        caption: "ASHA representatives presenting an official memorandum concerning hospitality and state infrastructure to Union Finance Minister Smt. Nirmala Sitharaman.",
        type: "event-photo",
        isPrimary: true
      },
      {
        id: "img-amaravati-outdoor",
        src: "assets/events/amaravati-ceremony-delegation-outdoor.jpeg",
        originalFile: "assets/events/amaravati-ceremony-delegation-outdoor.jpeg",
        title: "ASHA Representatives at the Amaravati Ceremony Venue",
        alt: "ASHA representatives at the foundation stone-laying ceremony for banking and public insurance offices in Amaravati",
        caption: "Association representatives attending the foundation stone-laying ceremony for banking and public insurance offices in Amaravati.",
        type: "event-photo"
      },
      {
        id: "img-amaravati-pavilion",
        src: "assets/events/amaravati-ceremony-delegation-pavilion.jpeg",
        originalFile: "assets/events/amaravati-ceremony-delegation-pavilion.jpeg",
        title: "Representatives at the Ceremonial Pavilion",
        alt: "ASHA representatives attending the ceremonial assembly in Amaravati",
        caption: "ASHA representatives inside the ceremonial pavilion at the foundation stone-laying event in Amaravati.",
        type: "event-photo"
      },
      {
        id: "img-amaravati-stage",
        src: "assets/events/amaravati-ceremony-stage-inauguration.jpeg",
        originalFile: "assets/events/amaravati-ceremony-stage-inauguration.jpeg",
        title: "Ceremonial Stage & Inaugural Dais",
        alt: "Ceremonial stage backdrop featuring Chief Guest Smt. Nirmala Sitharaman and state leadership for the laying of foundation stone for 15 banking and public insurance offices",
        caption: "Inaugural dais and stage backdrop at Amaravati featuring Chief Guest Smt. Nirmala Sitharaman, Hon'ble Union Minister for Finance & Corporate Affairs.",
        type: "event-photo"
      },
      {
        id: "img-amaravati-collage",
        src: "assets/events/amaravati-ceremony-collage.jpeg",
        originalFile: "assets/events/amaravati-ceremony-collage.jpeg",
        title: "Four-Photo Event Montage",
        alt: "Four-photo collage documenting ASHA representatives at the Amaravati foundation stone-laying ceremony",
        caption: "Four-photograph archival montage documenting ASHA representatives at the foundation stone-laying ceremony in Amaravati.",
        type: "event-photo"
      }
    ]
  },
  {
    id: "event-gst-representation-2025",
    title: "Representation on ITC for GST Submitted to Hon'ble Tourism Minister Kandula Durgesh",
    type: "meeting",
    category: "Government Representation / GST Policy / Hospitality Industry",
    date: "2025-10-08",
    time: "Official Ministerial Consultation",
    location: "Vijayawada",
    association: "Star Hotels Association of Andhra Pradesh (ASHA)",
    description: "The Andhra Pradesh Star Hotels Association submitted a representation concerning Input Tax Credit (ITC) under GST to Hon'ble Tourism Minister Kandula Durgesh. The newspaper report discusses GST-related concerns affecting the hospitality sector, including hotels and restaurants, and requests consideration of the industry's representation.",
    organizer: "Star Hotels Association of Andhra Pradesh (ASHA)",
    participants: "ASHA Delegation (President R.V. Swamy, General Secretary S. Murthy Chittoory, Council Member Sharan V.) & Hon'ble Tourism Minister Kandula Durgesh",
    image: "assets/events/tourism-minister-gst-representation.jpeg",
    thumbnail: "assets/events/tourism-minister-gst-representation.jpeg",
    detailUrl: "news-gst-representation.html",
    gallery: [
      {
        id: "img-tourism-delegation",
        src: "assets/events/tourism-minister-gst-representation.jpeg",
        originalFile: "assets/events/Pic 2025-10-08 Tourism Minister.jpeg",
        title: "Delegation Submitting Representation to Hon'ble Tourism Minister",
        alt: "ASHA delegation presenting the official representation on ITC for GST to Hon'ble Tourism Minister Kandula Durgesh",
        caption: "ASHA leadership delegation presenting the official representation on Input Tax Credit (ITC) under GST to Hon'ble Tourism Minister Kandula Durgesh in Vijayawada.",
        type: "event-photo",
        isPrimary: true
      },
      {
        id: "img-tourism-clipping",
        src: "assets/events/tourism-minister-gst-press-clipping.jpeg",
        originalFile: "assets/events/News 2025-10-08 bharat ITC Fot GST.jpeg",
        title: "Regional Newspaper Report (Bharat News)",
        alt: "Newspaper report in Bharat News titled 'Representation on ITC fot GST Submitted to Hon'ble Tourism Minister Kandula Durgesh'",
        caption: "Newspaper clipping from Bharat News (Vijayawada, 8 October 2025) detailing the association's representation on GST and Input Tax Credit. Reproduced for archival reference subject to publication permissions.",
        type: "press-clipping",
        isPress: true
      }
    ]
  }
];

window.ASHA_GOVERNMENT_REPRESENTATIONS = [
  {
    governmentBody: "Office of the Chief Minister, Government of Andhra Pradesh",
    date: "2026-06-26",
    purpose: "ASHA delegation meeting and presentation of hospitality sector representations",
    representatives: "ASHA Delegation",
    outcome: "Presentation of official materials and state hospitality dialogue",
    image: "assets/events/cm-meeting-presentation.jpeg",
    gallery: window.ASHA_NEWS[0].gallery
  },
  {
    governmentBody: "Foundation Stone Ceremony for Banking & Public Insurance Offices",
    date: "2025-11-28",
    purpose: "ASHA attendance and presentation of sectoral memorandum to Union Finance Minister Smt. Nirmala Sitharaman",
    representatives: "ASHA Representatives",
    outcome: "Official memorandum submitted during foundation stone-laying ceremony in Amaravati",
    image: "assets/events/amaravati-ceremony-representation.jpeg"
  },
  {
    governmentBody: "Ministry of Tourism, Culture and Cinematography, Government of Andhra Pradesh",
    date: "2025-10-08",
    purpose: "Submission of industry representation regarding Input Tax Credit (ITC) under GST for hotels and restaurants",
    representatives: "ASHA Delegation (President R.V. Swamy, General Secretary S. Murthy Chittoory, Council Member Sharan V.)",
    outcome: "Detailed memorandum presented urging 5% GST with ITC; submitted for ministerial review",
    image: "assets/events/tourism-minister-gst-representation.jpeg"
  }
];

window.ASHA_CRISIS_ADVISORIES = [];
window.ASHA_INDUSTRY_REPORTS = [];

// Backward-compatibility alias
window.ASHA_UPDATES = window.ASHA_NEWS;


