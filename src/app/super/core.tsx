"use client";
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  LineChart as LineChartIcon,
  MessageSquare,
  Info,
  Maximize2,
  Minimize2,
  ExternalLink,
  RefreshCw,
  ArrowLeft,
  User,
  Home,
  Building,
  DollarSign,
  Map,
  MapPin,
  Coffee,
  Zap,
  Calendar,
  Edit2,
  Check,
  MoreHorizontal,
  Settings,
  Save,
  Sliders,
} from "lucide-react";

import ChatSection from "./ChatSection";
import ChatSectionWrapper from "./ChatSectionWrapper";
import ChatInteraction from "./ChatInteraction";
import CommandPalette from "./CommandPalette";
import ArtifactRenderer, { getArtifactIcon } from "./ArtifactRenderer";
import SFMarketTrends from "./SFMarketTrends";
import { questionsData } from "./questionsData";

// Brand colors
const BRAND_COLORS = {
  neutralBlack: "#232226",
  charcoal: "#3c4659",
  manatee: "#8a8ba6",
  horizon: "#5988a6",
  blush: "#d9848b",
  horizonLight: "#daeaf3",
  horizonDark: "#4a7a97",
};

// Example neighborhoods for the Command Palette
const sampleNeighborhoods = [
  { name: "Pacific Heights", description: "Upscale area with panoramic views" },
  { name: "Mission District", description: "Vibrant, culturally diverse" },
  { name: "Marina District", description: "Scenic waterfront" },
  { name: "SoMa", description: "Urban district with tech companies" },
  { name: "Nob Hill", description: "Historic neighborhood with luxury hotels" },
  { name: "Hayes Valley", description: "Trendy shopping and dining district" },
];

// City names mapping for display
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

