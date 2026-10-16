/**
 * ASHA Leadership & Institutional Credibility Data
 *
 * This data file stores verified leadership, legal status, and institutional records.
 *
 * CRITICAL CLIENT RULE:
 * Whenever information is not available from the ASHA Secretariat, values MUST remain empty.
 * DO NOT insert placeholder names, sample numbers, fake bios, or unverified affiliations.
 * The UI will detect empty/unverified fields and display the red "CLIENT DATA REQUIRED" indicator.
 */

window.ASHA_LEADERSHIP = {
  // President of the Association
  president: {
    name: "",
    designation: "President",
    liaison: "Vijayawada / Amaravati Liaison",
    photo: "",
    bio: "",
    verified: false
  },

  // General Secretary of the Association
  generalSecretary: {
    name: "",
    designation: "General Secretary",
    liaison: "Vijayawada / Amaravati Liaison",
    photo: "",
    bio: "",
    verified: false
  },

  // Executive Committee Members (array of verified member objects)
  // Schema: { name: "", role: "", photo: "", bio: "", verified: true }
  executiveCommittee: [],

  // Legal & Registration Status
  registration: {
    act: "Andhra Pradesh Societies Registration Act",
    legalStatus: "Registered Non-Profit Society",
    registrationNumber: "",
    registrationDate: "",
    registeredOffice: "Vijayawada / Amaravati, Andhra Pradesh",
    verified: false
  },

  // Founding Member Hotels (array of verified hotel objects)
  // Schema: { name: "", classification: "", city: "", district: "", photo: "", website: "" }
  foundingMembers: [],

  // Institutional Affiliations (array of verified institutional partner objects)
  // Schema: { name: "", type: "", relationship: "", website: "", logo: "" }
  affiliations: [],

  // ASHA in Action / Real Event Photos (array of verified event objects)
  // Schema: { title: "", date: "", location: "", eventType: "", photo: "", description: "" }
  events: [
    {
      title: "ASHA Representatives Meet the Chief Minister of Andhra Pradesh",
      date: "2026-06-26",
      location: "Vijayawada / Amaravati",
      eventType: "Government Consultation",
      photo: "assets/events/cm-meeting-presentation.jpeg",
      detailUrl: "news-cm-meeting.html",
      description: "A delegation representing the Star Hotels Association of Andhra Pradesh met the Hon’ble Chief Minister to present association materials and discuss hospitality development across Andhra Pradesh."
    },
    {
      title: "ASHA Representatives at the Amaravati Foundation Stone-Laying Ceremony",
      date: "2025-11-28",
      location: "Amaravati",
      eventType: "Official Ceremony & Representation",
      photo: "assets/events/amaravati-ceremony-representation.jpeg",
      detailUrl: "news-amaravati-ceremony.html",
      description: "Representatives of the Star Hotels Association of Andhra Pradesh attended the foundation stone-laying ceremony for 15 public sector banking and insurance offices in Amaravati, addressed by Union Finance Minister Smt. Nirmala Sitharaman."
    },
    {
      title: "Representation on ITC for GST Submitted to Hon'ble Tourism Minister Kandula Durgesh",
      date: "2025-10-08",
      location: "Vijayawada",
      eventType: "Government Representation",
      photo: "assets/events/tourism-minister-gst-representation.jpeg",
      detailUrl: "news-gst-representation.html",
      description: "ASHA leadership delegation met Hon'ble Tourism Minister Kandula Durgesh in Vijayawada to present an official representation regarding Input Tax Credit (ITC) under GST for hotels and restaurants."
    }
  ]
};
