import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Wallet,
  Sparkles,
  MapPin,
  Home,
  Compass,
  Building,
  Check,
} from "lucide-react";
import OnboardingContainer from "@/components/OnboardingContainer";
import { cn } from "@/lib/utils";

// Categories with their IDs
const CATEGORIES = [
  { id: "popular", label: "Popular" },
  { id: "nature", label: "Nature" },
  { id: "amenities", label: "Amenities" },
  { id: "construction", label: "Construction" },
  { id: "location", label: "Location" },
];

// Function to get icon based on category
const getCategoryIcon = (id: string) => {
  switch (id) {
    case "popular":
      return <Sparkles className="w-4 h-4" />;
    case "nature":
      return <Compass className="w-4 h-4" />;
    case "amenities":
      return <Building className="w-4 h-4" />;
    case "construction":
      return <Home className="w-4 h-4" />;
    case "location":
      return <MapPin className="w-4 h-4" />;
    default:
      return <Home className="w-4 h-4" />;
  }
};

// Price Range options
const PRICE_RANGES = [
  { min: 200000, max: 400000 },
  { min: 400000, max: 600000 },
  { min: 600000, max: 800000 },
  { min: 800000, max: 1000000 },
  { min: 1000000, max: 1500000 },
  { min: 1500000, max: 2000000 },
  { min: 2000000, max: 5000000 },
];

const LOCATION_CATEGORIES = [
  {
    category: "popular",
    checkboxes: [
      {
        label: "Flyhomes's Choice",
        value: "FLYHOMES_CHOICE",
        id: "FLYHOMES_CHOICE",
        description: "Our special picks.",
      },
      {
        label: "Quiet",
        value: "QUIET",
        id: "QUIET",
        description: "In a quiet area.",
      },
      {
        label: "Highly walkable",
        value: "WALKER_PARADISE",
        id: "WALKER_PARADISE",
        description: "Areas where you can get around on foot.",
      },
      {
        label: "Big backyards",
        value: "BIG_YARD",
        id: "BIG_YARD",
        description: "Spaces for gathering and gardening.",
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
      },
      {
        label: "Vivid views",
        value: "BEAUTIFUL_VIEWS",
        id: "BEAUTIFUL_VIEWS",
        description: "Beautiful scenery and surroundings.",
      },
      {
        label: "Next to park",
        value: "NEXT_TO_PARK",
        id: "NEXT_TO_PARK",
        description: "Close to the park.",
      },
      {
        label: "Nearby parks & playground",
        value: "NEARBY_PARKS_PLAYGROUNDS",
        id: "NEARBY_PARKS_PLAYGROUNDS",
        description: "Parks and playgrounds nearby.",
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
      },
      {
        label: "Eat-in kitchens",
        value: "EAT_IN_KITCHEN",
        id: "EAT_IN_KITCHEN",
        description: "Kitchens with built-in dining areas.",
      },
      {
        label: "Walk-in closets",
        value: "LARGE_WALK_IN_CLOSETS",
        id: "LARGE_WALK_IN_CLOSETS",
        description: "Homes with large, walk-in closets.",
      },
      {
        label: "Pet-friendly",
        value: "DOG_FRIENDLY",
        id: "DOG_FRIENDLY",
        description: "Outdoor space for your pets to roam.",
      },
      {
        label: "Bonus room",
        value: "BONUS_ROOM",
        id: "BONUS_ROOM",
        description: "Homes with an extra, convertible room.",
      },
      {
        label: "Fireplaces",
        value: "FIREPLACE",
        id: "FIREPLACE",
        description: "Homes with electric, gas, or wood-burning fireplaces.",
      },
      {
        label: "Solar",
        value: "HAS_SOLAR",
        id: "HAS_SOLAR",
        description: "Solar panels installed.",
      },
      {
        label: "Radiant heating",
        value: "RADIANT_HEATING",
        id: "RADIANT_HEATING",
        description: "Radiant heating installed.",
      },
      {
        label: "Pool",
        value: "POOL",
        id: "POOL",
        description: "Homes with a pool.",
      },
    ],
  },
  {
    category: "construction",
    checkboxes: [
      {
        label: "Recently remodeled",
        value: "UPGRADED_HOME",
        id: "UPGRADED_HOME",
        description: "Refreshed, renovated, or remodeled.",
      },
      {
        label: "Soaring ceilings",
        value: "VAULTED_CEILING",
        id: "VAULTED_CEILING",
        description: "High ceilings for big, bright spaces.",
      },
      {
        label: "Upgraded kitchen",
        value: "UPGRADED_KITCHEN",
        id: "UPGRADED_KITCHEN",
        description: "Improvements made to kitchen.",
      },
      {
        label: "Hardwood floors",
        value: "HARDWOOD_FLOORS",
        id: "HARDWOOD_FLOORS",
        description: "Has hardwood flooring.",
      },
      {
        label: "Marble",
        value: "MARBLE",
        id: "MARBLE",
        description: "Homes with marble.",
      },
      {
        label: "Freshly painted",
        value: "FRESHLY_PAINTED",
        id: "FRESHLY_PAINTED",
        description: "Freshly painted.",
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
      },
      {
        label: "Convenient transit",
        value: "CONVENIENT_PUBLIC_TRANSPORTATION",
        id: "CONVENIENT_PUBLIC_TRANSPORTATION",
        description: "Public transit within walking distance.",
      },
      {
        label: "Cul-de-sac",
        value: "CUL_DE_SAC",
        id: "CUL_DE_SAC",
        description: "Homes located in cul-de-sacs.",
      },
      {
        label: "Bike-friendly homes",
        value: "BIKE_FRIENDLY",
        id: "BIKE_FRIENDLY",
        description: "Areas with high bikescores.",
      },
      {
        label: "Nearby coffee shops",
        value: "NEARBY_COFFEE_SHOPS",
        id: "NEARBY_COFFEE_SHOPS",
        description: "Coffee shops nearby.",
      },
      {
        label: "Great schools",
        value: "GREAT_SCHOOLS",
        id: "GREAT_SCHOOLS",
        description: "Served by well-rated schools.",
      },
      {
        label: "Family friendly",
        value: "FAMILY_FRIENDLY",
        id: "FAMILY_FRIENDLY",
        description: "Family friendly neighborhood.",
      },
    ],
  },
];