// Enhanced question categories with better styling
const questionCategories = [
  {
    id: "all",
    name: "All Topics",
    color: "bg-blue-50 text-blue-600",
    icon: Info,
  },
  {
    id: "market",
    name: "Market Trends",
    color: "bg-green-50 text-green-600",
    icon: LineChartIcon,
  },
  {
    id: "neighborhoods",
    name: "Neighborhoods",
    color: "bg-purple-50 text-purple-600",
    icon: MapPin,
  },
  {
    id: "firstTimeBuyer",
    name: "First-Time Buyers",
    color: "bg-orange-50 text-orange-600",
    icon: Home,
  },
  {
    id: "investment",
    name: "Investment",
    color: "bg-indigo-50 text-indigo-600",
    icon: DollarSign,
  },
  {
    id: "timeline",
    name: "Buying Timeline",
    color: "bg-red-50 text-red-600",
    icon: Calendar,
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
  customTags: string[];
  favoritePlaces: any[];
  savedHomes: any[];
}

/**
 * Return up to six top suggested questions for a chosen category.
 */
function getSuggestedQuestions(
  category: string = "all",
  userProfile: UserProfile | null = null,
): string[] {
  let questions = [];
  if (category === "all") {
    questions = questionsData.slice(0, 6);
  } else {
    questions = questionsData
      .filter((q) => q.category === category)
      .slice(0, 6);
  }
  if (userProfile) {
    return questions.map((q) => {
      let personalized = q.question;
      if (userProfile.city && CITY_NAMES[userProfile.city]) {
        personalized = personalized.replace(
          /\{CITY\}/g,
          CITY_NAMES[userProfile.city],
        );
      }
      if (userProfile.budget) {
        personalized = personalized.replace(
          /\{BUDGET\}/g,
          `$${userProfile.budget.toLocaleString()}`,
        );
      }
      if (userProfile.propertyType) {
        personalized = personalized.replace(
          /\{PROPERTY_TYPE\}/g,
          userProfile.propertyType,
        );
      }
      return personalized;
    });
  }
  return questions.map((q) => q.question);
}

/**
 * Extended artifact renderer for "custom-react" artifacts.
 */
function EnhancedArtifactRenderer({ type, data }: { type: string; data: any }) {
  if (type === "custom-react") {
    if (data.componentType === "SFMarketTrends") {
      return <SFMarketTrends />;
    }
    return null;
  }
  return <ArtifactRenderer type={type} data={data} />;
}

/**
 * Interactive demo hook that cycles through artifact-based questions.
 */
function useDemoMode(
  agents: any[],
  selectedAgent: string,
  onOpenArtifact: (artifactMsg: any) => void,
) {
  const [demoMessages, setDemoMessages] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [demoProgress, setDemoProgress] = useState(0);

  const artifactSteps = questionsData.filter(
    (q) => q.artifactType && q.artifactData,
  );

  const steps = artifactSteps.map((q) => ({
    question: q.question,
    answer: q.answer,
    artifactType: q.artifactType,
    artifactData: q.artifactData,
  }));

  function startDemo() {
    setIsRunning(true);
    setIsTyping(false);
    setDemoMessages([]);
    setCurrentStep(0);
    setDemoProgress(0);
    const introMsg = {
      id: Date.now().toString(),
      role: "agent",
      agentId: selectedAgent,
      content: `Welcome to the Interactive Demo! I have ${steps.length} artifact-based questions to show you.`,
      timestamp: new Date(),
    };
    setDemoMessages([introMsg]);
  }

  function stopDemo() {
    setIsRunning(false);
  }

  useEffect(() => {
    if (!isRunning || isTyping || currentStep >= steps.length) return;
    const timeout = setTimeout(() => {
      const step = steps[currentStep];
      const userMsg = {
        id: Date.now().toString(),
        role: "user",
        content: step.question,
        timestamp: new Date(),
      };
      setDemoMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);
      setDemoProgress(((currentStep + 0.4) / steps.length) * 100);
      setTimeout(() => {
        const agentMsg = {
          id: (Date.now() + 1).toString(),
          role: "agent",
          agentId: selectedAgent,
          content: step.answer,
          artifactType: step.artifactType,
          artifactData: step.artifactData,
          timestamp: new Date(),
        };
        setDemoMessages((prev) => [...prev, agentMsg]);
        if (agentMsg.artifactType && agentMsg.artifactData) {
          setTimeout(() => {
            onOpenArtifact(agentMsg);
          }, 600);
        }
        setIsTyping(false);
        setCurrentStep((prev) => prev + 1);
        setDemoProgress(((currentStep + 1) / steps.length) * 100);
      }, 1500);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [isRunning, isTyping, currentStep, selectedAgent, steps]);

  return {
    demoMessages,
    isRunning,
    isTyping,
    demoProgress,
    startDemo,
    stopDemo,
  };
}

// Main Core component with enhanced user profile integration and editing
export default function Core({
  userProfile: initialUserProfile,
}: {
  userProfile?: UserProfile;
}) {
  const [userProfile, setUserProfile] = useState<UserProfile>(
    initialUserProfile || {
      name: "Guest",
      experience: "first-time",
      purpose: "primary",
      budget: 850000,
      city: "sf",
      propertyType: "condo",
      beds: "2+",
      baths: "1+",
      squareFeet: "750-1500 sq ft",
      homeFeatures: ["parking", "outdoor", "updated"],
      customTags: [],
      favoritePlaces: [],
      savedHomes: [],
    },
  );

  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [showPreferenceDetails, setShowPreferenceDetails] = useState(false);
  const [tempUserProfile, setTempUserProfile] = useState({ ...userProfile });

  const [selectedAgent, setSelectedAgent] = useState("firstTimeBuyer");
  const agents = [
    {
      id: "firstTimeBuyer",
      name: "First-Time Buyer Guide",
      icon: Home,
      description: "Helps new buyers navigate the market",
      color: "bg-gradient-to-r from-blue-600 to-blue-500",
    },
    {
      id: "neighborhoodExpert",
      name: "Neighborhood Expert",
      icon: Building,
      description: "Deep knowledge of local districts",
      color: "bg-gradient-to-r from-purple-600 to-purple-500",
    },
    {
      id: "investmentAnalyst",
      name: "Investment Analyst",
      icon: DollarSign,
      description: "Maximizes ROI and investment potential",
      color: "bg-gradient-to-r from-green-600 to-green-500",
    },
    {
      id: "luxurySpecialist",
      name: "Luxury Specialist",
      icon: Sparkles,
      description: "Focuses on premium properties",
      color: "bg-gradient-to-r from-amber-600 to-amber-500",
    },
  ];

  const formatUserProfile = (profile: UserProfile | null) => {
    if (!profile) {
      return {
        name: "Guest",
        displayCity: "San Francisco",
        displayBudget: "your budget",
        displayPropertyType: "property",
        displayBeds: "bedrooms",
        displayFeatures: "features you need",
      };
    }
    const displayCity =
      CITY_NAMES[profile.city] || profile.city || "San Francisco";
    const displayBudget = profile.budget
      ? `$${profile.budget.toLocaleString()}`
      : "your budget";
    const propertyTypes: Record<UserProfile["propertyType"], string> = {
      condo: "Condo",
      house: "House",
      townhouse: "Townhouse",
      apartment: "Apartment",
      "multi-family": "Multi-Family",
    };
    const displayPropertyType =
      propertyTypes[profile.propertyType] || profile.propertyType || "property";
    const displayBeds = profile.beds || "bedrooms";
    const displayFeatures =
      profile.homeFeatures && profile.homeFeatures.length > 0
        ? profile.homeFeatures.join(", ")
        : "features you need";
    return {
      name: profile.name || "Guest",
      displayCity,
      displayBudget,
      displayPropertyType,
      displayBeds,
      displayFeatures,
    };
  };

  const formattedProfile = formatUserProfile(userProfile);

  // Changed newestMessageId type to string | null for consistency.
  const [newestMessageId, setNewestMessageId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [selectedQuestionCategory, setSelectedQuestionCategory] =
    useState("all");
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [activeArtifact, setActiveArtifact] = useState<any>(null);
  const [showArtifactPanel, setShowArtifactPanel] = useState(false);
  const [artifactFullScreen, setArtifactFullScreen] = useState(false);
  const [minimizeChat, setMinimizeChat] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    demoMessages,
    isRunning: isDemoRunning,
    isTyping: isDemoTyping,
    demoProgress,
    startDemo,
    stopDemo,
  } = useDemoMode(agents, selectedAgent, (agentMsg: any) => {
    setActiveArtifact(agentMsg);
    setShowArtifactPanel(true);
    setMinimizeChat(true);
  });

  const displayMessages = isDemoRunning ? demoMessages : messages;

  const suggestedQuestions = getSuggestedQuestions(
    selectedQuestionCategory,
    userProfile,
  );

  const handleTempProfileChange = (field: string, value: any) => {
    setTempUserProfile((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleFeature = (feature: string) => {
    setTempUserProfile((prev: any) => {
      const currentFeatures = [...(prev.homeFeatures || [])];
      if (currentFeatures.includes(feature)) {
        return {
          ...prev,
          homeFeatures: currentFeatures.filter((f: string) => f !== feature),
        };
      } else {
        return {
          ...prev,
          homeFeatures: [...currentFeatures, feature],
        };
      }
    });
  };

  const saveProfileChanges = () => {
    setUserProfile(tempUserProfile);
    const agent = agents.find((a) => a.id === selectedAgent) || agents[0];
    const newFormattedProfile = formatUserProfile(tempUserProfile);
    const systemMsg = {
      id: Date.now().toString(),
      role: "system",
      content: `Your preferences have been updated`,
      timestamp: new Date(),
    };
    const agentMsg = {
      id: (Date.now() + 1).toString(),
      role: "agent",
      agentId: selectedAgent,
      content: `
I've updated your home search preferences! 📝

**Your New Profile:**
• Looking for: ${newFormattedProfile.displayPropertyType} with ${newFormattedProfile.displayBeds}
• Budget: ${newFormattedProfile.displayBudget}
• Must-have features: ${newFormattedProfile.displayFeatures}

Let's continue finding homes that match these updated criteria. Is there anything specific about these new preferences you'd like to explore?
      `,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, systemMsg, agentMsg]);
    setNewestMessageId(agentMsg.id);
    setIsEditingPreferences(false);
  };

  const cancelEditing = () => {
    setTempUserProfile({ ...userProfile });
    setIsEditingPreferences(false);
  };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const combo = isMac
        ? e.metaKey && e.key === "k"
        : e.ctrlKey && e.key === "k";
      if (combo) {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectAgent = (agentId: string) => {
    if (agentId === selectedAgent) return;
    setSelectedAgent(agentId);
    const newAgent = agents.find((a) => a.id === agentId);
    if (!newAgent) return;
    const systemMsg = {
      id: Date.now().toString(),
      role: "system",
      content: `You are now chatting with ${newAgent.name}`,
      timestamp: new Date(),
    };
    const agentIntroMsg = {
      id: (Date.now() + 1).toString(),
      role: "agent",
      agentId: agentId,
      content: `
✨ **Agent Switch: ${newAgent.name}** ✨

Hi ${formattedProfile.name}! I'll be your ${newAgent.name} now.

I've reviewed your profile:
• ${formattedProfile.displayPropertyType} in ${formattedProfile.displayCity}
• Budget of ${formattedProfile.displayBudget}
• Essential features: ${formattedProfile.displayFeatures}

My specialty is ${newAgent.description.toLowerCase()}. How can I help with your home search today?
      `,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, systemMsg, agentIntroMsg]);
    setNewestMessageId(agentIntroMsg.id);
  };

  function findMatch(userMsg: string) {
    const normalized = userMsg.toLowerCase().trim();
    return questionsData.find((q) =>
      q.question.toLowerCase().includes(normalized),
    );
  }

  function simulateResponse(userMessage: string) {
    setIsLoading(true);
    const matched = findMatch(userMessage);
    setTimeout(() => {
      const newId = Date.now().toString();
      const response: any = {
        id: newId,
        role: "agent",
        agentId: selectedAgent,
        content: "",
        timestamp: new Date(),
      };
      if (matched) {
        let personalizedAnswer = matched.answer;
        if (userProfile) {
          if (userProfile.city && CITY_NAMES[userProfile.city]) {
            personalizedAnswer = personalizedAnswer.replace(
              /\{CITY\}/g,
              CITY_NAMES[userProfile.city],
            );
          }
          if (userProfile.budget) {
            personalizedAnswer = personalizedAnswer.replace(
              /\{BUDGET\}/g,
              `$${userProfile.budget.toLocaleString()}`,
            );
          }
          if (userProfile.name) {
            personalizedAnswer = personalizedAnswer.replace(
              /\{NAME\}/g,
              userProfile.name,
            );
          }
        }
        response.content = personalizedAnswer;
        if (matched.artifactType && matched.artifactData) {
          response.artifactType = matched.artifactType;
          response.artifactData = matched.artifactData;
          setTimeout(() => {
            setActiveArtifact(response);
            setShowArtifactPanel(true);
            setMinimizeChat(true);
          }, 800);
        }
      } else {
        response.content = `I don't have a specific answer for "${userMessage}". Would you like to know more about ${formattedProfile.displayCity} neighborhoods, mortgage options, or the buying process?`;
      }
      setMessages((prev) => [...prev, response]);
      setNewestMessageId(newId);
      setIsLoading(false);
      setShowSuggestions(true);
    }, 1500);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isDemoRunning) return;
    const userMsg = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setShowSuggestions(false);
    simulateResponse(userMsg.content);
  };

  const handleSuggestedQuestion = (question: string) => {
    if (!question.trim() || isLoading || isDemoRunning) return;
    const userMsg = {
      id: Date.now().toString(),
      role: "user",
      content: question,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setShowSuggestions(false);
    simulateResponse(question);
  };

  const handleArtifactView = (msg: any) => {
    setActiveArtifact(msg);
    setShowArtifactPanel(true);
    setMinimizeChat(true);
  };

  const toggleArtifactFullScreen = () => {
    setArtifactFullScreen(!artifactFullScreen);
    setMinimizeChat(true);
  };

  const toggleChatVisibility = () => {
    setMinimizeChat(!minimizeChat);
  };

  const closeArtifactPanel = () => {
    setShowArtifactPanel(false);
    setArtifactFullScreen(false);
    setMinimizeChat(false);
  };

  const toggleDemo = () => {
    if (isDemoRunning) stopDemo();
    else startDemo();
  };

  const artifactPanelVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    fullscreen: {
      x: 0,
      width: "100%",
      height: "100%",
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: {
      x: "100%",
      transition: { type: "spring", damping: 30, stiffness: 400 },
    },
  };

  const chatSectionVariants = {
    normal: {
      width: showArtifactPanel ? "50%" : "100%",
      opacity: 1,
      x: 0,
    },
    minimized: {
      width: "50%",
      opacity: 0.8,
      x: 0,
    },
  };

  const UserProfileCard = () => (
    <motion.div
      className="bg-white rounded-xl shadow-sm mb-4 border border-gray-100 overflow-hidden"
      initial={{ height: "auto" }}
      animate={{
        height: showPreferenceDetails ? "auto" : "auto",
        transition: { duration: 0.3 },
      }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Your Search Profile
              </h3>
              <p className="text-xs text-gray-600">
                Agent recommendations based on these criteria
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (isEditingPreferences) return;
                setShowPreferenceDetails(!showPreferenceDetails);
              }}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              aria-label={
                showPreferenceDetails ? "Collapse details" : "Expand details"
              }
            >
              {showPreferenceDetails ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {!isEditingPreferences ? (
              <button
                onClick={() => {
                  setIsEditingPreferences(true);
                  setShowPreferenceDetails(true);
                  setTempUserProfile({ ...userProfile });
                }}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Edit preferences"
              >
                <Edit2 className="w-5 h-5 text-gray-600" />
              </button>
            ) : (
              <div className="flex gap-1">
                <button
                  onClick={saveProfileChanges}
                  className="p-1.5 hover:bg-green-100 text-green-600 rounded-full transition-colors"
                  aria-label="Save changes"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={cancelEditing}
                  className="p-1.5 hover:bg-red-100 text-red-600 rounded-full transition-colors"
                  aria-label="Cancel editing"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
          <div className="bg-blue-50 p-2 rounded-lg flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-sm truncate font-medium">
              {formattedProfile.displayCity}
            </span>
          </div>
          <div className="bg-green-50 p-2 rounded-lg flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-sm truncate font-medium">
              {formattedProfile.displayBudget}
            </span>
          </div>
          <div className="bg-purple-50 p-2 rounded-lg flex items-center gap-2">
            <Home className="w-4 h-4 text-purple-600" />
            <span className="text-sm truncate font-medium">
              {formattedProfile.displayPropertyType}
            </span>
          </div>
          <div className="bg-amber-50 p-2 rounded-lg flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-600" />
            <span className="text-sm truncate font-medium">
              {formattedProfile.displayBeds}
            </span>
          </div>
        </div>
        <AnimatePresence>
          {showPreferenceDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t mt-4 pt-4">
                {isEditingPreferences ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Property Type
                        </label>
                        <select
                          value={tempUserProfile.propertyType || ""}
                          onChange={(e) =>
                            handleTempProfileChange(
                              "propertyType",
                              e.target.value,
                            )
                          }
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
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
                        </label>
                        <select
                          value={tempUserProfile.beds || ""}
                          onChange={(e) =>
                            handleTempProfileChange("beds", e.target.value)
                          }
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
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
                        </label>
                        <select
                          value={tempUserProfile.budget || ""}
                          onChange={(e) =>
                            handleTempProfileChange(
                              "budget",
                              parseInt(e.target.value),
                            )
                          }
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
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
                        </label>
                        <select
                          value={tempUserProfile.city || ""}
                          onChange={(e) =>
                            handleTempProfileChange("city", e.target.value)
                          }
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          {Object.entries(CITY_NAMES).map(([code, name]) => (
                            <option key={code} value={code}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>
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
                              tempUserProfile.homeFeatures?.includes(
                                feature.value,
                              )
                                ? "bg-blue-100 text-blue-700 border-blue-200 border"
                                : "bg-gray-100 text-gray-700 border-gray-200 border"
                            }`}
                          >
                            {tempUserProfile.homeFeatures?.includes(
                              feature.value,
                            ) && (
                              <Check className="w-3 h-3 inline-block mr-1" />
                            )}
                            {feature.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="pt-3 flex justify-end gap-2">
                      <button
                        onClick={cancelEditing}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveProfileChanges}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Update Preferences
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Must-Have Features
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.homeFeatures?.map((feature) => {
                          const featureData = HOME_FEATURES.find(
                            (f) => f.value === feature,
                          );
                          return (
                            <div
                              key={feature}
                              className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700"
                            >
                              {featureData?.label || feature}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Additional Details
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            Experience:{" "}
                            {userProfile.experience === "first-time"
                              ? "First-time buyer"
                              : "Experienced"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Home className="w-3.5 h-3.5" />
                          <span>
                            Purpose:{" "}
                            {userProfile.purpose === "primary"
                              ? "Primary residence"
                              : "Investment"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => {
                          setIsEditingPreferences(true);
                          setTempUserProfile({ ...userProfile });
                        }}
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1 text-sm"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit Preferences
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gray-50 relative">
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onSelectItem={handleSuggestedQuestion}
        // Casting agents to 'any' to bypass type mismatch (CommandPalette expects icon as string)
        agents={agents as any}
        selectedAgent={selectedAgent}
        onSelectAgent={handleSelectAgent}
        questions={questionsData.map((q) => q.question)}
        neighborhoods={sampleNeighborhoods}
      />
      <AnimatePresence>
        {isDemoRunning && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50"
          >
            <motion.div
              className="h-full"
              style={{ backgroundColor: BRAND_COLORS.horizon }}
              initial={{ width: 0 }}
              animate={{ width: `${demoProgress}%` }}
              transition={{ type: "spring", damping: 30 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={toggleDemo}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 left-21 z-10 px-4 py-2 rounded-lg text-sm font-medium shadow-md flex items-center gap-2 text-white"
        style={{
          background: isDemoRunning
            ? BRAND_COLORS.blush
            : `linear-gradient(to right, ${BRAND_COLORS.horizon}, ${BRAND_COLORS.charcoal})`,
        }}
      >
        {isDemoRunning ? (
          <>
            <X className="w-4 h-4" />
            Stop Demo
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Interactive Demo
          </>
        )}
      </motion.button>
      <div className="flex-1 flex h-full w-full overflow-hidden">
        <motion.div
          initial="normal"
          animate={
            !showArtifactPanel
              ? "normal"
              : minimizeChat
                ? "minimized"
                : "normal"
          }
          variants={chatSectionVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="h-full flex flex-col relative overflow-hidden"
        >
          <div className="flex-1 overflow-hidden">
            <div className="px-4 pt-4">
              <UserProfileCard />
            </div>
            <ChatSectionWrapper
              messages={displayMessages}
              agents={agents}
              selectedAgent={selectedAgent}
              newestMessageId={newestMessageId}
              isLoading={isLoading}
              isDemoTyping={isDemoTyping}
              onArtifactView={handleArtifactView}
              messagesEndRef={messagesEndRef}
              showSuggestions={showSuggestions}
              selectedQuestionCategory={selectedQuestionCategory}
              onCategorySelect={setSelectedQuestionCategory}
              suggestedQuestions={suggestedQuestions}
              onSuggestedQuestion={handleSuggestedQuestion}
              questionCategories={questionCategories}
              isDemoRunning={isDemoRunning}
            />
          </div>
          <ChatInteraction
            input={input}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isDemoRunning={isDemoRunning}
            isHomeSearchMode={true}
            selectedAgent={selectedAgent}
            agents={agents}
            onSelectAgent={handleSelectAgent}
            onOpenCommandPalette={() => setShowCommandPalette(true)}
          />
          {showArtifactPanel && (
            <button
              onClick={toggleChatVisibility}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 p-1.5 bg-white rounded-l-md shadow-md z-10"
              title={minimizeChat ? "Expand chat" : "Minimize chat"}
            >
              {minimizeChat ? (
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          )}
        </motion.div>
        <AnimatePresence>
          {showArtifactPanel && activeArtifact && (
            <motion.div
              initial="hidden"
              animate={artifactFullScreen ? "fullscreen" : "visible"}
              exit="exit"
              variants={artifactPanelVariants}
              className={`bg-white border-l border-gray-200 flex flex-col overflow-hidden z-20 shadow-xl ${
                artifactFullScreen ? "fixed inset-0" : "flex-1"
              }`}
            >
              <div
                className="text-white p-4 border-b flex items-center justify-between"
                style={{
                  background: `linear-gradient(to right, ${BRAND_COLORS.horizon}, ${BRAND_COLORS.charcoal})`,
                  borderBottomColor: BRAND_COLORS.horizonDark,
                }}
              >
                <div className="flex items-center gap-2">
                  {activeArtifact.artifactType === "custom-react" ? (
                    <LineChartIcon className="w-5 h-5 text-white opacity-70" />
                  ) : (
                    React.createElement(
                      getArtifactIcon(activeArtifact.artifactType),
                      {
                        className: "w-5 h-5 text-white opacity-70",
                      },
                    )
                  )}
                  <div>
                    <h3 className="font-semibold">
                      {activeArtifact.artifactData?.title ||
                        activeArtifact.artifactType.charAt(0).toUpperCase() +
                          activeArtifact.artifactType.slice(1)}
                    </h3>
                    <p className="text-xs text-white opacity-70">
                      Interactive visualization
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleArtifactFullScreen}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                    title={
                      artifactFullScreen ? "Exit fullscreen" : "Fullscreen"
                    }
                  >
                    {artifactFullScreen ? (
                      <Minimize2 className="w-5 h-5 text-white" />
                    ) : (
                      <Maximize2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                  <button
                    onClick={() => window.open("about:blank", "_blank")}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={closeArtifactPanel}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                    title="Close"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <div className="p-4 h-full">
                  <EnhancedArtifactRenderer
                    key={activeArtifact.id}
                    type={activeArtifact.artifactType}
                    data={activeArtifact.artifactData}
                  />
                </div>
              </div>
              <div className="p-3 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                <div className="text-xs text-gray-500 flex items-center gap-1.5">
                  <Info className="w-3 h-3" />
                  <span>
                    Data relevant to {formattedProfile.displayCity} real estate
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    title="Refresh data"
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={closeArtifactPanel}
                    className="px-3 py-1.5 rounded-md text-sm flex items-center gap-1 text-white"
                    style={{ backgroundColor: BRAND_COLORS.horizon }}
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Back to chat</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {activeArtifact && !showArtifactPanel && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowArtifactPanel(true)}
            className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-20 text-white"
            style={{
              background: `linear-gradient(to right, ${BRAND_COLORS.horizon}, ${BRAND_COLORS.charcoal})`,
            }}
            title="Show Data"
          >
            <ChevronRight className="w-6 h-6 transform rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isDemoRunning && messages.length <= 2 && !showCommandPalette && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-50 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-3 flex items-center gap-3 z-20 max-w-md border border-gray-200"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <Info className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                Customize Your Profile
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Click the edit button at the top to update your home search
                preferences
              </p>
            </div>
            <button
              onClick={() => {
                const elem = document.querySelector(
                  'button[aria-label="Edit preferences"]',
                );
                if (elem) {
                  elem.classList.add("animate-pulse");
                  setTimeout(
                    () => elem.classList.remove("animate-pulse"),
                    2000,
                  );
                }
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
            >
              <X className="w-3 h-3 text-gray-600" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
