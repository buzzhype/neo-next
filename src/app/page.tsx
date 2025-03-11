"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AgentPersona from "@/components/AgentPersona";
import LocationPreferences from "@/components/LocationPreferences";
import HomePreferences from "@/components/HomePreferences";
import NeighborhoodSuggestions from "@/components/NeighborhoodSuggestions";

export default function Home() {
  const [step, setStep] = useState(1);
  const [userProfile, setUserProfile] = useState({
    agentType: null,
    locationPreferences: null,
    homePreferences: null,
    selectedNeighborhoods: [], // changed to an array
    threadId: null,
    recommendations: null,
  });

  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("agentNeoUserProfile");
    if (saved) {
      try {
        setUserProfile(JSON.parse(saved));
      } catch {
        // ignore parse error
      }
    }
  }, []);

  const updateProfile = (data: Partial<typeof userProfile>) => {
    setUserProfile((prev) => {
      const merged = { ...prev, ...data };
      localStorage.setItem("agentNeoUserProfile", JSON.stringify(merged));
      return merged;
    });
  };

  // Step 1: Agent Persona
  const handleAgentPersonaComplete = async (data: {
    city: string;
    expertise: string[];
  }) => {
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
  const handleLocationPreferencesComplete = (data: any) => {
    updateProfile({ locationPreferences: data });
    setStep(3);
  };

  // Step 3: Home Preferences
  const handleHomePreferencesComplete = (data: any) => {
    updateProfile({ homePreferences: data });
    setStep(4);
  };

  // Step 4: Multiple neighborhoods
  // user picks multiple neighborhoods, then "Continue" calls onComplete
  const handleNeighborhoodsComplete = (selected: any[]) => {
    updateProfile({ selectedNeighborhoods: selected });
    // Then redirect to success page
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

        {/* Simple progress indicator */}
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
