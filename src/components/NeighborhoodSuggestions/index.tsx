import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Star,
  MapPin,
  Building2,
  CheckCircle2,
  Info,
} from "lucide-react";
import OnboardingContainer from "@/components/OnboardingContainer";
import { cn } from "@/lib/utils";

// Dynamically import MapView with no SSR
const MapViewNoSSR = dynamic(() => import("@/components/MapView"), {
  ssr: false,
});

export interface Neighborhood {
  name: string;
  description: string;
  matchScore: number;
  averagePrice: number;
  transitScore: number;
  walkScore: number;
  keyFeatures?: string[];
  trivia?: string;
  lat?: number;
  lng?: number;
  funFacts?: string[];
}

export interface NeighborhoodSuggestionsProps {
  userProfile: Record<string, any>;
  onComplete: (selectedNeighborhoods: Neighborhood[]) => void;
  onBack: () => void;
}

export default function NeighborhoodSuggestions({
  userProfile,
  onComplete,
  onBack,
}: NeighborhoodSuggestionsProps) {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>("loading");
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Neighborhood[]>([]);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<
    Neighborhood[]
  >([]);
  const [activeNeighborhood, setActiveNeighborhood] =
    useState<Neighborhood | null>(null);

  useEffect(() => {
    const threadId = userProfile.threadId;
    if (!threadId) {
      setError("Missing threadId from backend processing.");
      setLoading(false);
      return;
    }

    async function pollRecommendations() {
      try {
        let pollAttempts = 0;
        const maxPollAttempts = 20;
        let pollData: any = null;

        while (pollAttempts < maxPollAttempts) {
          const res = await fetch(
            `/api/agent/get-response?threadId=${threadId}`,
          );
          if (!res.ok) {
            throw new Error(`Polling failed: ${res.status}`);
          }
          pollData = await res.json();

          if (
            pollData.status === "completed" &&
            pollData.recommendations?.length > 0
          ) {
            setRecommendations(pollData.recommendations);
            setActiveNeighborhood(pollData.recommendations[0]);
            setStatus("completed");
            break;
          }

          setStatus(pollData.status);
          pollAttempts++;
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch recommendations",
        );
      } finally {
        setLoading(false);
      }
    }

    pollRecommendations();
  }, [userProfile.threadId]);

  const handleToggleNeighborhood = (neighborhood: Neighborhood) => {
    setSelectedNeighborhoods((prev) => {
      const isSelected = prev.some((n) => n.name === neighborhood.name);
      return isSelected
        ? prev.filter((n) => n.name !== neighborhood.name)
        : [...prev, neighborhood];
    });
    setActiveNeighborhood(neighborhood);
  };

  if (loading) {
    return (
      <OnboardingContainer
        title="Finding Your Perfect Neighborhoods"
        subtitle="Analyzing preferences..."
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"
        />
        <p className="mt-4 text-center text-gray-600">
          {status !== "completed"
            ? "Analyzing neighborhoods..."
            : "Loading results..."}
        </p>
      </OnboardingContainer>
    );
  }

  if (error || recommendations.length === 0) {
    return (
      <OnboardingContainer title="Neighborhood Suggestions">
        <div className="bg-red-50 p-4 rounded-lg text-red-600">
          <p>
            {error ||
              "No recommendations available. Please adjust your preferences."}
          </p>
        </div>
      </OnboardingContainer>
    );
  }

  return (
    <OnboardingContainer
      title="Your Recommended Neighborhoods"
      subtitle={
        <span className="flex items-center gap-2">
          <Info className="w-4 h-4" />
          <span>Click on neighborhoods to select multiple options</span>
        </span>
      }
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Neighborhood List */}
        <div className="lg:w-1/2 space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {recommendations.map((neighborhood, i) => {
              const isSelected = selectedNeighborhoods.some(
                (n) => n.name === neighborhood.name,
              );
              const isActive = activeNeighborhood?.name === neighborhood.name;

              return (
                <motion.div
                  key={neighborhood.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleToggleNeighborhood(neighborhood)}
                  className={cn(
                    "relative p-4 rounded-xl border-2 cursor-pointer transition-all",
                    "hover:shadow-md hover:border-blue-300",
                    isSelected && "border-blue-600 bg-blue-50",
                    isActive && !isSelected && "border-gray-400",
                    !isActive && !isSelected && "border-gray-200",
                  )}
                >
                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 bg-blue-600 rounded-full p-1">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">
                          {neighborhood.name}
                        </h3>
                        <div className="flex items-center text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          <Star className="w-3 h-3" />
                          <span className="text-xs ml-1">
                            {neighborhood.matchScore}%
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {neighborhood.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-bold text-blue-600">
                        ${neighborhood.averagePrice.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="flex gap-4 mt-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Walk: {neighborhood.walkScore}
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      Transit: {neighborhood.transitScore}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Map & Details */}
        <div className="lg:w-1/2">
          {activeNeighborhood && (
            <div className="space-y-4">
              {/* Map */}
              {activeNeighborhood.lat && activeNeighborhood.lng && (
                <div className="rounded-xl overflow-hidden border-2 border-gray-200">
                  <MapViewNoSSR
                    lat={activeNeighborhood.lat}
                    lng={activeNeighborhood.lng}
                    name={activeNeighborhood.name}
                  />
                </div>
              )}

              {/* Detailed Info */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Key Features</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activeNeighborhood.keyFeatures?.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-full bg-white text-blue-600 text-xs border border-blue-200"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {activeNeighborhood.funFacts && (
                  <div>
                    <h4 className="font-semibold text-gray-900">Fun Facts</h4>
                    <ul className="mt-2 space-y-2">
                      {activeNeighborhood.funFacts.map((fact, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-600 flex items-start gap-2"
                        >
                          <span className="text-blue-600">•</span>
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t">
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </button>
        <button
          onClick={() => onComplete(selectedNeighborhoods)}
          disabled={selectedNeighborhoods.length === 0}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue with {selectedNeighborhoods.length} selected
        </button>
      </div>
    </OnboardingContainer>
  );
}
