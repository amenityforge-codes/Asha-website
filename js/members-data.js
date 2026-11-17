/**
 * ASHA Member and Partner Directory Data Architecture
 *
 * This data file stores verified records for the ASHA Member Ecosystem.
 *
 * IMPORTANT CLIENT RULE:
 * DO NOT fabricate or add unverified/sample records, hotel names, logos,
 * partner names, statistics, or placeholder profiles.
 * When verified data is received from the ASHA Secretariat, populate the
 * respective arrays below according to the defined schemas.
 *
 * ------------------------------------------------------------------------
 * 1. HOTEL MEMBERS SCHEMA
 * ------------------------------------------------------------------------
 * Represents classified 3-Star and above hotels in Andhra Pradesh across all 26 districts.
 *
 * {
 *   name: "Official Property Name",             // Required: string
 *   category: "hotel",                          // Required: "hotel"
 *   classification: "3-star",                   // Required: "3-star" | "4-star" | "5-star" | "deluxe-heritage"
 *   city: "Vijayawada",                         // Required: string (city name)
 *   district: "NTR",                            // Required: one of the 26 Andhra Pradesh districts
 *   website: "https://example.com",             // Optional: valid https?:// URL
 *   profile: "Property summary profile...",     // Optional: string
 *   image: "assets/members/hotels/prop.jpg"     // Optional: relative or absolute image path
 * }
 *
 * ------------------------------------------------------------------------
 * 2. INDUSTRY PARTNERS SCHEMA
 * ------------------------------------------------------------------------
 * Represents relevant suppliers, consultants, technology, training, and hospitality service providers.
 *
 * {
 *   name: "Organisation Name",                  // Required: string
 *   category: "industry",                       // Required: "industry"
 *   partnerType: "Hospitality Supplier",        // Required: "Hospitality Supplier" | "Consultant" | "Technology Provider" | "Training Provider" | "Professional Service" | "Other"
 *   city: "Visakhapatnam",                      // Optional: string
 *   district: "Visakhapatnam",                  // Optional: string
 *   website: "https://example.com",             // Optional: valid https?:// URL
 *   profile: "Supplier or service overview...", // Optional: string
 *   image: "assets/members/industry/logo.png"   // Optional: relative or absolute logo path
 * }
 *
 * ------------------------------------------------------------------------
 * 3. INSTITUTIONAL PARTNERS SCHEMA
 * ------------------------------------------------------------------------
 * Represents tourism bodies, universities, hospitality associations, and relevant public institutions.
 *
 * {
 *   name: "Institution Name",                   // Required: string
 *   category: "institution",                    // Required: "institution"
 *   institutionType: "Tourism Body",            // Required: "Tourism Body" | "University / Academic Institution" | "Hospitality Association" | "Government Body / Public Institution" | "Other"
 *   city: "Amaravati",                          // Optional: string
 *   district: "Guntur",                         // Optional: string
 *   website: "https://example.com",             // Optional: valid https?:// URL
 *   profile: "Partnership scope description...",// Optional: string
 *   image: "assets/members/institutions/logo.png" // Optional: relative or absolute logo path
 * }
 */

