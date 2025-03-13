"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Star, ChevronUp, ChevronDown } from "lucide-react";

import LeftPanel from "./left-panel";
import Core from "./core";
import Knowledge from "./knowledge";
import Discover from "./discover";

// Define an interface for a message
interface Message {
  id: number;
  role: string;
  agentId: string;
  content: string;
  timestamp: Date;
}

// Define an interface for the Core component props
interface CoreProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  selectedAgent: string;
  setSelectedAgent: React.Dispatch<React.SetStateAction<string>>;
  agents: {
    id: string;
    name: string;
    icon: string;
    description: string;
    color: string;
  }[];
  isHomeSearchMode: boolean;
  userProfile: any;
}

// Agent options
const agentOptions = [
  {
    id: "firstTimeBuyer",
    name: "First-Time Buyer Guide",
    icon: "brain",
    description: "Expert in guiding first-time homebuyers through the process",
    color: "bg-gradient-to-r from-blue-600 to-blue-500",
  },
  {
    id: "familyFocused",
    name: "Family-Focused Specialist",
    icon: "home",
    description: "Focuses on family-friendly properties and communities",
    color: "bg-gradient-to-r from-emerald-600 to-emerald-500",
  },
  {
    id: "luxuryMarket",
    name: "Luxury Market Expert",
    icon: "star",
    description: "Specialized in high-end properties and exclusive areas",
    color: "bg-gradient-to-r from-yellow-600 to-yellow-500",
  },
  {
    id: "investmentAnalyst",
    name: "Investment Analyst",
    icon: "dollarSign",
    description: "Focuses on ROI and investment opportunities",
    color: "bg-gradient-to-r from-purple-600 to-purple-500",
  },
];

// Initial messages
const initialMessages: Message[] = [
  {
    id: 1,
    role: "agent",
    agentId: "firstTimeBuyer",
    content:
      "Hi! I'm your First-Time Buyer Guide. How can I assist with your home search today?",
    timestamp: new Date(Date.now() - 60000),
  },
];

// User profile data for onboarding
const initialUserProfile = {
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
  customTags: [],
  favoritePlaces: [],
  savedHomes: [],
};

export default function RealEstatePage() {
  // State management
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHomeSearchMode, setIsHomeSearchMode] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState("firstTimeBuyer");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [userProfile, setUserProfile] = useState(initialUserProfile);
  const [showAgentSelector, setShowAgentSelector] = useState(false);
  const [activeView, setActiveView] = useState("chat"); // Default view is chat
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]); // For knowledge component

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Toggle agent selector
  const toggleAgentSelector = () => {
    setShowAgentSelector(!showAgentSelector);
  };

  // Handle agent selection with an explicitly typed parameter
  const selectAgent = (agentId: string) => {
    setSelectedAgent(agentId);
    setShowAgentSelector(false);

    const agent = agentOptions.find((a) => a.id === agentId);
    // For system messages, we use an empty string for agentId.
    const switchMessage: Message = {
      id: Date.now(),
      role: "system",
      agentId: "",
      content: `You are now chatting with ${agent?.name}`,
      timestamp: new Date(),
    };

    const introMessage: Message = {
      id: Date.now() + 1,
      role: "agent",
      agentId: agentId,
      content: `Hello! I'm your ${agent?.name}. How can I help you today?`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, switchMessage, introMessage]);
  };

  // Handle view changes between different components
  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  // Force the Core component to accept our props.
  // We first cast Core as unknown then as React.FC<CoreProps>.
  const CoreComponent = Core as unknown as React.FC<CoreProps>;

  // Render the appropriate component based on activeView
  const renderActiveView = () => {
    switch (activeView) {
      case "chat":
        return (
          <CoreComponent
            messages={messages}
            setMessages={setMessages}
            selectedAgent={selectedAgent}
            setSelectedAgent={setSelectedAgent}
            agents={agentOptions}
            isHomeSearchMode={isHomeSearchMode}
            userProfile={userProfile}
          />
        );
      case "knowledge":
        return (
          <Knowledge
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        );
      case "discover":
        return <Discover userProfile={userProfile} />;
      case "reimagine":
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">This feature is coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gray-50">
      {/* Left Sidebar */}
      <LeftPanel
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        isHomeSearchMode={isHomeSearchMode}
        setIsHomeSearchMode={setIsHomeSearchMode}
        selectedAgent={selectedAgent}
        setSelectedAgent={setSelectedAgent}
        agents={agentOptions}
        activeView={activeView}
        onViewChange={handleViewChange}
      />
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-hidden">{renderActiveView()}</div>
      </div>
    </div>
  );
}
