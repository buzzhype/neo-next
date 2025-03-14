import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  X,
  Check,
  Save,
  Home,
  Users,
  Sparkles,
  DollarSign,
  ArrowDown,
  Umbrella,
  Leaf,
  Briefcase,
} from "lucide-react";

// Constants needed for the component
const CITY_NAMES = {
  sf: "San Francisco",
  nyc: "New York City",
  la: "Los Angeles",
  chi: "Chicago",
  mia: "Miami",
  sea: "Seattle",
  bos: "Boston",
  den: "Denver",
};

// Property types for dropdown
const PROPERTY_TYPES = [
  { value: "condo", label: "Condo" },
  { value: "house", label: "House" },
  { value: "townhouse", label: "Townhouse" },
  { value: "apartment", label: "Apartment" },
  { value: "multi-family", label: "Multi-Family" },
];

// Beds options
const BEDS_OPTIONS = [
  { value: "1+", label: "1+ Bed" },
  { value: "2+", label: "2+ Beds" },
  { value: "3+", label: "3+ Beds" },
  { value: "4+", label: "4+ Beds" },
];

// Budget ranges
const BUDGET_RANGES = [
  { value: 500000, label: "$500,000" },
  { value: 750000, label: "$750,000" },
  { value: 850000, label: "$850,000" },
  { value: 1000000, label: "$1,000,000" },
  { value: 1500000, label: "$1,500,000" },
  { value: 2000000, label: "$2,000,000" },
  { value: 3000000, label: "$3,000,000" },
];

// Home features
const HOME_FEATURES = [
  { value: "parking", label: "Parking" },
  { value: "outdoor", label: "Outdoor Space" },
  { value: "updated", label: "Updated/Renovated" },
  { value: "view", label: "Great Views" },
  { value: "hardwood", label: "Hardwood Floors" },
  { value: "central-ac", label: "Central AC" },
  { value: "fireplace", label: "Fireplace" },
  { value: "pool", label: "Pool" },
  { value: "garage", label: "Garage" },
];

// Define all available specializations
const SPECIALIZATIONS = [
  {
    id: "firstTimeBuyer",
    name: "First-Time Buyer Guide",
    description: "Expert in guiding first-time homebuyers through the process",
    icon: Home,
    color: "bg-gradient-to-r from-blue-600 to-blue-500",
  },
  {
    id: "familyFocused",
    name: "Family-Focused Specialist",
    description: "Focuses on family-friendly properties and communities",
    icon: Users,
    color: "bg-gradient-to-r from-teal-600 to-teal-500",
  },
  {
    id: "luxuryMarket",
    name: "Luxury Market Expert",
    description: "Specialized in high-end properties and exclusive areas",
    icon: Sparkles,
    color: "bg-gradient-to-r from-amber-600 to-amber-500",
  },
  {
    id: "investmentAnalyst",
    name: "Investment Analyst",
    description: "Focuses on ROI and investment opportunities",
    icon: DollarSign,
    color: "bg-gradient-to-r from-green-600 to-green-500",
  },
  {
    id: "downsizingSpecialist",
    name: "Downsizing Specialist",
    description: "Expert in retirement and downsizing options",
    icon: ArrowDown,
    color: "bg-gradient-to-r from-indigo-600 to-indigo-500",
  },
  {
    id: "vacationProperty",
    name: "Vacation Property Advisor",
    description: "Specialized in vacation homes and rental properties",
    icon: Umbrella,
    color: "bg-gradient-to-r from-red-600 to-red-500",
  },
  {
    id: "sustainabilityExpert",
    name: "Sustainability Expert",
    description: "Focused on eco-friendly and sustainable properties",
    icon: Leaf,
    color: "bg-gradient-to-r from-emerald-600 to-emerald-500",
  },
  {
    id: "professionalLiving",
    name: "Professional Living Expert",
    description: "Specializes in properties ideal for working professionals",
    icon: Briefcase,
    color: "bg-gradient-to-r from-purple-600 to-purple-500",
  },
];

/**
 * UserProfile interface to explicitly type user profile objects.
 */
interface UserProfile {
  name: string;
  experience: string;
  purpose: string;
  budget: number;
  city: keyof typeof CITY_NAMES;
  propertyType: "condo" | "house" | "townhouse" | "apartment" | "multi-family";
  beds: string;
  baths: string;
  squareFeet: string;
  homeFeatures: string[];
  specializations: string[]; // Multiple specializations
  customTags: string[];
  favoritePlaces: any[];
  savedHomes: any[];
}

interface PreferenceEditModalProps {
  isOpen: boolean;
  userProfile: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
  onCancel: () => void;
}

