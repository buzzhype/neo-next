// data/personas.js
// Single file containing all data for the real estate assistant application

import {
  BookOpen,
  Users,
  Hotel,
  LineChart,
  Home,
  Palmtree,
  Leaf,
  Briefcase,
  Sparkles,
  Compass,
  Building,
  MapPin,
  DollarSign,
  BedDouble,
  Bath,
  Maximize,
  ThumbsUp,
  ThumbsDown,
  Utensils,
  Train,
  Coffee,
  GraduationCap,
  PersonWalking,
  DogIcon,
  Tree,
  Mountain,
  Fire,
  ShoppingBag,
  Wifi,
  Flower,
} from "lucide-react";

// ==================== City Data ====================
export const CITIES = [
  {
    id: "san-francisco",
    name: "San Francisco",
    icon: "🌉",
    lat: 37.7749,
    lng: -122.4194,
  },
  { id: "new-york", name: "New York", icon: "🗽", lat: 40.7128, lng: -74.006 },
  { id: "miami", name: "Miami", icon: "🌴", lat: 25.7617, lng: -80.1918 },
  {
    id: "los-angeles",
    name: "Los Angeles",
    icon: "🎬",
    lat: 34.0522,
    lng: -118.2437,
  },
  { id: "chicago", name: "Chicago", icon: "🌆", lat: 41.8781, lng: -87.6298 },
  { id: "seattle", name: "Seattle", icon: "☕", lat: 47.6062, lng: -122.3321 },
  { id: "austin", name: "Austin", icon: "🎸", lat: 30.2672, lng: -97.7431 },
  { id: "boston", name: "Boston", icon: "🏛️", lat: 42.3601, lng: -71.0589 },
  { id: "denver", name: "Denver", icon: "⛰️", lat: 39.7392, lng: -104.9903 },
];

// ==================== Agent Expertise Types ====================
export const EXPERTISE_TYPES = [
  {
    id: "firstTimeBuyer",
    title: "First-Time Buyer Guide",
    icon: BookOpen,
    description: "Expert in guiding first-time homebuyers through the process",
  },
  {
    id: "familyFocused",
    title: "Family-Focused Specialist",
    icon: Users,
    description: "Focuses on family-friendly properties and communities",
  },
  {
    id: "luxuryMarket",
    title: "Luxury Market Expert",
    icon: Hotel,
    description: "Specialized in high-end properties and exclusive areas",
  },
  {
    id: "investmentAnalyst",
    title: "Investment Analyst",
    icon: LineChart,
    description: "Focuses on ROI and investment opportunities",
  },
  {
    id: "downsizing",
    title: "Downsizing Specialist",
    icon: Home,
    description: "Expert in retirement and downsizing options",
  },
  {
    id: "vacationProperty",
    title: "Vacation Property Advisor",
    icon: Palmtree,
    description: "Specialized in vacation homes and rental properties",
  },
  {
    id: "sustainability",
    title: "Sustainability Expert",
    icon: Leaf,
    description: "Focused on eco-friendly and sustainable properties",
  },
  {
    id: "professionalFocus",
    title: "Professional Living Expert",
    icon: Briefcase,
    description: "Specializes in properties ideal for working professionals",
  },
];

// ==================== Property Type Data ====================
export const PROPERTY_TYPES = [
  {
    value: "single-family",
    label: "Houses",
    description: "Detached home with private land",
  },
  {
    value: "condo",
    label: "Condos",
    description: "Unit in a multi-unit building",
  },
  {
    value: "townhouse",
    label: "Townhomes",
    description: "Multi-level attached home",
  },
  {
    value: "multi-family",
    label: "Multi Family",
    description: "Property with multiple units",
  },
  {
    value: "cooperative",
    label: "Cooperatives/TIC",
    description: "Share ownership in a building or complex",
  },
  {
    value: "mobile",
    label: "Mobile",
    description: "Manufactured or mobile homes",
  },
  {
    value: "land",
    label: "Land/Lot",
    description: "Undeveloped land for building",
  },
  {
    value: "misc",
    label: "Other",
    description: "Other property types",
  },
];

export const SQUARE_FEET_RANGES = [
  "Any",
  "Under 1,000 sqft",
  "1,000-1,500 sqft",
  "1,500-2,000 sqft",
  "2,000-2,500 sqft",
  "2,500-3,000 sqft",
  "3,000-4,000 sqft",
  "4,000+ sqft",
];

