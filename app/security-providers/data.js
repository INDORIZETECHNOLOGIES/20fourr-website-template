/* ============================================================
   Providers — the directory behind /security-providers
   ------------------------------------------------------------
   This is a marketing site with no backend, so the listing is a
   static dataset compiled here rather than a search API. Two
   consequences worth stating out loud:

     1. Money is in RUPEES, not paise. The booking platform stores
        paise because it settles payments; nothing here settles
        anything, so the indirection would only be a rounding bug
        waiting to happen.
     2. The count line and the page count are computed from this
        array. If the directory grows, the page says so on its own —
        no hardcoded total to drift out of date.

   The filter vocabulary (categories, badges, cities, sorts)
   mirrors the booking platform's, so a visitor who lands on the
   app from here meets the same words in the same order.
   ============================================================ */

/** Title Case and singular — these label one provider's role. */
export const CATEGORY_LABEL = {
  guard: 'Security Guard',
  bouncer: 'Bouncer',
  gunman: 'Armed Gunman',
  pso: 'Personal Security Officer',
};

/* Sentence-case plurals for headings and prose. "Security Guards in Delhi"
   reads as a job posting — the wrong intent for a listing page. */
export const CATEGORY_PLURAL = {
  guard: 'security guards',
  bouncer: 'bouncers',
  gunman: 'armed gunmen',
  pso: 'personal security officers',
};

export const CATEGORY_ORDER = ['guard', 'bouncer', 'gunman', 'pso'];

/** Badges are earned from verified documents, never self-declared. */
export const BADGE_LABEL = {
  verified_identity: 'Verified identity',
  ex_serviceman: 'Ex-serviceman',
  psara_verified: 'PSARA verified',
  firearms_authorized: 'Firearms authorised',
  background_verified: 'Background verified',
  top_rated: 'Top rated',
  elite_protection: 'Elite protection',
};

/* The cities offered in the browse filter. A provider's coverage can run
   wider than this list — these are the ones with enough depth to be worth
   filtering by. */
export const FILTER_CITIES = [
  'Ahmedabad',
  'Bengaluru',
  'Chandigarh',
  'Chennai',
  'Dehradun',
  'Delhi',
  'Gurugram',
  'Hyderabad',
  'Indore',
  'Jaipur',
  'Kolkata',
  'Lucknow',
  'Mumbai',
  'Noida',
  'Pune',
  'Surat',
];

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Most relevant' },
  { value: 'rating', label: 'Highest rated' },
  { value: 'price', label: 'Lowest day rate' },
  { value: 'experience', label: 'Most experienced' },
];

export const PAGE_SIZE = 12;

/* ------------------------------------------------------------
   The directory. Array order is the "Most relevant" sort.
   ------------------------------------------------------------ */
