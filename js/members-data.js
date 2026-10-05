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
window.ASHA_HOTEL_MEMBERS = [];

// Verified Industry Partners (Hospitality suppliers, consultants, service providers)
window.ASHA_INDUSTRY_PARTNERS = [];

// Verified Institutional Partners (Tourism bodies, universities, hospitality associations)
window.ASHA_INSTITUTIONAL_PARTNERS = [];

// Unified dataset fallback for backwards compatibility
window.ASHA_MEMBERS = [];