export const BEDROOM_OPTIONS = ["Any", "1+", "2+", "3+", "4+", "5+"];
export const BATHROOM_OPTIONS = [
  "Any",
  "1+",
  "1.5+",
  "2+",
  "2.5+",
  "3+",
  "3.5+",
  "4+",
];

export const PRICE_RANGES = [
  { min: 0, max: 200000 },
  { min: 200000, max: 400000 },
  { min: 400000, max: 600000 },
  { min: 600000, max: 800000 },
  { min: 800000, max: 1000000 },
  { min: 1000000, max: 1500000 },
  { min: 1500000, max: 2000000 },
  { min: 2000000, max: 3000000 },
  { min: 3000000, max: 5000000 },
  { min: 5000000, max: 10000000 },
];

export const HOA_FEE_OPTIONS = [
  { value: "0", label: "No HOA fees" },
  { value: "100", label: "Less than $100" },
  { value: "200", label: "Less than $200" },
  { value: "300", label: "Less than $300" },
  { value: "400", label: "Less than $400" },
  { value: "500", label: "Less than $500" },
  { value: "750", label: "Less than $750" },
  { value: "1000", label: "Less than $1,000" },
];

export const HOME_FEATURES = [
  {
    value: "primary_suite",
    label: "Primary Suite",
    description: "Large bedroom with private bath",
  },
  {
    value: "open_floor_plan",
    label: "Open Floor Plan",
    description: "Connected living spaces",
  },
  {
    value: "high_ceilings",
    label: "High Ceilings",
    description: "Tall ceilings throughout",
  },
  {
    value: "modern_kitchen",
    label: "Modern Kitchen",
    description: "Updated appliances and finishes",
  },
  {
    value: "home_office",
    label: "Home Office",
    description: "Dedicated work space",
  },
  {
    value: "natural_light",
    label: "Natural Light",
    description: "Lots of windows and brightness",
  },
  {
    value: "storage",
    label: "Storage Space",
    description: "Ample storage solutions",
  },
  {
    value: "laundry",
    label: "In-Unit Laundry",
    description: "Washer and dryer hookups",
  },
  {
    value: "backyard",
    label: "Backyard",
    description: "Private outdoor space",
  },
  {
    value: "garage",
    label: "Garage",
    description: "Covered parking",
  },
  {
    value: "pool",
    label: "Pool",
    description: "Swimming pool",
  },
  {
    value: "fireplace",
    label: "Fireplace",
    description: "Indoor fireplace",
  },
];

// ==================== Location & Neighborhood Data ====================
export const CATEGORIES = [
  { id: "popular", label: "Popular" },
  { id: "nature", label: "Nature" },
  { id: "amenities", label: "Amenities" },
  { id: "construction", label: "Construction" },
  { id: "location", label: "Location" },
];

export const CATEGORY_ICONS = {
  popular: Sparkles,
  nature: Compass,
  amenities: Building,
  construction: Home,
  location: MapPin,
};