export const PROVIDERS = [
  {
    id: 'gaurav-patel-delhi',
    name: 'Gaurav Patel',
    agency: false,
    city: 'Delhi',
    cities: ['Delhi', 'Noida'],
    categories: ['bouncer'],
    rating: 5.0,
    ratingCount: 114,
    badges: ['verified_identity', 'psara_verified', 'top_rated'],
    dailyRate: 2500,
    experienceYears: 9,
  },
  {
    id: 'security-agency-surat',
    name: null,
    agency: true,
    city: 'Surat',
    cities: ['Surat', 'Ahmedabad', 'Vadodara'],
    categories: ['guard', 'bouncer', 'gunman'],
    rating: 5.0,
    ratingCount: 96,
    badges: ['verified_identity', 'psara_verified', 'firearms_authorized'],
    dailyRate: 5500,
    experienceYears: 12,
  },
  {
    id: 'pankaj-chauhan-jaipur',
    name: 'Pankaj Chauhan',
    agency: false,
    city: 'Jaipur',
    cities: ['Jaipur', 'Jodhpur', 'Udaipur'],
    categories: ['pso', 'gunman', 'guard'],
    rating: 5.0,
    ratingCount: 39,
    badges: ['verified_identity', 'psara_verified', 'firearms_authorized'],
    dailyRate: 1500,
    experienceYears: 11,
  },
  {
    id: 'chetan-roy-delhi',
    name: 'Chetan Roy',
    agency: false,
    city: 'Delhi',
    cities: ['Delhi', 'Noida', 'Gurugram'],
    categories: ['guard', 'bouncer', 'gunman'],
    rating: 5.0,
    ratingCount: 36,
    badges: ['verified_identity', 'psara_verified', 'firearms_authorized'],
    dailyRate: 1800,
    experienceYears: 7,
  },
  {
    id: 'bharat-kapoor-gurugram',
    name: 'Bharat Kapoor',
    agency: false,
    city: 'Gurugram',
    cities: ['Gurugram', 'Delhi', 'Noida', 'Faridabad'],
    categories: ['pso', 'gunman', 'guard'],
    rating: 5.0,
    ratingCount: 31,
    badges: ['verified_identity', 'psara_verified', 'firearms_authorized'],
    dailyRate: 1200,
    experienceYears: 8,
  },
  {
    id: 'om-shukla-ahmedabad',
    name: 'Om Shukla',
    agency: false,
    city: 'Ahmedabad',
    cities: ['Ahmedabad', 'Surat', 'Vadodara'],
    categories: ['guard', 'bouncer', 'gunman'],
    rating: 4.9,
    ratingCount: 74,
    badges: ['verified_identity', 'psara_verified', 'firearms_authorized'],
    dailyRate: 1400,
    experienceYears: 10,
  },
  {
    id: 'arjun-sharma-delhi',
    name: 'Arjun Sharma',
    agency: false,
    city: 'Delhi',
    cities: ['Delhi', 'Noida', 'Gurugram', 'Faridabad'],
    categories: ['gunman', 'guard'],
    rating: 4.9,
    ratingCount: 67,
    badges: ['verified_identity', 'psara_verified', 'firearms_authorized'],
    dailyRate: 1800,
    experienceYears: 13,
  },
  {
    id: 'lokesh-sethi-chandigarh',
    name: 'Lokesh Sethi',
    agency: false,
    city: 'Chandigarh',
    cities: ['Chandigarh', 'Mohali'],
    categories: ['guard'],
    rating: 4.9,
    ratingCount: 41,
    badges: ['verified_identity', 'psara_verified', 'top_rated'],
    dailyRate: 1800,
    experienceYears: 6,
  },
  {
    id: 'dev-anand-kochi',
    name: 'Dev Anand',
    agency: false,
    city: 'Kochi',
    cities: ['Kochi', 'Thiruvananthapuram', 'Kozhikode'],
    categories: ['guard'],
    rating: 4.9,
    ratingCount: 39,
    badges: ['verified_identity', 'psara_verified', 'top_rated'],
    dailyRate: 1500,
    experienceYears: 5,
  },
  {
    id: 'rahul-saha-kochi',
    name: 'Rahul Saha',
    agency: false,
    city: 'Kochi',
    cities: ['Kochi', 'Thiruvananthapuram', 'Kozhikode'],
    categories: ['guard', 'bouncer'],
    rating: 4.9,
    ratingCount: 32,
    badges: ['verified_identity', 'psara_verified', 'top_rated'],
    dailyRate: 1500,
    experienceYears: 7,
  },
  {
    id: 'akash-dubey-chennai',
    name: 'Akash Dubey',
    agency: false,
    city: 'Chennai',
    cities: ['Chennai', 'Coimbatore', 'Madurai'],
    categories: ['bouncer'],
    rating: 4.9,
    ratingCount: 32,
    badges: ['verified_identity', 'psara_verified', 'top_rated'],
    dailyRate: 2500,
    experienceYears: 8,
  },
  {
    id: 'mukesh-sharma-delhi',
    name: 'Mukesh Sharma',
    agency: false,
    city: 'Delhi',
    cities: ['Delhi', 'Noida'],
    categories: ['guard', 'bouncer'],
    rating: 4.8,
    ratingCount: 63,
    badges: ['verified_identity', 'psara_verified', 'top_rated'],
    dailyRate: 1400,
    experienceYears: 6,
  },
  {
    id: 'security-agency-mumbai',
    name: null,
    agency: true,
    city: 'Mumbai',
    cities: ['Mumbai', 'Thane', 'Navi Mumbai', 'Pune'],
    categories: ['guard', 'bouncer', 'gunman', 'pso'],
    rating: 4.8,
    ratingCount: 158,
    badges: ['verified_identity', 'psara_verified', 'firearms_authorized'],
    dailyRate: 4800,
    experienceYears: 16,
  },
  {
    id: 'imran-qureshi-mumbai',
    name: 'Imran Qureshi',
    agency: false,
    city: 'Mumbai',
    cities: ['Mumbai', 'Thane', 'Navi Mumbai'],
    categories: ['bouncer', 'pso'],
    rating: 4.8,
    ratingCount: 91,
    badges: ['verified_identity', 'psara_verified', 'top_rated'],
    dailyRate: 2800,
    experienceYears: 11,
  },
  {
    id: 'satish-rane-pune',
    name: 'Satish Rane',
    agency: false,
    city: 'Pune',
    cities: ['Pune', 'Mumbai', 'Nashik'],
    categories: ['guard', 'gunman'],
    rating: 4.8,
    ratingCount: 78,
    badges: ['verified_identity', 'psara_verified', 'ex_serviceman'],
    dailyRate: 1600,
    experienceYears: 14,
  },
  {
    id: 'harpreet-singh-delhi',
    name: 'Harpreet Singh',
    agency: false,
    city: 'Delhi',
    cities: ['Delhi', 'Gurugram', 'Noida'],
    categories: ['pso', 'gunman'],
    rating: 4.8,
    ratingCount: 54,
    badges: ['verified_identity', 'psara_verified', 'elite_protection'],
    dailyRate: 3200,
    experienceYears: 15,
  },
  {
    id: 'vikram-reddy-hyderabad',
    name: 'Vikram Reddy',
    agency: false,
    city: 'Hyderabad',
    cities: ['Hyderabad', 'Secunderabad', 'Warangal'],
    categories: ['guard', 'gunman'],
    rating: 4.8,
    ratingCount: 52,
    badges: ['verified_identity', 'psara_verified', 'firearms_authorized'],
    dailyRate: 1700,
    experienceYears: 9,
  },
  {
    id: 'naveen-gowda-bengaluru',
    name: 'Naveen Gowda',
    agency: false,
    city: 'Bengaluru',
    cities: ['Bengaluru', 'Mysuru'],
    categories: ['guard', 'bouncer'],
    rating: 4.8,
    ratingCount: 47,
    badges: ['verified_identity', 'psara_verified', 'background_verified'],
    dailyRate: 1900,
    experienceYears: 6,
  },
  {
    id: 'subhash-das-kolkata',
    name: 'Subhash Das',
    agency: false,
    city: 'Kolkata',
    cities: ['Kolkata', 'Howrah', 'Durgapur'],
    categories: ['guard'],
    rating: 4.8,
    ratingCount: 44,
    badges: ['verified_identity', 'psara_verified', 'ex_serviceman'],
    dailyRate: 1100,
    experienceYears: 18,
  },
  {
    id: 'rajesh-negi-dehradun',
    name: 'Rajesh Negi',
    agency: false,
    city: 'Dehradun',
    cities: ['Dehradun', 'Haridwar', 'Rishikesh'],
    categories: ['guard', 'gunman'],
    rating: 4.8,
    ratingCount: 38,
    badges: ['verified_identity', 'psara_verified', 'ex_serviceman'],
    dailyRate: 1300,
    experienceYears: 17,
  },
  {
    id: 'sameer-khan-lucknow',
    name: 'Sameer Khan',
    agency: false,
    city: 'Lucknow',
    cities: ['Lucknow', 'Kanpur', 'Varanasi'],
    categories: ['bouncer', 'guard'],
    rating: 4.7,
    ratingCount: 86,
    badges: ['verified_identity', 'psara_verified', 'top_rated'],
    dailyRate: 1200,
    experienceYears: 7,
  },
  {
    id: 'security-agency-bengaluru',
    name: null,
    agency: true,
    city: 'Bengaluru',
    cities: ['Bengaluru', 'Mysuru', 'Mangaluru'],
    categories: ['guard', 'bouncer', 'pso'],
    rating: 4.7,
    ratingCount: 73,
    badges: ['verified_identity', 'psara_verified', 'background_verified'],
    dailyRate: 4200,
    experienceYears: 10,
  },
  {
    id: 'anil-yadav-noida',
    name: 'Anil Yadav',
    agency: false,
    city: 'Noida',
    cities: ['Noida', 'Delhi', 'Ghaziabad'],
    categories: ['guard'],
    rating: 4.7,
    ratingCount: 69,
    badges: ['verified_identity', 'psara_verified', 'background_verified'],
    dailyRate: 1100,
    experienceYears: 5,
  },
  {
    id: 'farhan-shaikh-mumbai',
    name: 'Farhan Shaikh',
    agency: false,
    city: 'Mumbai',
    cities: ['Mumbai', 'Navi Mumbai'],
    categories: ['bouncer'],
    rating: 4.7,
    ratingCount: 64,
    badges: ['verified_identity', 'psara_verified', 'top_rated'],
    dailyRate: 2600,
    experienceYears: 8,
  },
  {
    id: 'deepak-joshi-indore',
    name: 'Deepak Joshi',
    agency: false,
    city: 'Indore',
    cities: ['Indore', 'Bhopal', 'Ujjain'],
    categories: ['guard', 'gunman'],
    rating: 4.7,
    ratingCount: 57,
    badges: ['verified_identity', 'psara_verified', 'firearms_authorized'],
    dailyRate: 1300,
    experienceYears: 12,
  },
  {
    id: 'karan-malhotra-gurugram',
    name: 'Karan Malhotra',
    agency: false,
    city: 'Gurugram',
    cities: ['Gurugram', 'Delhi'],
    categories: ['pso'],
    rating: 4.7,
    ratingCount: 49,
    badges: ['verified_identity', 'psara_verified', 'elite_protection'],
    dailyRate: 3600,
    experienceYears: 13,
  },
  {
    id: 'mahesh-patil-pune',
    name: 'Mahesh Patil',
    agency: false,
    city: 'Pune',
    cities: ['Pune', 'Nashik'],
    categories: ['guard', 'bouncer'],
    rating: 4.7,
    ratingCount: 43,
    badges: ['verified_identity', 'psara_verified', 'background_verified'],
    dailyRate: 1400,
    experienceYears: 6,
  },
  {
    id: 'ramesh-thakur-chandigarh',
    name: 'Ramesh Thakur',
    agency: false,
    city: 'Chandigarh',
    cities: ['Chandigarh', 'Panchkula', 'Mohali'],
    categories: ['gunman', 'guard'],
    rating: 4.7,
    ratingCount: 40,
    badges: ['verified_identity', 'psara_verified', 'ex_serviceman'],
    dailyRate: 1600,
    experienceYears: 19,
  },
  {
    id: 'sanjay-mishra-lucknow',
    name: 'Sanjay Mishra',
    agency: false,
    city: 'Lucknow',
    cities: ['Lucknow', 'Kanpur'],
    categories: ['guard'],
    rating: 4.7,
    ratingCount: 35,
    badges: ['verified_identity', 'psara_verified', 'background_verified'],
    dailyRate: 1000,
    experienceYears: 4,
  },
  {
    id: 'ganesh-iyer-chennai',
    name: 'Ganesh Iyer',
    agency: false,
    city: 'Chennai',
    cities: ['Chennai', 'Coimbatore'],
    categories: ['guard', 'gunman'],
    rating: 4.7,
    ratingCount: 33,
    badges: ['verified_identity', 'psara_verified', 'firearms_authorized'],
    dailyRate: 1500,
    experienceYears: 11,
  },
  {
    id: 'security-agency-delhi',
    name: null,
    agency: true,
    city: 'Delhi',
    cities: ['Delhi', 'Noida', 'Gurugram', 'Faridabad', 'Ghaziabad'],
    categories: ['guard', 'bouncer', 'gunman', 'pso'],
    rating: 4.6,
    ratingCount: 204,
    badges: ['verified_identity', 'psara_verified', 'firearms_authorized'],
    dailyRate: 5200,
    experienceYears: 21,
  },
  {
    id: 'tarun-bhatia-jaipur',
    name: 'Tarun Bhatia',
    agency: false,
    city: 'Jaipur',
    cities: ['Jaipur', 'Ajmer'],
    categories: ['bouncer', 'guard'],
    rating: 4.6,
    ratingCount: 81,
    badges: ['verified_identity', 'psara_verified', 'top_rated'],
    dailyRate: 1700,
    experienceYears: 7,
  },
  {
    id: 'prakash-nair-bengaluru',
    name: 'Prakash Nair',
    agency: false,
    city: 'Bengaluru',
    cities: ['Bengaluru', 'Hosur'],
    categories: ['guard'],
    rating: 4.6,
    ratingCount: 72,
    badges: ['verified_identity', 'psara_verified', 'background_verified'],
    dailyRate: 1200,
    experienceYears: 5,
  },
  {
    id: 'zubair-ahmed-hyderabad',
    name: 'Zubair Ahmed',
    agency: false,
    city: 'Hyderabad',
    cities: ['Hyderabad', 'Secunderabad'],
    categories: ['bouncer'],
    rating: 4.6,
    ratingCount: 66,
    badges: ['verified_identity', 'psara_verified', 'top_rated'],
    dailyRate: 2200,
    experienceYears: 9,
  },
  {
    id: 'ajay-verma-kolkata',
    name: 'Ajay Verma',
    agency: false,
    city: 'Kolkata',
    cities: ['Kolkata', 'Howrah'],
    categories: ['guard', 'bouncer'],
    rating: 4.6,
    ratingCount: 58,
    badges: ['verified_identity', 'psara_verified', 'background_verified'],
    dailyRate: 1300,
    experienceYears: 6,
  },
  {
    id: 'sunil-rawat-dehradun',
    name: 'Sunil Rawat',
    agency: false,
    city: 'Dehradun',
    cities: ['Dehradun', 'Mussoorie'],
    categories: ['pso', 'guard'],
    rating: 4.6,
    ratingCount: 45,
    badges: ['verified_identity', 'psara_verified', 'ex_serviceman'],
    dailyRate: 2400,
    experienceYears: 16,
  },
  {
    id: 'bhavesh-desai-ahmedabad',
    name: 'Bhavesh Desai',
    agency: false,
    city: 'Ahmedabad',
    cities: ['Ahmedabad', 'Gandhinagar'],
    categories: ['guard'],
    rating: 4.6,
    ratingCount: 42,
    badges: ['verified_identity', 'psara_verified', 'background_verified'],
    dailyRate: 1100,
    experienceYears: 4,
  },
  {
    id: 'nitin-solanki-indore',
    name: 'Nitin Solanki',
    agency: false,
    city: 'Indore',
    cities: ['Indore', 'Bhopal'],
    categories: ['bouncer'],
    rating: 4.6,
    ratingCount: 37,
    badges: ['verified_identity', 'psara_verified', 'top_rated'],
    dailyRate: 1800,
    experienceYears: 5,
  },
  {
    id: 'jitendra-pal-noida',
    name: 'Jitendra Pal',
    agency: false,
    city: 'Noida',
    cities: ['Noida', 'Ghaziabad'],
    categories: ['gunman', 'guard'],
    rating: 4.6,
    ratingCount: 34,
    badges: ['verified_identity', 'psara_verified', 'firearms_authorized'],
    dailyRate: 1600,
    experienceYears: 10,
  },
  {
    id: 'security-agency-pune',
    name: null,
    agency: true,
    city: 'Pune',
    cities: ['Pune', 'Mumbai', 'Nashik'],
    categories: ['guard', 'bouncer'],
    rating: 4.5,
    ratingCount: 118,
    badges: ['verified_identity', 'psara_verified', 'background_verified'],
    dailyRate: 3900,
    experienceYears: 11,
  },
  {
    id: 'irfan-ansari-surat',
    name: 'Irfan Ansari',
    agency: false,
    city: 'Surat',
    cities: ['Surat', 'Vadodara'],
    categories: ['bouncer', 'guard'],
    rating: 4.5,
    ratingCount: 76,
    badges: ['verified_identity', 'psara_verified', 'top_rated'],
    dailyRate: 1500,
    experienceYears: 6,
  },
  {
    id: 'praveen-kumar-chennai',
    name: 'Praveen Kumar',
    agency: false,
    city: 'Chennai',
    cities: ['Chennai'],
    categories: ['guard'],
    rating: 4.5,
    ratingCount: 61,
    badges: ['verified_identity', 'psara_verified', 'background_verified'],
    dailyRate: 1000,
    experienceYears: 3,
  },
  {
    id: 'yogesh-chauhan-gurugram',
    name: 'Yogesh Chauhan',
    agency: false,
    city: 'Gurugram',
    cities: ['Gurugram', 'Faridabad'],
    categories: ['bouncer'],
    rating: 4.5,
    ratingCount: 53,
    badges: ['verified_identity', 'psara_verified', 'top_rated'],
    dailyRate: 2100,
    experienceYears: 7,
  },
  {
    id: 'dinesh-shetty-mumbai',
    name: 'Dinesh Shetty',
    agency: false,
    city: 'Mumbai',
    cities: ['Mumbai', 'Thane'],
    categories: ['pso', 'gunman'],
    rating: 4.5,
    ratingCount: 48,
    badges: ['verified_identity', 'psara_verified', 'elite_protection'],
    dailyRate: 3400,
    experienceYears: 14,
  },
  {
    id: 'ravi-shankar-hyderabad',
    name: 'Ravi Shankar',
    agency: false,
    city: 'Hyderabad',
    cities: ['Hyderabad', 'Warangal'],
    categories: ['guard'],
    rating: 4.5,
    ratingCount: 41,
    badges: ['verified_identity', 'psara_verified', 'ex_serviceman'],
    dailyRate: 1100,
    experienceYears: 15,
  },
  {
    id: 'manoj-tiwari-lucknow',
    name: 'Manoj Tiwari',
    agency: false,
    city: 'Lucknow',
    cities: ['Lucknow', 'Varanasi'],
    categories: ['gunman', 'guard'],
    rating: 4.5,
    ratingCount: 36,
    badges: ['verified_identity', 'psara_verified', 'firearms_authorized'],
    dailyRate: 1400,
    experienceYears: 12,
  },
  {
    id: 'sourav-ghosh-kolkata',
    name: 'Sourav Ghosh',
    agency: false,
    city: 'Kolkata',
    cities: ['Kolkata', 'Durgapur'],
    categories: ['bouncer'],
    rating: 4.5,
    ratingCount: 30,
    badges: ['verified_identity', 'psara_verified', 'background_verified'],
    dailyRate: 1600,
    experienceYears: 4,
  },
  {
    id: 'ashok-bisht-dehradun',
    name: 'Ashok Bisht',
    agency: false,
    city: 'Dehradun',
    cities: ['Dehradun', 'Haridwar'],
    categories: ['guard'],
    rating: 4.4,
    ratingCount: 29,
    badges: ['verified_identity', 'psara_verified', 'ex_serviceman'],
    dailyRate: 1000,
    experienceYears: 20,
  },
];

