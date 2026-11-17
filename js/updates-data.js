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
  },
  {
    id: "init-asha-formation-2025",
    title: "Senior Hoteliers Unite to Form ASHA to Strengthen A.P. Hospitality Sector",
    category: "networking",
    description: "Senior hoteliers from across Andhra Pradesh gathered to officially establish the Andhra Pradesh Star Hotels Association (ASHA) to elevate the State as a premier travel destination, promote excellence in hospitality, and foster collaborations with top-tier hotels.",
    date: "2025-06-04",
    time: "Published: June 04, 2025 11:17 PM IST | Updated: June 05, 2025 06:23 AM IST",
    location: "Vijayawada / Andhra Pradesh",
    participants: "Founding leadership across Vijayawada, Visakhapatnam, Kakinada, Tirupati, Vizianagaram, Guntur, and Rajamahendravaram",
    outcome: "Official establishment of ASHA with full Executive Committee and Advisory Board published in The Hindu",
    status: "Completed",
    image: "assets/events/asha-formation-meeting.jpg",
    link: "news-asha-formation.html",
    linkText: "View Foundation Record & Press Coverage \u2192"
  },
  {
    id: "init-union-tourism-minister-2025",
    title: "ASHA Delegation Meets Hon'ble Union Tourism Minister",
    category: "advocacy",
    description: "A leadership delegation representing the Star Hotels Association of Andhra Pradesh met the Hon'ble Union Tourism Minister on 26 June 2025, presenting hospitality sector representations and discussing central support for state tourism development.",
    date: "2025-06-26",
    location: "Vijayawada / Andhra Pradesh",
    participants: "ASHA Executive Leadership Delegation (President R. V. Swamy, Vice-President Ghattamaneni Venkat, Treasurer Gudisa Shivakumar, Council Members)",
    outcome: "Presented hospitality development representations and felicitated central tourism leadership during official state visit",
    status: "Completed",
    image: "assets/events/union-tourism-minister-meeting.jpg",
    link: "news-union-tourism-minister.html",
    linkText: "View Meeting Record & Media \u2192"
  },
  {
    id: "init-power-tariff-representation-2025",
    title: "Representation on Power Tariff & Municipal Tax Relief for Star Hotels",
    category: "advocacy",
    description: "ASHA appealed to the Government of Andhra Pradesh for a reduction in commercial electricity tariff from ₹12.90 to ₹7 per unit, extension of the ₹2.30/unit power concession to existing hotels, caution deposit relief, and a 50% concession on annual municipal taxes.",
    date: "2025-07-16",
    location: "Vijayawada / Visakhapatnam / Kakinada",
    participants: "President R.V. Swamy, Treasurer Gudisa Shivakumar, Council Member Sharan Valluru, Vice-President Ghattamaneni Venkat, and hoteliers representing ~80 star hotels",
    outcome: "Formal representation submitted for ₹7/unit tariff, parity for existing hotels under industry status, caution deposit easing, and 50% municipal tax rebate; state thanked for reducing bar excise duty to ₹25 lakh",
    status: "Completed",
    image: "assets/events/asha-power-tariff-meeting.jpg",
    link: "news-power-tariff-representation.html",
    linkText: "View Official Report & Press Coverage \u2192"
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
  },
  {
    id: "news-asha-formation-2025",
    title: "Top Hoteliers Unite, Form ASHA, to Strengthen Hospitality Sector in A.P.",
    category: "Association Formation / State Hospitality Leadership",
    date: "2025-06-04",
    association: "Star Hotels Association of Andhra Pradesh (ASHA)",
    summary: "Senior hoteliers from across Andhra Pradesh have come together to form the Andhra Pradesh Star Hotels Association (ASHA). The association aims to elevate the State as a premier travel destination, promote excellence in hospitality, and foster collaborations with top-tier hotels.",
    description: "Senior hoteliers from across Andhra Pradesh convened to officially establish the Andhra Pradesh Star Hotels Association (ASHA). The inaugural assembly formed the apex representative body for star hotels in the state, electing office bearers and appointing an advisory board comprising eminent hospitality leaders.",
    image: "assets/events/asha-formation-meeting.jpg",
    thumbnail: "assets/events/asha-formation-meeting.jpg",
    location: "Vijayawada / Andhra Pradesh",
    detailUrl: "news-asha-formation.html",
    gallery: [
      {
        id: "img-formation-assembly",
        src: "assets/events/asha-formation-meeting.jpg",
        title: "Inaugural Assembly of ASHA",
        alt: "Senior hoteliers and founding office bearers at the inaugural assembly forming the Andhra Pradesh Star Hotels Association (ASHA)",
        caption: "Senior hoteliers and founding office bearers gathered at the inaugural assembly establishing the Andhra Pradesh Star Hotels Association (ASHA).",
        type: "event-photo",
        isPrimary: true
      },
      {
        id: "img-hindu-report",
        src: "assets/events/the-hindu-asha-formation-press-clipping.jpg",
        title: "The Hindu Press Coverage",
        alt: "The Hindu newspaper report titled 'Top hoteliers unite, form ASHA, to strengthen hospitality sector in A.P.'",
        caption: "Press coverage by The Hindu Bureau (Published June 04, 2025 11:17 PM IST; Updated June 05, 2025 06:23 AM IST) reporting the formation of ASHA and announcing its elected leadership and advisory board.",
        type: "press-clipping",
        isPress: true
      }
    ],
    pressCoverage: {
      source: "The Hindu",
      portal: "The Hindu Bureau (thehindu.com)",
      clippingSrc: "assets/events/the-hindu-asha-formation-press-clipping.jpg",
      headline: "Top hoteliers unite, form ASHA, to strengthen hospitality sector in A.P.",
      publishedTime: "June 04, 2025 11:17 pm IST",
      updatedTime: "June 05, 2025 06:23 am IST",
      byline: "THE HINDU BUREAU",
      caption: "The Hindu coverage detailing the formation of ASHA by senior hoteliers across Andhra Pradesh, including the elected leadership and advisory board.",
      verificationNotice: "Verified against The Hindu digital report (June 04–05, 2025)."
    }
  },
  {
    id: "news-union-tourism-minister-2025",
    title: "ASHA Delegation Meets Hon'ble Union Tourism Minister",
    category: "Central Government Engagement / Tourism Policy",
    date: "2025-06-26",
    association: "Star Hotels Association of Andhra Pradesh (ASHA)",
    summary: "A delegation representing the Star Hotels Association of Andhra Pradesh met the Hon'ble Union Tourism Minister during the central ministerial visit on 26 June 2025, discussing tourism development schemes, infrastructure support, and sector priorities for Andhra Pradesh star hotels.",
    description: "A delegation representing the Star Hotels Association of Andhra Pradesh (ASHA) met the Hon'ble Union Tourism Minister in Vijayawada on 26 June 2025. The delegation felicitated the Minister and presented key sectoral representations advocating for central support, tourism corridor connectivity, and industrial incentives for the state's classified star hotels.",
    image: "assets/events/union-tourism-minister-meeting.jpg",
    thumbnail: "assets/events/union-tourism-minister-meeting.jpg",
    location: "Vijayawada / Andhra Pradesh",
    detailUrl: "news-union-tourism-minister.html",
    gallery: [
      {
        id: "img-union-minister-meeting",
        src: "assets/events/union-tourism-minister-meeting.jpg",
        title: "ASHA Delegation with Hon'ble Union Tourism Minister",
        alt: "ASHA leadership delegation meeting and felicitating the Hon'ble Union Tourism Minister on 26 June 2025",
        caption: "ASHA leadership delegation meeting and felicitating the Hon'ble Union Tourism Minister during the official ministerial visit on 26 June 2025.",
        type: "event-photo",
        isPrimary: true
      }
    ]
  },
  {
    id: "news-power-tariff-representation-2025",
    title: "AP Hotels Seek Reduction in High Power Tariff and Municipal Tax Relief",
    category: "Policy Representation / Energy & Municipal Reform",
    date: "2025-07-16",
    association: "Star Hotels Association of Andhra Pradesh (ASHA)",
    summary: "Hoteliers operating classified star hotels across Andhra Pradesh have called on the State Government to reduce electricity tariff from ₹12.90 to ₹7 per unit, extend power concessions to existing properties, and provide relief on caution deposits and municipal taxes.",
    description: "The Star Hotels Association of Andhra Pradesh convened an executive consultation on electricity tariffs and municipal taxation affecting around 80 member hotels. The association urged the State Government to lower the power tariff to ₹7 per unit (in line with Tamil Nadu and Punjab), extend the ₹2.30/unit power concession granted to new units under industry status to existing hotels as well, rationalise 2-month electricity caution deposits, and grant a 50% discount on municipal taxes.",
    image: "assets/events/asha-power-tariff-meeting.jpg",
    thumbnail: "assets/events/asha-power-tariff-meeting.jpg",
    location: "Vijayawada / Andhra Pradesh",
    detailUrl: "news-power-tariff-representation.html",
    gallery: [
      {
        id: "img-power-tariff-meeting",
        src: "assets/events/asha-power-tariff-meeting.jpg",
        title: "ASHA Executive Consultation on Power Tariff & Taxation",
        alt: "Senior hoteliers and ASHA leadership assembled at the roundtable discussion on power tariffs and municipal tax relief",
        caption: "ASHA leadership and member hoteliers convened at the state executive session addressing high power tariffs, electricity caution deposits, and municipal taxation.",
        type: "event-photo",
        isPrimary: true
      },
      {
        id: "img-deccan-clipping",
        src: "assets/events/deccan-chronicle-power-tariff-clipping.jpg",
        title: "Deccan Chronicle Press Coverage",
        alt: "Deccan Chronicle report titled 'AP hotels want power tariff cut, call it too high'",
        caption: "Press coverage by Deccan Chronicle (Vijayawada, July 16, 2025 by Sampat G. Samritan) detailing ASHA's appeal for ₹7/unit tariff, parity for existing hotels, and municipal tax relief.",
        type: "press-clipping",
        isPress: true
      }
    ],
    pressCoverage: {
      source: "Deccan Chronicle",
      portal: "Deccan Chronicle (Vijayawada Print & Digital Edition)",
      clippingSrc: "assets/events/deccan-chronicle-power-tariff-clipping.jpg",
      headline: "AP hotels want power tariff cut, call it too high",
      publishedTime: "July 16, 2025",
      byline: "SAMPAT G. SAMRITAN | DC",
      caption: "Deccan Chronicle report highlighting ASHA's appeal for power tariff rationalisation from ₹12.90 to ₹7 per unit and relief in municipal taxes.",
      verificationNotice: "Verified against Deccan Chronicle publication (Vijayawada, July 16, 2025)."
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
  },
  {
    id: "event-asha-formation-2025",
    title: "Top Hoteliers Unite to Form ASHA to Strengthen Hospitality Sector in A.P.",
    type: "meeting",
    category: "Inaugural Assembly / Association Formation / Industry Leadership",
    date: "2025-06-04",
    time: "Published: June 04, 2025 11:17 PM IST | Updated: June 05, 2025 06:23 AM IST",
    location: "Vijayawada / Andhra Pradesh",
    association: "Star Hotels Association of Andhra Pradesh (ASHA)",
    description: "Senior hoteliers from across Andhra Pradesh convened to establish the Andhra Pradesh Star Hotels Association (ASHA) to elevate the State as a premier travel destination, promote excellence in hospitality, and foster collaborations with top-tier hotels across the State.",
    organizer: "Founding Executive Leadership of ASHA",
    participants: "President R.V. Swamy (Hyatt Place Vijayawada), General Secretary S. Murthy Chittoory (Venky Residency Kakinada), Treasurer Gudisa Shivakumar (SVN Lake Palace Vizianagaram), Vice-Presidents Bala Krishna Reddy (Taj Bliss Tirupati) & Ghattamaneni Venkat (Daspalla Group Vizag), Joint Secretary M.V. Pavan Kartheek (Elegant Vizag), Executive Members Pandu Chowdhary (Shelton & La hospin Rajamahendravaram), Sharan Valluru (GRT Grand Vijayawada), Pratap N (Gowtham Grand Guntur), Nageswara Rao (Taj Vivanta Vijayawada), S. Prashant (Daspalla Hotels), alongside Advisory Board members Prabhu Kishore (Novotel / Varun Hospitality), Gokaraju Gangaraju (Lemon Tree Premiere), M. Rajaiah (Taj Vivanta), and Muttavarapu Murali Krishna (Fortune Murali Park).",
    image: "assets/events/asha-formation-meeting.jpg",
    thumbnail: "assets/events/asha-formation-meeting.jpg",
    detailUrl: "news-asha-formation.html",
    gallery: [
      {
        id: "img-formation-assembly",
        src: "assets/events/asha-formation-meeting.jpg",
        title: "Inaugural Assembly of ASHA",
        alt: "Senior hoteliers and founding office bearers at the inaugural assembly forming the Andhra Pradesh Star Hotels Association (ASHA)",
        caption: "Senior hoteliers and founding office bearers gathered at the inaugural assembly establishing the Andhra Pradesh Star Hotels Association (ASHA).",
        type: "event-photo",
        isPrimary: true
      },
      {
        id: "img-hindu-report",
        src: "assets/events/the-hindu-asha-formation-press-clipping.jpg",
        title: "The Hindu Press Coverage",
        alt: "The Hindu report titled 'Top hoteliers unite, form ASHA, to strengthen hospitality sector in A.P.'",
        caption: "Official coverage published by The Hindu Bureau (Published: June 04, 2025, 11:17 PM IST; Updated: June 05, 2025, 06:23 AM IST) reporting the formation of ASHA and announcing its elected leadership and advisory board.",
        type: "press-clipping",
        isPress: true
      }
    ],
    pressCoverage: {
      source: "The Hindu",
      portal: "The Hindu Bureau (thehindu.com)",
      clippingSrc: "assets/events/the-hindu-asha-formation-press-clipping.jpg",
      headline: "Top hoteliers unite, form ASHA, to strengthen hospitality sector in A.P.",
      publishedTime: "June 04, 2025 11:17 pm IST",
      updatedTime: "June 05, 2025 06:23 am IST",
      byline: "THE HINDU BUREAU",
      caption: "The Hindu coverage detailing the formation of ASHA by senior hoteliers across Andhra Pradesh, including the elected leadership and advisory board.",
      verificationNotice: "Verified against The Hindu publication (June 04–05, 2025)."
    }
  },
  {
    id: "event-union-tourism-minister-2025",
    title: "ASHA Delegation Meets Hon'ble Union Tourism Minister",
    type: "meeting",
    category: "Central Government Engagement / Tourism Policy",
    date: "2025-06-26",
    time: "Official Ministerial Consultation",
    location: "Vijayawada / Andhra Pradesh",
    association: "Star Hotels Association of Andhra Pradesh (ASHA)",
    description: "A delegation representing the Star Hotels Association of Andhra Pradesh (ASHA) met the Hon'ble Union Tourism Minister in Vijayawada on 26 June 2025. The delegation felicitated the Minister and discussed central tourism schemes, connectivity, and development priorities for Andhra Pradesh's hospitality industry.",
    organizer: "Star Hotels Association of Andhra Pradesh (ASHA)",
    participants: "ASHA Leadership Delegation (President R. V. Swamy, Vice-President Ghattamaneni Venkat, Treasurer Gudisa Shivakumar, Council Members) & Hon'ble Union Tourism Minister",
    image: "assets/events/union-tourism-minister-meeting.jpg",
    thumbnail: "assets/events/union-tourism-minister-meeting.jpg",
    detailUrl: "news-union-tourism-minister.html",
    gallery: [
      {
        id: "img-union-minister-meeting",
        src: "assets/events/union-tourism-minister-meeting.jpg",
        title: "ASHA Delegation with Hon'ble Union Tourism Minister",
        alt: "ASHA leadership delegation meeting and felicitating the Hon'ble Union Tourism Minister on 26 June 2025",
        caption: "ASHA leadership delegation meeting and felicitating the Hon'ble Union Tourism Minister during the official ministerial visit on 26 June 2025.",
        type: "event-photo",
        isPrimary: true
      }
    ]
  },
  {
    id: "event-power-tariff-representation-2025",
    title: "ASHA State Roundtable on Power Tariff Rationalisation & Municipal Tax Relief",
    type: "meeting",
    category: "Policy Representation / Energy & Municipal Reform",
    date: "2025-07-16",
    time: "Executive Session & Press Briefing",
    location: "Vijayawada / Visakhapatnam / Kakinada",
    association: "Star Hotels Association of Andhra Pradesh (ASHA)",
    description: "ASHA leadership and hoteliers operating classified star hotels across Andhra Pradesh convened to formulate a unified appeal to the State Government seeking reduction of power tariff from ₹12.90 to ₹7 per unit, extension of power concessions to existing hotels, rationalisation of caution deposits, and relief on municipal taxation.",
    organizer: "Star Hotels Association of Andhra Pradesh (ASHA)",
    participants: "ASHA President R. V. Swamy, Treasurer Gudisa Shivakumar, Council Member Sharan Valluru, Vice-President Ghattamaneni Venkat, and representatives of ~80 star hotels",
    image: "assets/events/asha-power-tariff-meeting.jpg",
    thumbnail: "assets/events/asha-power-tariff-meeting.jpg",
    detailUrl: "news-power-tariff-representation.html",
    gallery: [
      {
        id: "img-power-tariff-meeting",
        src: "assets/events/asha-power-tariff-meeting.jpg",
        title: "ASHA Executive Consultation on Power Tariff & Taxation",
        alt: "Senior hoteliers and ASHA leadership assembled at the roundtable discussion on power tariffs and municipal tax relief",
        caption: "ASHA leadership and member hoteliers convened at the state executive session addressing high power tariffs, electricity caution deposits, and municipal taxation.",
        type: "event-photo",
        isPrimary: true
      },
      {
        id: "img-deccan-clipping",
        src: "assets/events/deccan-chronicle-power-tariff-clipping.jpg",
        title: "Deccan Chronicle Press Coverage",
        alt: "Deccan Chronicle report titled 'AP hotels want power tariff cut, call it too high'",
        caption: "Press coverage by Deccan Chronicle (Vijayawada, July 16, 2025 by Sampat G. Samritan) detailing ASHA's appeal for ₹7/unit tariff, parity for existing hotels, and municipal tax relief.",
        type: "press-clipping",
        isPress: true
      }
    ],
    pressCoverage: {
      source: "Deccan Chronicle",
      portal: "Deccan Chronicle (Vijayawada Print & Digital Edition)",
      clippingSrc: "assets/events/deccan-chronicle-power-tariff-clipping.jpg",
      headline: "AP hotels want power tariff cut, call it too high",
      publishedTime: "July 16, 2025",
      byline: "SAMPAT G. SAMRITAN | DC",
      caption: "Deccan Chronicle report highlighting ASHA's appeal for power tariff rationalisation from ₹12.90 to ₹7 per unit and relief in municipal taxes.",
      verificationNotice: "Verified against Deccan Chronicle publication (Vijayawada, July 16, 2025)."
    }
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
    governmentBody: "Energy Department & Municipal Administration, Government of Andhra Pradesh",
    date: "2025-07-16",
    purpose: "Representation on commercial power tariff reduction (₹12.90 to ₹7/unit), parity for existing hotels under industry status, caution deposit relief, and 50% municipal tax rebate",
    representatives: "ASHA President R. V. Swamy, Executive Committee, and Member Hoteliers",
    outcome: "Sector memorandum submitted; state acknowledged for reducing star hotel bar excise duty to ₹25 lakh; regional roundtables scheduled at Dasapalla Vizag and Sarovar Portico Kakinada",
    image: "assets/events/asha-power-tariff-meeting.jpg"
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
  },
  {
    governmentBody: "Ministry of Tourism, Government of India",
    date: "2025-06-26",
    purpose: "Meeting and felicitation of Hon'ble Union Tourism Minister; submission of hospitality representations",
    representatives: "ASHA Leadership Delegation (President R. V. Swamy, Vice-President Ghattamaneni Venkat, Treasurer Gudisa Shivakumar, Council Members)",
    outcome: "Felicitated Union Minister with floral presentation; high-level discussions on central tourism assistance and state hospitality priorities",
    image: "assets/events/union-tourism-minister-meeting.jpg"
  }
];

window.ASHA_CRISIS_ADVISORIES = [];
window.ASHA_INDUSTRY_REPORTS = [];

// Backward-compatibility alias
window.ASHA_UPDATES = window.ASHA_NEWS;