export const LOCATION_CATEGORIES = [
  {
    category: "popular",
    checkboxes: [
      {
        label: "Flyhomes's Choice",
        value: "FLYHOMES_CHOICE",
        id: "FLYHOMES_CHOICE",
        description: "Our special picks.",
        icon: Leaf,
      },
      {
        label: "Quiet",
        value: "QUIET",
        id: "QUIET",
        description: "In a quiet area.",
        icon: Leaf,
      },
      {
        label: "Highly walkable",
        value: "WALKER_PARADISE",
        id: "WALKER_PARADISE",
        description: "Areas where you can get around on foot.",
        icon: PersonWalking,
      },
      {
        label: "Big backyards",
        value: "BIG_YARD",
        id: "BIG_YARD",
        description: "Spaces for gathering and gardening.",
        icon: Tree,
      },
    ],
  },
  {
    category: "nature",
    checkboxes: [
      {
        label: "Near greenery",
        value: "NEAR_GREENERY",
        id: "NEAR_GREENERY",
        description: "Parks, open spaces, and greenery nearby.",
        icon: Tree,
      },
      {
        label: "Vivid views",
        value: "BEAUTIFUL_VIEWS",
        id: "BEAUTIFUL_VIEWS",
        description: "Beautiful scenery and surroundings.",
        icon: Mountain,
      },
      {
        label: "Next to park",
        value: "NEXT_TO_PARK",
        id: "NEXT_TO_PARK",
        description: "Close to the park.",
        icon: Flower,
      },
      {
        label: "Nearby parks & playground",
        value: "NEARBY_PARKS_PLAYGROUNDS",
        id: "NEARBY_PARKS_PLAYGROUNDS",
        description: "Parks and playgrounds nearby.",
        icon: Tree,
      },
    ],
  },
  {
    category: "amenities",
    checkboxes: [
      {
        label: "EV-friendly homes",
        value: "EV_CHARGING",
        id: "EV_CHARGING",
        description: "Easy access to car charging points.",
        icon: Wifi,
      },
      {
        label: "Eat-in kitchens",
        value: "EAT_IN_KITCHEN",
        id: "EAT_IN_KITCHEN",
        description: "Kitchens with built-in dining areas.",
        icon: Utensils,
      },
      {
        label: "Walk-in closets",
        value: "LARGE_WALK_IN_CLOSETS",
        id: "LARGE_WALK_IN_CLOSETS",
        description: "Homes with large, walk-in closets.",
        icon: Home,
      },
      {
        label: "Pet-friendly",
        value: "DOG_FRIENDLY",
        id: "DOG_FRIENDLY",
        description: "Outdoor space for your pets to roam.",
        icon: DogIcon,
      },
      {
        label: "Bonus room",
        value: "BONUS_ROOM",
        id: "BONUS_ROOM",
        description: "Homes with an extra, convertible room.",
        icon: Home,
      },
      {
        label: "Fireplaces",
        value: "FIREPLACE",
        id: "FIREPLACE",
        description: "Homes with electric, gas, or wood-burning fireplaces.",
        icon: Fire,
      },
    ],
  },
  {
    category: "location",
    checkboxes: [
      {
        label: "In-law unit",
        value: "IN_LAW_UNIT",
        id: "IN_LAW_UNIT",
        description: "Homes with an additional living space.",
        icon: Home,
      },
      {
        label: "Convenient transit",
        value: "CONVENIENT_PUBLIC_TRANSPORTATION",
        id: "CONVENIENT_PUBLIC_TRANSPORTATION",
        description: "Public transit within walking distance.",
        icon: Train,
      },
      {
        label: "Bike-friendly homes",
        value: "BIKE_FRIENDLY",
        id: "BIKE_FRIENDLY",
        description: "Areas with high bikescores.",
        icon: Compass,
      },
      {
        label: "Nearby coffee shops",
        value: "NEARBY_COFFEE_SHOPS",
        id: "NEARBY_COFFEE_SHOPS",
        description: "Coffee shops nearby.",
        icon: Coffee,
      },
      {
        label: "Great schools",
        value: "GREAT_SCHOOLS",
        id: "GREAT_SCHOOLS",
        description: "Served by well-rated schools.",
        icon: GraduationCap,
      },
      {
        label: "Family friendly",
        value: "FAMILY_FRIENDLY",
        id: "FAMILY_FRIENDLY",
        description: "Family friendly neighborhood.",
        icon: Users,
      },
    ],
  },
];

// ==================== Place Categories ====================
export const PLACE_CATEGORIES = [
  "cafes",
  "restaurants",
  "shopping",
  "parks",
  "fitness",
  "culture",
  "schools",
  "groceries",
  "nightlife",
  "transit",
];