/* ------------------------------------------------------------
   Formatting
   ------------------------------------------------------------ */

const inrFormatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });

export function inr(rupees) {
  if (rupees == null || Number.isNaN(rupees)) return '—';
  return `₹${inrFormatter.format(Math.round(rupees))}`;
}

/**
 * Public display name.
 *
 * Agencies are deliberately anonymised until a booking is confirmed, so pricing
 * stays comparable and nobody gets pulled into an off-platform negotiation before
 * anything is on record. Individuals appear under their own name.
 */
export function displayName(p) {
  if (p.agency) return p.city ? `Security agency in ${p.city}` : 'Verified security agency';
  return p.name || 'Security professional';
}

export function ratingLabel(avg, count) {
  if (!avg || !count) return 'No ratings yet';
  return `★ ${avg.toFixed(1)} (${count})`;
}

export function categoryList(categories) {
  return categories.map((c) => CATEGORY_LABEL[c]).join(' · ');
}

export function badgeLabel(b) {
  return BADGE_LABEL[b] ?? b;
}

export function isCategory(v) {
  return typeof v === 'string' && CATEGORY_ORDER.includes(v);
}

export function isSortBy(v) {
  return typeof v === 'string' && SORT_OPTIONS.some((o) => o.value === v);
}

export function findProvider(id) {
  return PROVIDERS.find((p) => p.id === id);
}

