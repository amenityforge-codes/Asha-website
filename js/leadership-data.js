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
    name: "R. V. Swamy",
    designation: "President",
    liaison: "Vijayawada / Amaravati Liaison",
    photo: "",
    bio: "Leads executive administration, statutory delegations before Andhra Pradesh Tourism and state government ministries, and statewide representation for classified star hotels.",
    verified: true
  },

  // General Secretary of the Association
  generalSecretary: {
    name: "S. Murthy Chittoory",
    designation: "General Secretary",
    liaison: "Vijayawada / Amaravati Liaison",
    photo: "",
    bio: "Directs secretariat liaison, institutional coordination, regulatory submissions, and member communications across Andhra Pradesh.",
    verified: true
  },

  // Executive Committee Members (array of verified member objects)
  // Schema: { name: "", role: "", photo: "", bio: "", verified: true }
  executiveCommittee: [
    {
      name: "Sharan V.",
      role: "Council Member",
      photo: "",
      bio: "Executive Council representative participating in state tourism consultations and ministerial delegations.",
      verified: true
    }
  ],

  // Legal & Registration Status
  registration: {
    act: "Andhra Pradesh Societies Registration Act",
    legalStatus: "Registered Non-Profit Society",
    jurisdiction: "State of Andhra Pradesh (All 26 Districts)",
    registeredOffice: "Vijayawada / Amaravati, Andhra Pradesh",
    verified: true
  }
};