// ==================== Sample Neighborhood Data ====================
export const SAMPLE_NEIGHBORHOODS = [
  {
    name: "Pacific Heights",
    description:
      "A prestigious residential enclave with stunning views of the Golden Gate Bridge and the Bay. Known for elegant Victorian homes and upscale shopping on Fillmore Street.",
    matchScore: 95,
    averagePrice: 1850000,
    transitScore: 87,
    walkScore: 95,
    keyFeatures: [
      "Luxury Living",
      "Historic Architecture",
      "Scenic Views",
      "Upscale Shopping",
    ],
    lat: 37.7925,
    lng: -122.4382,
    funFacts: [
      "Home to the 'Gold Coast', a section of ultra-exclusive mansions",
      "Features stunning views of the Golden Gate Bridge",
      "Contains Lafayette and Alta Plaza Parks",
    ],
  },
  {
    name: "Mission District",
    description:
      "A vibrant, culturally diverse neighborhood with excellent restaurants, colorful street art, and a lively nightlife scene.",
    matchScore: 88,
    averagePrice: 1250000,
    transitScore: 92,
    walkScore: 97,
    keyFeatures: [
      "Cultural Hub",
      "Great Food Scene",
      "Street Art",
      "Nightlife",
    ],
    lat: 37.7599,
    lng: -122.4148,
    funFacts: [
      "Known for its historic Latino culture and community",
      "Features famous murals in Balmy Alley and Clarion Alley",
      "Home to Mission Dolores, the oldest surviving structure in San Francisco",
    ],
  },
  {
    name: "Marina District",
    description:
      "A scenic waterfront neighborhood with stunning views, beautiful parks, and trendy shops and restaurants along Chestnut Street.",
    matchScore: 85,
    averagePrice: 1680000,
    transitScore: 83,
    walkScore: 96,
    keyFeatures: [
      "Waterfront Views",
      "Active Lifestyle",
      "Upscale Dining",
      "Marina Green",
    ],
    lat: 37.8037,
    lng: -122.4368,
    funFacts: [
      "Built largely on landfill for the 1915 Panama-Pacific Exposition",
      "Features the historic Palace of Fine Arts",
      "Offers easy access to Crissy Field and the Presidio",
    ],
  },
  {
    name: "Noe Valley",
    description:
      "A sunny, family-friendly neighborhood with charming Victorian homes, boutique shopping, and a small-town feel in the city.",
    matchScore: 82,
    averagePrice: 1950000,
    transitScore: 79,
    walkScore: 93,
    keyFeatures: [
      "Family-Friendly",
      "Sunny Microclimate",
      "Quaint Shopping",
      "Victorian Homes",
    ],
    lat: 37.7502,
    lng: -122.4343,
    funFacts: [
      "Known as 'Stroller Valley' due to its popularity with young families",
      "Enjoys one of the sunniest microclimates in San Francisco",
      "Home to the popular Saturday farmers market",
    ],
  },
  {
    name: "SoMa (South of Market)",
    description:
      "A dynamic, urban neighborhood with tech startups, converted warehouses, modern lofts, museums, and a growing food scene.",
    matchScore: 78,
    averagePrice: 1150000,
    transitScore: 98,
    walkScore: 90,
    keyFeatures: ["Tech Hub", "Urban Living", "Cultural Venues", "Nightlife"],
    lat: 37.7785,
    lng: -122.396,
    funFacts: [
      "Home to major cultural institutions including SFMOMA and Yerba Buena Center for the Arts",
      "Transformed from an industrial area to a tech and arts hub",
      "Contains Oracle Park, home of the San Francisco Giants",
    ],
  },
];

// ==================== Interesting Places Data ====================
export const PLACES_OF_INTEREST = [
  {
    name: "Golden Gate Park",
    category: "parks",
    description:
      "A large urban park with museums, gardens, and outdoor activities",
    lat: 37.7694,
    lng: -122.4862,
    city: "San Francisco",
  },
  {
    name: "Ferry Building Marketplace",
    category: "shopping",
    description:
      "Historic ferry terminal with gourmet food shops and restaurants",
    lat: 37.7955,
    lng: -122.3937,
    city: "San Francisco",
  },
  {
    name: "Dolores Park",
    category: "parks",
    description: "Popular park with city views, playground, and tennis courts",
    lat: 37.7596,
    lng: -122.4269,
    city: "San Francisco",
  },
  {
    name: "Bi-Rite Creamery",
    category: "cafes",
    description:
      "Famous ice cream shop with organic, locally-sourced ingredients",
    lat: 37.7617,
    lng: -122.4256,
    city: "San Francisco",
  },
  {
    name: "Tartine Bakery",
    category: "cafes",
    description: "Renowned bakery known for breads and pastries",
    lat: 37.7614,
    lng: -122.4241,
    city: "San Francisco",
  },
  {
    name: "The Castro Theatre",
    category: "culture",
    description: "Historic movie palace from 1922 known for special screenings",
    lat: 37.7609,
    lng: -122.435,
    city: "San Francisco",
  },
  {
    name: "Central Park",
    category: "parks",
    description: "Iconic urban park with many attractions and activities",
    lat: 40.7829,
    lng: -73.9654,
    city: "New York",
  },
  {
    name: "SoHo Shopping District",
    category: "shopping",
    description:
      "Trendy neighborhood with designer boutiques and art galleries",
    lat: 40.7248,
    lng: -74.0018,
    city: "New York",
  },
  {
    name: "South Beach",
    category: "parks",
    description: "Famous beach known for its white sand and vibrant atmosphere",
    lat: 25.7826,
    lng: -80.1341,
    city: "Miami",
  },
  {
    name: "Wynwood Walls",
    category: "culture",
    description: "Outdoor street art museum with colorful murals",
    lat: 25.8013,
    lng: -80.1996,
    city: "Miami",
  },
];

