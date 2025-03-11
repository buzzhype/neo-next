// src/types/index.ts
export interface UserProfile {
  agentType: {
    expertise: string;
    city: string;
  } | null;
  city: string | null;
  homePreferences: any | null;
  locationPreferences: any | null;
  selectedNeighborhood: any | null;
  recommendations: any | null;
}

export interface ProcessingPhase {
  name: string;
  description: string;
}