const PreferenceEditModal: React.FC<PreferenceEditModalProps> = ({
  isOpen,
  userProfile,
  onSave,
  onCancel,
}) => {
  const [tempUserProfile, setTempUserProfile] = useState<UserProfile>({
    ...userProfile,
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isDirty, setIsDirty] = useState(false);

  // Reset form when user profile changes or modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setTempUserProfile({ ...userProfile });
      setValidationErrors({});
      setIsDirty(false);
    }
  }, [isOpen, userProfile]);

  const handleProfileChange = (field: string, value: any) => {
    setTempUserProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsDirty(true);

    // Clear validation error for this field if it exists
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const toggleFeature = (feature: string) => {
    setTempUserProfile((prev) => {
      const currentFeatures = [...(prev.homeFeatures || [])];
      if (currentFeatures.includes(feature)) {
        return {
          ...prev,
          homeFeatures: currentFeatures.filter((f) => f !== feature),
        };
      } else {
        return {
          ...prev,
          homeFeatures: [...currentFeatures, feature],
        };
      }
    });
    setIsDirty(true);
  };

  const toggleSpecialization = (specializationId: string) => {
    setTempUserProfile((prev) => {
      const currentSpecializations = [...(prev.specializations || [])];
      if (currentSpecializations.includes(specializationId)) {
        // Don't remove if it's the last specialization
        if (currentSpecializations.length <= 1) {
          return prev;
        }
        return {
          ...prev,
          specializations: currentSpecializations.filter(
            (id) => id !== specializationId,
          ),
        };
      } else {
        return {
          ...prev,
          specializations: [...currentSpecializations, specializationId],
        };
      }
    });
    setIsDirty(true);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate required fields
    if (!tempUserProfile.propertyType) {
      errors.propertyType = "Property type is required";
    }

    if (!tempUserProfile.city) {
      errors.city = "City is required";
    }

    if (!tempUserProfile.budget || tempUserProfile.budget <= 0) {
      errors.budget = "A valid budget is required";
    }

    if (!tempUserProfile.beds) {
      errors.beds = "Bedroom preference is required";
    }

    if (tempUserProfile.specializations.length === 0) {
      errors.specializations = "At least one specialization is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(tempUserProfile);
    }
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Edit Search Preferences
          </h3>
          <button
            onClick={onCancel}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Specializations selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Real Estate Specialists
            </label>
            {validationErrors.specializations && (
              <p className="text-red-500 text-xs mt-1 mb-2">
                {validationErrors.specializations}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {SPECIALIZATIONS.map((spec) => (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => toggleSpecialization(spec.id)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors flex items-center gap-1.5 ${
                    (tempUserProfile.specializations || []).includes(spec.id)
                      ? `${spec.color.replace("gradient-to-r", "gradient-to-br")} text-white`
                      : "bg-gray-100 text-gray-700 border-gray-200 border"
                  }`}
                >
                  {React.createElement(spec.icon, {
                    className: "w-3.5 h-3.5",
                  })}
                  <span>{spec.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
                {validationErrors.propertyType && (
                  <span className="text-red-500 text-xs ml-2">
                    {validationErrors.propertyType}
                  </span>
                )}
              </label>
              <select
                value={tempUserProfile.propertyType || ""}
                onChange={(e) =>
                  handleProfileChange("propertyType", e.target.value)
                }
                className={`w-full rounded-lg border ${
                  validationErrors.propertyType
                    ? "border-red-500"
                    : "border-gray-300"
                } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              >
                <option value="" disabled>
                  Select property type
                </option>
                {PROPERTY_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms
                {validationErrors.beds && (
                  <span className="text-red-500 text-xs ml-2">
                    {validationErrors.beds}
                  </span>
                )}
              </label>
              <select
                value={tempUserProfile.beds || ""}
                onChange={(e) => handleProfileChange("beds", e.target.value)}
                className={`w-full rounded-lg border ${
                  validationErrors.beds ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              >
                <option value="" disabled>
                  Select bedrooms
                </option>
                {BEDS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget
                {validationErrors.budget && (
                  <span className="text-red-500 text-xs ml-2">
                    {validationErrors.budget}
                  </span>
                )}
              </label>
              <select
                value={tempUserProfile.budget || ""}
                onChange={(e) =>
                  handleProfileChange("budget", parseInt(e.target.value))
                }
                className={`w-full rounded-lg border ${
                  validationErrors.budget ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              >
                <option value="" disabled>
                  Select budget
                </option>
                {BUDGET_RANGES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
                {validationErrors.city && (
                  <span className="text-red-500 text-xs ml-2">
                    {validationErrors.city}
                  </span>
                )}
              </label>
              <select
                value={tempUserProfile.city || ""}
                onChange={(e) => handleProfileChange("city", e.target.value)}
                className={`w-full rounded-lg border ${
                  validationErrors.city ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              >
                <option value="" disabled>
                  Select city
                </option>
                {Object.entries(CITY_NAMES).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional features section */}
          <div className="pt-3 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bathrooms
            </label>
            <select
              value={tempUserProfile.baths || ""}
              onChange={(e) => handleProfileChange("baths", e.target.value)}
              className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-4"
            >
              <option value="" disabled>
                Select bathrooms
              </option>
              <option value="1+">1+ Bathroom</option>
              <option value="2+">2+ Bathrooms</option>
              <option value="3+">3+ Bathrooms</option>
            </select>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Square Footage
            </label>
            <select
              value={tempUserProfile.squareFeet || ""}
              onChange={(e) =>
                handleProfileChange("squareFeet", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select square footage
              </option>
              <option value="500-750 sq ft">500-750 sq ft</option>
              <option value="750-1000 sq ft">750-1000 sq ft</option>
              <option value="1000-1500 sq ft">1000-1500 sq ft</option>
              <option value="1500-2000 sq ft">1500-2000 sq ft</option>
              <option value="2000+ sq ft">2000+ sq ft</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Must-Have Features
            </label>
            <div className="flex flex-wrap gap-2">
              {HOME_FEATURES.map((feature) => (
                <button
                  key={feature.value}
                  type="button"
                  onClick={() => toggleFeature(feature.value)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    (tempUserProfile.homeFeatures || []).includes(feature.value)
                      ? "bg-blue-100 text-blue-700 border-blue-200 border"
                      : "bg-gray-100 text-gray-700 border-gray-200 border"
                  }`}
                >
                  {(tempUserProfile.homeFeatures || []).includes(
                    feature.value,
                  ) && <Check className="w-3 h-3 inline-block mr-1" />}
                  {feature.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-gray-200 flex justify-between gap-3">
          <div className="text-sm text-gray-500">
            {isDirty && "You have unsaved changes"}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!isDirty}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                isDirty
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PreferenceEditModal;
