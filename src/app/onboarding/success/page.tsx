"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Brain,
  MapPin,
  Home,
  Building2,
  Star,
  Settings,
  Sparkles,
  ChevronRight,
  DollarSign,
  ArrowRight,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

// IMPORTANT: import the same Neighborhood interface from NeighborhoodSuggestions:
import type { Neighborhood } from "@/components/NeighborhoodSuggestions";
// or wherever the "index.tsx" of NeighborhoodSuggestions is located

/**
 * We are reusing the "Neighborhood" interface from the suggestions step:
 *   interface Neighborhood {
 *     name: string;
 *     description: string;
 *     matchScore: number;
 *     averagePrice: number;
 *     transitScore: number;
 *     walkScore: number;
 *     keyFeatures?: string[];
 *     trivia?: string;
 *     lat?: number;
 *     lng?: number;
 *     funFacts?: string[];
 *   }
 */

// Dynamically import your map component (same as before):
const MapOfNeighborhoods = dynamic(
  () => import("@/components/MapOfNeighborhoods"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-gray-50 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    ),
  },
);

interface UserProfile {
  agentType: {
    city: string;
    expertise: string[];
  };
  locationPreferences: {
    priceRange: {
      min: number;
      max: number;
    };
    selectedFeatures: string[];
  };
  homePreferences: {
    propertyType: string;
    beds: string;
    baths: string;
    squareFeet: string;
  };
  selectedNeighborhoods: Neighborhood[];
}

interface Feature {
  icon: any;
  title: string;
  value: string | number;
  className?: string;
}

const FeatureCard = ({ icon: Icon, title, value, className }: Feature) => (
  <div className={cn("p-4 rounded-xl transition-all duration-200", className)}>
    <div className="flex items-center gap-2 mb-1">
      <Icon className="w-4 h-4 text-blue-600" />
      <p className="text-sm font-medium text-gray-600">{title}</p>
    </div>
    <p className="text-lg font-semibold text-gray-900">{value || "N/A"}</p>
  </div>
);

const StatCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className="font-semibold text-gray-900">{value}</p>
  </div>
);

export default function OnboardingSuccess() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeNeighborhood, setActiveNeighborhood] =
    useState<Neighborhood | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem("agentNeoUserProfile");
    if (stored) {
      const parsed = JSON.parse(stored);

      // Because matchScore is REQUIRED, ensure it is present:
      if (Array.isArray(parsed.selectedNeighborhoods)) {
        parsed.selectedNeighborhoods = parsed.selectedNeighborhoods.map(
          (n: Neighborhood) => ({
            ...n,
            // fallback if matchScore is missing or undefined
            matchScore: typeof n.matchScore === "number" ? n.matchScore : 0,
          }),
        );
      }

      setUserProfile(parsed);

      if (parsed.selectedNeighborhoods?.[0]) {
        setActiveNeighborhood(parsed.selectedNeighborhoods[0]);
      }
    }
  }, []);

  // Show a loader if no profile
  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    );
  }

  // External listings link
  const handleViewListings = (nb: Neighborhood) => {
    // If you have a code to pass in the URL:
    // Or you can build your logic here:
    const url = `https://flyhomes.com/search?marketUrlCode=${encodeURIComponent(
      nb.name,
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-bold">Your Profile is Complete!</h1>
            </div>
            <p className="text-xl text-blue-100">
              We've analyzed your preferences and found your perfect matches.
              Let’s find your dream home in {userProfile.agentType.city}!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8">
        <div className="grid gap-6 grid-cols-12">
          {/* Left Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* AI Assistant Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">AI Assistant</h2>
              </div>

              <div className="space-y-4">
                <FeatureCard
                  icon={MapPin}
                  title="Location"
                  value={userProfile.agentType.city}
                  className="bg-blue-50"
                />

                {userProfile.agentType.expertise.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-3">
                      Expertise
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.agentType.expertise.map((exp) => (
                        <span
                          key={exp}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Home Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <Home className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Home Preferences</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <StatCard
                    label="Bedrooms"
                    value={userProfile.homePreferences.beds}
                  />
                  <StatCard
                    label="Bathrooms"
                    value={userProfile.homePreferences.baths}
                  />
                </div>

                <FeatureCard
                  icon={Building2}
                  title="Property Type"
                  value={userProfile.homePreferences.propertyType}
                  className="bg-gray-50"
                />

                <FeatureCard
                  icon={DollarSign}
                  title="Budget Range"
                  value={`$${userProfile.locationPreferences.priceRange.min.toLocaleString()} - $${userProfile.locationPreferences.priceRange.max.toLocaleString()}`}
                  className="bg-blue-50"
                />

                {userProfile.locationPreferences.selectedFeatures.length >
                  0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">
                      Selected Features
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.locationPreferences.selectedFeatures.map(
                        (feature: string) => (
                          <span
                            key={feature}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                          >
                            {feature}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Neighborhoods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold">
                    Your Matched Neighborhoods
                  </h2>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  {userProfile.selectedNeighborhoods.length} selected
                </span>
              </div>

              {userProfile.selectedNeighborhoods.length > 0 ? (
                <div className="space-y-6">
                  {/* Map */}
                  <MapOfNeighborhoods
                    neighborhoods={userProfile.selectedNeighborhoods}
                    selectedNeighborhood={activeNeighborhood || undefined}
                    onNeighborhoodSelect={setActiveNeighborhood}
                  />

                  {/* Active Neighborhood Details */}
                  {activeNeighborhood && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {activeNeighborhood.name}
                          </h3>
                          {/* Show match score (since it’s required) */}
                          <p className="text-blue-600">
                            Match Score: {activeNeighborhood.matchScore}%
                          </p>
                        </div>
                        <button
                          onClick={() => handleViewListings(activeNeighborhood)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                        >
                          View Listings
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-gray-600 mb-6">
                        {activeNeighborhood.description}
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <StatCard
                          label="Average Price"
                          value={`$${activeNeighborhood.averagePrice.toLocaleString()}`}
                        />
                        <StatCard
                          label="Walk Score"
                          value={`${activeNeighborhood.walkScore}/100`}
                        />
                        <StatCard
                          label="Transit Score"
                          value={`${activeNeighborhood.transitScore}/100`}
                        />
                      </div>

                      {activeNeighborhood.keyFeatures && (
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">
                            Key Features
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {activeNeighborhood.keyFeatures.map((feature) => (
                              <span
                                key={feature}
                                className="px-3 py-1 bg-white text-blue-600 rounded-full text-sm border border-blue-100"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeNeighborhood.funFacts && (
                        <div className="mt-4 space-y-2">
                          <h4 className="font-medium text-gray-900">
                            Fun Facts
                          </h4>
                          <ul className="list-disc list-inside text-gray-700">
                            {activeNeighborhood.funFacts.map((fact, idx) => (
                              <li key={idx}>{fact}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    No neighborhoods selected yet.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 items-center justify-end"
            >
              <button
                onClick={() => router.push("/onboarding")}
                className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium rounded-lg flex items-center gap-2"
              >
                <Settings className="w-5 h-5" />
                Refine Preferences
              </button>
              <button
                onClick={() => router.push("/agentneo")}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                Get Started
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
