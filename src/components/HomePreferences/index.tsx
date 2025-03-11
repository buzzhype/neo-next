import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Home,
  Building,
  Building2,
  Binary,
  BedDouble,
  Bath,
  Maximize,
  Sparkles,
  Check,
} from "lucide-react";
import OnboardingContainer from "@/components/OnboardingContainer";
import { cn } from "@/lib/utils";

interface HomePreferencesProps {
  userProfile: any;
  onComplete: (data: HomePreferencesData) => void;
  onBack: () => void;
}

interface HomePreferencesData {
  propertyType: string;
  beds: string;
  baths: string;
  squareFeet: string;
  features: string[];
}

// Instead of passing icon as a prop, we'll render specific icons based on value
const getPropertyTypeIcon = (value: string) => {
  switch (value) {
    case "singleFamily":
      return <Home className="w-6 h-6 text-blue-600 shrink-0" />;
    case "condo":
      return <Building className="w-6 h-6 text-blue-600 shrink-0" />;
    case "townhouse":
      return <Building2 className="w-6 h-6 text-blue-600 shrink-0" />;
    case "multiFamily":
      return <Binary className="w-6 h-6 text-blue-600 shrink-0" />;
    default:
      return <Home className="w-6 h-6 text-blue-600 shrink-0" />;
  }
};

const PROPERTY_TYPES = [
  {
    value: "single-family",
    label: "Single Family",
    description: "Detached home with private land",
  },
  {
    value: "condo",
    label: "Condo",
    description: "Unit in a multi-unit building",
  },
  {
    value: "townhouse",
    label: "Townhouse",
    description: "Multi-level attached home",
  },
  {
    value: "multi-family",
    label: "Multi-Family",
    description: "Property with multiple units",
  },
];

const SQUARE_FEET_RANGES = [
  "Under 1,000",
  "1,000-1,500",
  "1,500-2,000",
  "2,000-2,500",
  "2,500+",
];

const HOME_FEATURES = [
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
];

export default function HomePreferences({
  userProfile,
  onComplete,
  onBack,
}: HomePreferencesProps) {
  const [propertyType, setPropertyType] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [features, setFeatures] = useState<string[]>([]);

  const toggleFeature = (value: string) => {
    setFeatures((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const handleNext = () => {
    if (propertyType) {
      onComplete({
        propertyType,
        beds,
        baths,
        squareFeet,
        features,
      });
    }
  };

  return (
    <OnboardingContainer
      title="Home Preferences"
      subtitle="Tell us about your ideal home structure"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Property Type */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Home className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Property Type
              </h2>
              <p className="text-sm text-gray-600">
                Select the type of property you're looking for
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROPERTY_TYPES.map((type) => (
              <motion.div
                key={type.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPropertyType(type.value)}
                className={cn(
                  "cursor-pointer p-4 rounded-xl border-2 transition-all duration-200",
                  propertyType === type.value
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300",
                )}
              >
                <div className="flex gap-4">
                  {getPropertyTypeIcon(type.value)}
                  <div>
                    <div className="font-medium text-gray-900">
                      {type.label}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {type.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Size Preferences */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Maximize className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Size Preferences
              </h2>
              <p className="text-sm text-gray-600">
                Optional: Select your preferred home size
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Beds & Baths */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BedDouble className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Bedrooms
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Any", "1+", "2+", "3+", "4+"].map((value) => (
                  <button
                    key={value}
                    onClick={() => setBeds(value)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      beds === value
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                    )}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Bath className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Bathrooms
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Any", "1+", "2+", "3+"].map((value) => (
                  <button
                    key={value}
                    onClick={() => setBaths(value)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      baths === value
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                    )}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Square Footage */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Square Footage
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Any", ...SQUARE_FEET_RANGES].map((value) => (
                <button
                  key={value}
                  onClick={() => setSquareFeet(value)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    squareFeet === value
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Home Features */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Home Features
              </h2>
              <p className="text-sm text-gray-600">
                Optional: Select desired home features
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HOME_FEATURES.map((feature) => (
              <motion.div
                key={feature.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleFeature(feature.value)}
                className={cn(
                  "p-4 rounded-xl border-2 cursor-pointer transition-all",
                  features.includes(feature.value)
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-gray-900">
                      {feature.label}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {feature.description}
                    </div>
                  </div>
                  {features.includes(feature.value) && (
                    <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t">
          <button
            onClick={onBack}
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </button>
          <button
            onClick={handleNext}
            disabled={!propertyType}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </OnboardingContainer>
  );
}