// ==================== AI Insights Data ====================
export const SAMPLE_INSIGHTS = [
  {
    text: "Based on your saved homes, you seem to prefer Victorian-style architecture",
    category: "preferences",
    userFeedback: null, // can be 'agree', 'disagree', or null
  },
  {
    text: "You've shown interest in properties near dining and coffee options",
    category: "lifestyle",
    userFeedback: null,
  },
  {
    text: "Your ideal neighborhood appears to be walkable with good transit options",
    category: "location",
    userFeedback: null,
  },
  {
    text: "You're consistently looking at homes with outdoor space",
    category: "features",
    userFeedback: null,
  },
  {
    text: "Based on your preferences, you might also like the Marina District",
    category: "recommendation",
    userFeedback: null,
  },
  {
    text: "Your budget seems to be compatible with properties in Pacific Heights",
    category: "budget",
    userFeedback: null,
  },
  {
    text: "Your commute preferences suggest you value being close to downtown",
    category: "commute",
    userFeedback: null,
  },
  {
    text: "You seem interested in homes with modern kitchen renovations",
    category: "features",
    userFeedback: null,
  },
];

// ==================== Helper Functions ====================
export const helpers = {
  // Get property type icon
  getPropertyTypeIcon: (value) => {
    switch (value) {
      case "single-family":
        return <Home className="w-6 h-6 text-blue-600 shrink-0" />;
      case "condo":
        return <Building className="w-6 h-6 text-blue-600 shrink-0" />;
      case "townhouse":
        return <Building className="w-6 h-6 text-blue-600 shrink-0" />;
      case "multi-family":
        return <Building className="w-6 h-6 text-blue-600 shrink-0" />;
      default:
        return <Home className="w-6 h-6 text-blue-600 shrink-0" />;
    }
  },

  // Format price
  formatPrice: (price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  },

  // Calculate monthly mortgage payment
  calculateMonthlyPayment: (
    price,
    downPaymentPercent = 20,
    interestRate = 5.5,
    loanTermYears = 30,
  ) => {
    const downPayment = price * (downPaymentPercent / 100);
    const loanAmount = price - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;

    const monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    return monthlyPayment;
  },

  // Get category icon
  getCategoryIcon: (id) => {
    const Icon = CATEGORY_ICONS[id];
    return Icon ? <Icon className="w-4 h-4" /> : null;
  },

  // Filter places by city
  getPlacesByCity: (cityId) => {
    const cityName = CITIES.find((c) => c.id === cityId)?.name || "";
    return PLACES_OF_INTEREST.filter((place) => place.city === cityName);
  },

  // Get profile completion percentage
  getProfileCompletionPercentage: (profile) => {
    let score = 0;
    const totalFactors = 5;

    if (profile.propertyType) score += 1;
    if (profile.priceRange) score += 1;
    if (profile.beds) score += 1;
    if (profile.baths) score += 1;
    if (profile.homeFeatures && profile.homeFeatures.length > 0) score += 1;

    return Math.round((score / totalFactors) * 100);
  },

  // Update AI insight feedback
  updateInsightFeedback: (insights, index, feedback) => {
    return insights.map((insight, i) => {
      if (i === index) {
        return { ...insight, userFeedback: feedback };
      }
      return insight;
    });
  },

  // Generate new AI insights based on user profile
  generateNewInsights: (profile) => {
    // In a real app, this would call an API or use ML
    // For this demo, we'll return random insights from our sample set
    const shuffled = [...SAMPLE_INSIGHTS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  },
};

// Default export with everything
export default {
  cities: CITIES,
  expertiseTypes: EXPERTISE_TYPES,
  propertyTypes: PROPERTY_TYPES,
  squareFeetRanges: SQUARE_FEET_RANGES,
  bedroomOptions: BEDROOM_OPTIONS,
  bathroomOptions: BATHROOM_OPTIONS,
  homeFeatures: HOME_FEATURES,
  categories: CATEGORIES,
  priceRanges: PRICE_RANGES,
  hoaFeeOptions: HOA_FEE_OPTIONS,
  categoryIcons: CATEGORY_ICONS,
  locationCategories: LOCATION_CATEGORIES,
  placeCategories: PLACE_CATEGORIES,
  sampleNeighborhoods: SAMPLE_NEIGHBORHOODS,
  placesOfInterest: PLACES_OF_INTEREST,
  sampleInsights: SAMPLE_INSIGHTS,
  helpers,
};
