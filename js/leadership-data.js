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
  events: []
};
