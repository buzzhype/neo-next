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
  Users,
  Briefcase,
  Leaf,
  Umbrella,
  ArrowDown,
  PlusCircle,
  Clock,
  Award,
  Heart,
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

// Enhanced question categories with styling
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
      // Replace any {NAME} with "Thomas"
      personalized = personalized.replace(/\{NAME\}/g, "Thomas");
      return personalized;
    });
  }
  return questions.map((q) => q.question.replace(/\{NAME\}/g, "Thomas"));
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
  selectedSpecializations: string[],
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

  // Use the first specialization as the agent for demo messages
  const primarySpecialization =
    (selectedSpecializations || [])[0] || "firstTimeBuyer";

  function startDemo() {
    setIsRunning(true);
    setIsTyping(false);
    setDemoMessages([]);
    setCurrentStep(0);
    setDemoProgress(0);
    const introMsg = {
      id: Date.now().toString(),
      role: "agent",
      agentId: primarySpecialization,
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
          agentId: primarySpecialization,
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
  }, [isRunning, isTyping, currentStep, primarySpecialization, steps]);

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
      name: "Thomas",
      experience: "first-time",
      purpose: "primary",
      budget: 850000,
      city: "sf",
      propertyType: "condo",
      beds: "2+",
      baths: "1+",
      squareFeet: "750-1500 sq ft",
      homeFeatures: ["parking", "outdoor", "updated"],
      specializations: ["firstTimeBuyer", "investmentAnalyst"], // Default with multiple specializations
      customTags: [],
      favoritePlaces: [],
      savedHomes: [],
    },
  );

  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [showPreferenceDetails, setShowPreferenceDetails] = useState(false);
  const [tempUserProfile, setTempUserProfile] = useState({ ...userProfile });
  const [showProfileCard, setShowProfileCard] = useState(true);
  const [showProfileTooltip, setShowProfileTooltip] = useState(true);

  // The messages state. IDs are strings.
  const [messages, setMessages] = useState<any[]>(() => {
    // Get specialization descriptions
    const specializationInfo = (userProfile.specializations || [])
      .map((id) => {
        const spec = SPECIALIZATIONS.find((s) => s.id === id);
        return spec ? spec.name : null;
      })
      .filter(Boolean);

    // Create a more personalized and realistic welcome message
    return [
      {
        id: Date.now().toString(),
        role: "agent",
        agentId: (userProfile.specializations || [])[0] || "firstTimeBuyer",
        content: `
👋 Hi Thomas! I'm Jessica, your dedicated real estate advisor with expertise in ${specializationInfo.join(" and ")}.

Based on your search profile, you're looking for a ${userProfile.propertyType} with ${userProfile.beds} in ${CITY_NAMES[userProfile.city]} with a budget of $${userProfile.budget.toLocaleString()}.

I've been working in ${CITY_NAMES[userProfile.city]} real estate for 8 years now, so I know the market inside and out. Let's work together to find your perfect home!

What specific neighborhoods are you interested in exploring? Or would you like to discuss current market conditions first?
        `,
        timestamp: new Date(),
        isWelcomeMessage: true,
      },
    ];
  });

  // Changed newestMessageId type to string | null.
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
  } = useDemoMode(
    SPECIALIZATIONS,
    userProfile.specializations,
    (agentMsg: any) => {
      setActiveArtifact(agentMsg);
      setShowArtifactPanel(true);
      setMinimizeChat(true);
    },
  );

  const displayMessages = isDemoRunning ? demoMessages : messages;

  const suggestedQuestions = getSuggestedQuestions(
    selectedQuestionCategory,
    userProfile,
  );

  const formatUserProfile = (profile: UserProfile | null) => {
    if (!profile) {
      return {
        name: "Thomas", // Use Thomas as the name
        displayCity: "San Francisco",
        displayBudget: "your budget",
        displayPropertyType: "property",
        displayBeds: "bedrooms",
        displayFeatures: "features you need",
        displaySpecializations: [],
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

    // Get specialization info
    const displaySpecializations = (profile.specializations || [])
      .map((id) => SPECIALIZATIONS.find((s) => s.id === id))
      .filter(Boolean) as typeof SPECIALIZATIONS;

    return {
      name: "Thomas", // Always use Thomas as the name
      displayCity,
      displayBudget,
      displayPropertyType,
      displayBeds,
      displayFeatures,
      displaySpecializations,
    };
  };

  const formattedProfile = formatUserProfile(userProfile);

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

  const toggleSpecialization = (specializationId: string) => {
    setTempUserProfile((prev: any) => {
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
  };

  const saveProfileChanges = () => {
    setUserProfile(tempUserProfile);
    const newFormattedProfile = formatUserProfile(tempUserProfile);

    // Get specialization descriptions
    const specializationInfo = (tempUserProfile.specializations || [])
      .map((id) => {
        const spec = SPECIALIZATIONS.find((s) => s.id === id);
        return spec ? spec.name : null;
      })
      .filter(Boolean);

    const systemMsg = {
      id: Date.now().toString(),
      role: "system",
      content: `Your preferences have been updated`,
      timestamp: new Date(),
    };

    // Create a more personal and conversational response
    const agentMsg = {
      id: (Date.now() + 1).toString(),
      role: "agent",
      agentId: (tempUserProfile.specializations || [])[0] || "firstTimeBuyer",
      content: `
Great! I've updated your home search preferences, Thomas.

You're now looking for a ${newFormattedProfile.displayPropertyType} with ${newFormattedProfile.displayBeds} bedrooms in ${newFormattedProfile.displayCity}, with a budget of ${newFormattedProfile.displayBudget}.

${
  tempUserProfile.homeFeatures.length > 0
    ? `Your must-haves include ${newFormattedProfile.displayFeatures}. I'll make sure to prioritize properties with these features.`
    : `You haven't specified any must-have features yet. Let me know if there are specific features you're looking for.`
}

${
  specializationInfo.length > 1
    ? `I see you're interested in expertise from ${specializationInfo.join(" and ")}. That's a smart combination!`
    : `I'll be focusing on ${specializationInfo[0]} for your search.`
}

Would you like to see some properties that match these criteria now, or do you have questions about the ${newFormattedProfile.displayCity} market?
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

  function findMatch(userMsg: string) {
    const normalized = userMsg.toLowerCase().trim();
    return questionsData.find((q) =>
      q.question.toLowerCase().includes(normalized),
    );
  }

  function simulateResponse(userMessage: string) {
    setIsLoading(true);
    setTimeout(() => {
      const newId = Date.now().toString();
      const matched = findMatch(userMessage);

      // Use the first specialization as the primary agent
      const primarySpecializationId =
        (userProfile.specializations || [])[0] || "firstTimeBuyer";
      const primarySpecialization = SPECIALIZATIONS.find(
        (s) => s.id === primarySpecializationId,
      );

      const response: any = {
        id: newId,
        role: "agent",
        agentId: primarySpecializationId,
        content: "",
        timestamp: new Date(),
      };

      if (matched) {
        let personalizedAnswer = matched.answer;

        // Personalize the response
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
        }

        // Always use "Thomas" as the name placeholder
        personalizedAnswer = personalizedAnswer.replace(/\{NAME\}/g, "Thomas");

        // Make the response more conversational and realistic
        const conversationalPrefixes = [
          `That's a great question, Thomas! `,
          `I'm glad you asked about that. `,
          `Let me share some insights on this. `,
          `This is something many buyers wonder about. `,
          `Based on my experience in ${CITY_NAMES[userProfile.city]}, `,
        ];

        const conversationalSuffixes = [
          ` Does that help with what you're looking for?`,
          ` Would you like me to elaborate on any specific aspect?`,
          ` Is there anything else you'd like to know about this?`,
          ` How does that align with your priorities?`,
          ` Let me know if you'd like more specific information.`,
        ];

        // Randomly select a prefix and suffix for variety
        const prefix =
          conversationalPrefixes[
            Math.floor(Math.random() * conversationalPrefixes.length)
          ];
        const suffix =
          conversationalSuffixes[
            Math.floor(Math.random() * conversationalSuffixes.length)
          ];

        response.content = prefix + personalizedAnswer + suffix;

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
        // Create a more personalized fallback response
        response.content = `I understand you're asking about "${userMessage}". While I don't have specific data on that, I can help you explore ${CITY_NAMES[userProfile.city]}'s neighborhoods, current listings that match your ${userProfile.propertyType} search, or discuss financing options for your budget of $${userProfile.budget.toLocaleString()}. What would be most helpful for you right now, Thomas?`;
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

  // Handle showing/hiding the user profile
  const toggleProfileCard = () => {
    setShowProfileCard(!showProfileCard);
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

  // Preference editing modal
  const PreferenceEditModal = () => {
    if (!isEditingPreferences) return null;

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
              onClick={cancelEditing}
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
                </label>
                <select
                  value={tempUserProfile.propertyType || ""}
                  onChange={(e) =>
                    handleTempProfileChange("propertyType", e.target.value)
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
                    handleTempProfileChange("budget", parseInt(e.target.value))
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
                      (tempUserProfile.homeFeatures || []).includes(
                        feature.value,
                      )
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

          <div className="p-5 border-t border-gray-200 flex justify-end gap-3">
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
              Save Changes
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-gray-50 relative">
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onSelectItem={handleSuggestedQuestion}
        agents={SPECIALIZATIONS as any}
        selectedAgent={
          (userProfile.specializations || [])[0] || "firstTimeBuyer"
        }
        onSelectAgent={() => {}}
        questions={questionsData.map((q) =>
          q.question.replace(/\{NAME\}/g, "Thomas"),
        )}
        neighborhoods={sampleNeighborhoods}
      />

      {/* Progress bar for demo */}
      <AnimatePresence>
        {isDemoRunning && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-0 left-0 right-0 h-1 bg-gray-200 z-50"
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

      {/* Edit preferences modal */}
      <AnimatePresence>
        {isEditingPreferences && <PreferenceEditModal />}
      </AnimatePresence>

      {/* Header with app title and profile access */}
      <header className="bg-white border-b border-gray-200 py-3 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-gray-900">HomeAdvisor</h1>
        </div>

        <button
          onClick={() => {
            setIsEditingPreferences(true);
            setTempUserProfile({ ...userProfile });
          }}
          className="flex items-center gap-2 py-1.5 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <User className="w-4 h-4 text-gray-600" />
          <span>Thomas</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
        </button>
      </header>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
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
            <ChatSectionWrapper
              messages={isDemoRunning ? demoMessages : messages}
              agents={SPECIALIZATIONS}
              selectedAgent={
                (userProfile.specializations || [])[0] || "firstTimeBuyer"
              }
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
            selectedAgent={
              (userProfile.specializations || [])[0] || "firstTimeBuyer"
            }
            agents={[]} // Empty array to disable agent switching
            onSelectAgent={() => {}} // Empty function to disable agent switching
            onOpenCommandPalette={() => setShowCommandPalette(true)}
            userProfile={userProfile}
            specializations={formattedProfile.displaySpecializations}
            onEditProfile={() => {
              setIsEditingPreferences(true);
              setTempUserProfile({ ...userProfile });
            }}
            toggleDemo={toggleDemo}
            isDemoRunning={isDemoRunning}
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
            className="fixed bottom-20 right-6 p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-20 text-white"
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
        {!isDemoRunning &&
          messages.length <= 2 &&
          !showCommandPalette &&
          showProfileTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-3 flex items-center gap-3 z-20 max-w-md border border-gray-200"
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
                onClick={() => setShowProfileTooltip(false)}
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