/* ------------------------------------------------------------
   Query
   ------------------------------------------------------------ */

function first(v) {
  return Array.isArray(v) ? v[0] : v;
}

/**
 * The validated view behind a query string. Shared by the page and its
 * generateMetadata so the heading, the title and the results can never
 * disagree about what is being shown.
 */
export function parseSearchParams(sp = {}) {
  const rawCategory = first(sp.category);
  const rawSort = first(sp.sortBy);
  return {
    category: isCategory(rawCategory) ? rawCategory : undefined,
    city: first(sp.city)?.trim() || undefined,
    sortBy: isSortBy(rawSort) ? rawSort : undefined,
    page: Math.max(1, Number(first(sp.page)) || 1),
  };
}

const SORTERS = {
  rating: (a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount,
  price: (a, b) => a.dailyRate - b.dailyRate,
  experience: (a, b) => b.experienceYears - a.experienceYears,
};

export function queryProviders({ category, city, sortBy, page = 1 } = {}) {
  let matched = PROVIDERS;
  if (category) matched = matched.filter((p) => p.categories.includes(category));
  if (city) matched = matched.filter((p) => p.cities.includes(city));

  // 'relevance' is the curated array order, so it needs no comparator.
  const sorter = SORTERS[sortBy];
  if (sorter) matched = [...matched].sort(sorter);

  const total = matched.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const current = Math.min(page, pages);
  const offset = (current - 1) * PAGE_SIZE;

  return {
    providers: matched.slice(offset, offset + PAGE_SIZE),
    total,
    page: current,
    pages,
    offset,
  };
}