// Verified Hotel Members (Classified 3-Star and above in Andhra Pradesh)
// Verified from The Hindu official publication, June 04-05, 2025
window.ASHA_HOTEL_MEMBERS = [
  {
    name: "Hyatt Place Vijayawada",
    category: "hotel",
    classification: "5-star",
    city: "Vijayawada",
    district: "NTR",
    profile: "Represented by Chairman R. V. Swamy (President, ASHA). Premium international business hotel in Vijayawada."
  },
  {
    name: "Venky Residency",
    category: "hotel",
    classification: "3-star",
    city: "Kakinada",
    district: "Kakinada",
    profile: "Represented by Joint Managing Director S. Murthy Chittoory (General Secretary, ASHA). Prominent hospitality landmark in Kakinada."
  },
  {
    name: "SVN Lake Palace",
    category: "hotel",
    classification: "3-star",
    city: "Vizianagaram",
    district: "Vizianagaram",
    profile: "Represented by Managing Director Gudisa Shivakumar (Treasurer, ASHA). Renowned hospitality property in Vizianagaram."
  },
  {
    name: "Taj Bliss",
    category: "hotel",
    classification: "4-star",
    city: "Tirupati",
    district: "Tirupati",
    profile: "Represented by Managing Director Bala Krishna Reddy (Vice-President, ASHA). Leading star hotel serving pilgrimage and business travelers in Tirupati."
  },
  {
    name: "Daspalla Group / Daspalla Hotels",
    category: "hotel",
    classification: "4-star",
    city: "Visakhapatnam",
    district: "Visakhapatnam",
    profile: "Represented by Joint Managing Director Ghattamaneni Venkat (Vice-President, ASHA) and General Manager S. Prashant. Landmark hospitality chain in coastal Andhra Pradesh."
  },
  {
    name: "Hotel Elegant",
    category: "hotel",
    classification: "3-star",
    city: "Visakhapatnam",
    district: "Visakhapatnam",
    profile: "Represented by Managing Director M. V. Pavan Kartheek (Joint Secretary, ASHA). Prominent hospitality property in Visakhapatnam."
  },
  {
    name: "Hotel Shelton & La hospin",
    category: "hotel",
    classification: "3-star",
    city: "Rajamahendravaram",
    district: "East Godavari",
    profile: "Represented by Managing Director Pandu Chowdhary (Executive Member, ASHA). Leading hospitality properties in the Godavari region."
  },
  {
    name: "GRT Grand Vijayawada",
    category: "hotel",
    classification: "4-star",
    city: "Vijayawada",
    district: "NTR",
    profile: "Represented by Managing Director Sharan Valluru (Executive Member, ASHA). Upscale star hotel in Vijayawada."
  },
  {
    name: "Gowtham Grand",
    category: "hotel",
    classification: "3-star",
    city: "Guntur",
    district: "Guntur",
    profile: "Represented by Managing Director Pratap N. (Executive Member, ASHA). Prominent classified hotel in Guntur."
  },
  {
    name: "Vivanta Vijayawada (Taj)",
    category: "hotel",
    classification: "5-star",
    city: "Vijayawada",
    district: "NTR",
    profile: "Represented by Chairman M. Rajaiah (Advisory Board, ASHA) and General Manager Nageswara Rao (Executive Member, ASHA). Flagship 5-star hotel in Vijayawada."
  },
  {
    name: "Novotel Visakhapatnam Varun Beach",
    category: "hotel",
    classification: "5-star",
    city: "Visakhapatnam",
    district: "Visakhapatnam",
    profile: "Represented by Chairman Prabhu Kishore (Varun Hospitality / Advisory Board, ASHA). Premier coastal 5-star hotel in Visakhapatnam."
  },
  {
    name: "Lemon Tree Premiere Vijayawada",
    category: "hotel",
    classification: "4-star",
    city: "Vijayawada",
    district: "NTR",
    profile: "Represented by Chairman Gokaraju Gangaraju (Advisory Board, ASHA). Upscale business hotel in central Vijayawada."
  },
  {
    name: "Fortune Murali Park",
    category: "hotel",
    classification: "4-star",
    city: "Vijayawada",
    district: "NTR",
    profile: "Represented by Managing Director Muttavarapu Murali Krishna (Advisory Board, ASHA). Prominent Member ITC Hotel Group property in Vijayawada."
  },
  {
    name: "Hotel Dolphin Visakhapatnam",
    category: "hotel",
    classification: "4-star",
    city: "Visakhapatnam",
    district: "Visakhapatnam",
    profile: "Landmark star hotel property in Visakhapatnam participating in ASHA state consultations on hospitality infrastructure and energy tariffs."
  },
  {
    name: "Sarovar Portico Kakinada",
    category: "hotel",
    classification: "3-star",
    city: "Kakinada",
    district: "Kakinada",
    profile: "Prominent classified hotel and regional executive host venue for ASHA industry consultations in the Godavari coastal corridor."
  }
];

// Verified Industry Partners (Hospitality suppliers, consultants, service providers)
window.ASHA_INDUSTRY_PARTNERS = [];

// Verified Institutional Partners (Tourism bodies, universities, hospitality associations)
window.ASHA_INSTITUTIONAL_PARTNERS = [];

// Unified dataset fallback for backwards compatibility
window.ASHA_MEMBERS = window.ASHA_HOTEL_MEMBERS;

