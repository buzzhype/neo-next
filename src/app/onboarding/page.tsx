"use client";

import { useEffect, useState } from "react";

export default function OnboardingSuccessPage() {
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("agentNeoUserProfile");
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    }
  }, []);

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading your selections...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Onboarding Completed!
        </h1>
        <p className="text-gray-700">
          Here’s a summary of the information you provided:
        </p>

        {/* Agent Type / Expertise */}
        <section className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Agent Type / Expertise</h2>
          <p className="text-sm text-gray-600">
            City: {userProfile.agentType?.city}
          </p>
          <div className="text-sm text-gray-600 mt-1">
            Expertise:
            <ul className="list-disc list-inside">
              {userProfile.agentType?.expertise?.map((exp: string) => (
                <li key={exp}>{exp}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Location Preferences */}
        <section className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Location Preferences</h2>
          <pre className="text-sm bg-white p-2 rounded">
            {JSON.stringify(userProfile.locationPreferences, null, 2)}
          </pre>
        </section>

        {/* Home Preferences */}
        <section className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Home Preferences</h2>
          <pre className="text-sm bg-white p-2 rounded">
            {JSON.stringify(userProfile.homePreferences, null, 2)}
          </pre>
        </section>

        {/* Selected Neighborhood */}
        <section className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Selected Neighborhood</h2>
          {userProfile.selectedNeighborhood ? (
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">
                {userProfile.selectedNeighborhood.name}
              </p>
              <p className="mb-1">
                {userProfile.selectedNeighborhood.description}
              </p>
              <p className="text-blue-600">
                Average Price: $
                {userProfile.selectedNeighborhood.averagePrice?.toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="text-sm">No neighborhood selected.</p>
          )}
        </section>

        <div>
          <p className="text-gray-600">
            We’ve stored your preferences. Our agent will get in touch with more
            details soon!
          </p>
        </div>
      </div>
    </main>
  );
}
