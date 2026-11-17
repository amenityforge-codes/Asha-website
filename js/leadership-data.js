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
    affiliation: "Chairman, Hyatt Place Vijayawada",
    liaison: "Vijayawada / Amaravati Liaison",
    photo: "",
    bio: "Chairman of Hyatt Place Vijayawada. Leads executive administration, statutory delegations before Andhra Pradesh Tourism and state government ministries, and statewide representation for classified star hotels.",
    verified: true
  },

  // General Secretary of the Association
  generalSecretary: {
    name: "S. Murthy Chittoory",
    designation: "General Secretary",
    affiliation: "Joint Managing Director, Venky Residency Kakinada",
    liaison: "Vijayawada / Amaravati Liaison",
    photo: "",
    bio: "Joint Managing Director of Venky Residency Kakinada. Directs secretariat liaison, institutional coordination, regulatory submissions, and member communications across Andhra Pradesh.",
    verified: true
  },

  // Executive Committee Members (verified from The Hindu publication, June 04-05, 2025)
  executiveCommittee: [
    {
      name: "Gudisa Shivakumar",
      role: "Treasurer",
      affiliation: "Managing Director, SVN Lake Palace, Vizianagaram",
      photo: "",
      verified: true
    },
    {
      name: "Bala Krishna Reddy",
      role: "Vice-President",
      affiliation: "Managing Director, Taj Bliss, Tirupati",
      photo: "",
      verified: true
    },
    {
      name: "Ghattamaneni Venkat",
      role: "Vice-President",
      affiliation: "Joint Managing Director, Daspalla Group, Vizag",
      photo: "",
      verified: true
    },
    {
      name: "M. V. Pavan Kartheek",
      role: "Joint Secretary",
      affiliation: "MD, Elegant, Vizag",
      photo: "",
      verified: true
    },
    {
      name: "Pandu Chowdhary",
      role: "Executive Member",
      affiliation: "MD, Shelton and La hospin, Rajamahendravaram",
      photo: "",
      verified: true
    },
    {
      name: "Sharan Valluru",
      role: "Executive Member",
      affiliation: "MD, GRT Grand, Vijayawada",
      photo: "",
      verified: true
    },
    {
      name: "Pratap N.",
      role: "Executive Member",
      affiliation: "MD, Gowtham Grand, Guntur",
      photo: "",
      verified: true
    },
    {
      name: "Nageswara Rao",
      role: "Executive Member",
      affiliation: "General Manager, Taj Vivanta, Vijayawada",
      photo: "",
      verified: true
    },
    {
      name: "S. Prashant",
      role: "Executive Member",
      affiliation: "General Manager, Daspalla Hotels",
      photo: "",
      verified: true
    }
  ],

  // Advisory Board (verified from The Hindu publication, June 04-05, 2025)
  advisoryBoard: [
    {
      name: "Prabhu Kishore",
      role: "Advisory Board Member",
      affiliation: "Chairman, Novotel (Varun Hospitality)",
      photo: "",
      verified: true
    },
    {
      name: "Gokaraju Gangaraju",
      role: "Advisory Board Member",
      affiliation: "Chairman, Lemon Tree Premiere",
      photo: "",
      verified: true
    },
    {
      name: "M. Rajaiah",
      role: "Advisory Board Member",
      affiliation: "Chairman, Taj Vivanta",
      photo: "",
      verified: true
    },
    {
      name: "Muttavarapu Murali Krishna",
      role: "Advisory Board Member",
      affiliation: "Managing Director, Fortune Murali Park",
      photo: "",
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
