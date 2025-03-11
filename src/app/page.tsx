"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AgentPersona from "@/components/AgentPersona";
import LocationPreferences from "@/components/LocationPreferences";
import HomePreferences from "@/components/HomePreferences";
import NeighborhoodSuggestions from "@/components/NeighborhoodSuggestions";

// 1) Define the shape of agentType, locationPreferences, homePreferences, etc.
interface AgentType {
  city: string;
  expertise: string[];
}

interface LocationPreferencesType {
  // fill in real fields
  priceRange?: { min: number; max: number };
  selectedFeatures?: string[];
}

interface HomePreferencesType {
  // fill in real fields
  propertyType?: string;
  beds?: string;
  baths?: string;
  squareFeet?: string;
}

// If you have a typed Neighborhood interface, you can import it or define it here:
interface Neighborhood {
  name: string;
  // etc.
}

// 2) Define the shape of the entire userProfile:
interface UserProfile {
  agentType: AgentType | null;
  locationPreferences: LocationPreferencesType | null;
  homePreferences: HomePreferencesType | null;
  selectedNeighborhoods: Neighborhood[];
  threadId: string | null; // or number | null if that’s how your backend sends it
  recommendations: any; // or a typed shape
}

export default function Home() {
  // 3) Use the interface in your state:
  const [userProfile, setUserProfile] = useState<UserProfile>({
    agentType: null,
    locationPreferences: null,
    homePreferences: null,
    selectedNeighborhoods: [],
    threadId: null,
    recommendations: null,
  });

  const [step, setStep] = useState(1);
  const router = useRouter();

  // 4) Provide partial updates safely
  const updateProfile = (data: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const merged = { ...prev, ...data };
      localStorage.setItem("agentNeoUserProfile", JSON.stringify(merged));
      return merged;
    });
  };

  useEffect(() => {
    const saved = localStorage.getItem("agentNeoUserProfile");
    if (saved) {
      try {
        const loaded = JSON.parse(saved);
        // Optionally you can validate or cast if needed
        setUserProfile(loaded);
      } catch {
        // ignore parse error
      }
    }
  }, []);

  // Step 1: Agent Persona
  const handleAgentPersonaComplete = async (data: AgentType) => {
    // data matches AgentType: { city, expertise }
    updateProfile({ agentType: data });

    try {
      const res = await fetch("/api/agent/create-thread", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: data.city, expertise: data.expertise }),
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      const result = await res.json();
      updateProfile({ threadId: result.threadId });
      setStep(2);
    } catch (err) {
      console.error("Error initializing agent thread:", err);
    }
  };

  // Step 2: Location Preferences
  const handleLocationPreferencesComplete = (data: LocationPreferencesType) => {
    updateProfile({ locationPreferences: data });
    setStep(3);
  };

  // Step 3: Home Preferences
  const handleHomePreferencesComplete = (data: HomePreferencesType) => {
    updateProfile({ homePreferences: data });
    setStep(4);
  };

  // Step 4: Neighborhood selections
  const handleNeighborhoodsComplete = (selected: Neighborhood[]) => {
    updateProfile({ selectedNeighborhoods: selected });
    router.push("/onboarding/success");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {step === 1 && <AgentPersona onComplete={handleAgentPersonaComplete} />}
        {step === 2 && (
          <LocationPreferences
            userProfile={userProfile}
            onComplete={handleLocationPreferencesComplete}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <HomePreferences
            userProfile={userProfile}
            onComplete={handleHomePreferencesComplete}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && (
          <NeighborhoodSuggestions
            userProfile={userProfile}
            onComplete={handleNeighborhoodsComplete}
            onBack={() => setStep(3)}
          />
        )}

        {/* A simple step indicator */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((pageNum) => (
              <div
                key={pageNum}
                className={`h-2 w-8 rounded-full ${
                  pageNum <= step ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