interface LocationPreferencesProps {
  userProfile: any;
  onComplete: (data: LocationPreferencesData) => void;
  onBack: () => void;
}

interface LocationPreferencesData {
  priceRange: { min: number; max: number };
  selectedFeatures: string[];
}

export default function LocationPreferences({
  userProfile,
  onComplete,
  onBack,
}: LocationPreferencesProps) {
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [priceRange, setPriceRange] = useState(PRICE_RANGES[0]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFeature = (value: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const currentCategoryFeatures =
    LOCATION_CATEGORIES.find((c) => c.category === selectedCategory)
      ?.checkboxes || [];

  return (
    <OnboardingContainer
      title="Location Preferences"
      subtitle="Tell us about your ideal neighborhood"
    >
      {/* Price Range Section */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Wallet className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Price Range</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PRICE_RANGES.map((range) => (
              <motion.button
                key={`${range.min}-${range.max}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPriceRange(range)}
                className={cn(
                  "p-4 rounded-xl border-2 text-left transition-all duration-200",
                  priceRange.min === range.min
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300",
                )}
              >
                <div className="text-sm font-medium text-gray-900">
                  ${range.min.toLocaleString()} - ${range.max.toLocaleString()}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Home className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Features</h2>
          </div>

          {/* Category Tabs - Scrollable on mobile */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-2 px-2 snap-x snap-mandatory">
            {CATEGORIES.map(({ id, label }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all snap-start shrink-0",
                  selectedCategory === id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                )}
              >
                {getCategoryIcon(id)}
                <span className="text-sm font-medium whitespace-nowrap">
                  {label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid gap-4">
            {currentCategoryFeatures.map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer",
                  selectedFeatures.includes(feature.value)
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300",
                )}
                onClick={() => toggleFeature(feature.value)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        {feature.label}
                      </h3>
                      <div
                        className={cn(
                          "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors",
                          selectedFeatures.includes(feature.value)
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-300",
                        )}
                      >
                        {selectedFeatures.includes(feature.value) && (
                          <Check className="w-3 h-3" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t mt-8">
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 sm:px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </button>
        <button
          onClick={() => onComplete({ priceRange, selectedFeatures })}
          className="inline-flex items-center px-4 sm:px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Continue <ChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </OnboardingContainer>
  );
}
