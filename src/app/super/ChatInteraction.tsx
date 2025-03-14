"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  Command,
  Send,
  Brain,
  Home,
  Star,
  DollarSign,
  Building,
  MapPin,
  Sparkles,
  X,
  Filter,
  User,
  Sliders,
  Edit2,
  Info,
} from "lucide-react";

/**
 * Map an agent's "icon" string to a Lucide icon component
 */
function getAgentIcon(iconName: string) {
  switch (iconName) {
    case "brain":
      return Brain;
    case "home":
      return Home;
    case "star":
      return Star;
    case "dollarSign":
      return DollarSign;
    case "building":
      return Building;
    default:
      return Brain;
  }
}

interface ChatInteractionProps {
  input: string;
  onInputChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isDemoRunning: boolean;
  isHomeSearchMode: boolean;
  showSuggestions?: boolean;
  selectedQuestionCategory?: string;
  onCategorySelect?: (catId: string) => void;
  suggestedQuestions?: string[];
  onSuggestedQuestion?: (question: string) => void;

  // Agent selection
  selectedAgent: string;
  agents: Array<{
    id: string;
    name: string;
    icon: string;
    description?: string;
  }>;
  onSelectAgent: (agentId: string) => void;

  // User profile
  userProfile?: any;
  specializations?: any[];
  onEditProfile?: () => void;

  // Demo
  toggleDemo?: () => void;
  isDemoRunning?: boolean;

  // Command Palette
  onOpenCommandPalette: () => void;
}

const ChatInteraction: React.FC<ChatInteractionProps> = ({
  input,
  onInputChange,
  onSubmit,
  isLoading,
  isDemoRunning,
  isHomeSearchMode,
  selectedAgent,
  agents,
  onSelectAgent,
  onOpenCommandPalette,
  userProfile,
  specializations,
  onEditProfile,
  toggleDemo,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Animation variants for the filter panel
  const filterPanelVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="border-t border-gray-200 bg-white">
      {/* Filters & Specialists Panel (expandable) */}
      <div className="px-4 pt-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 py-1.5 px-3 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            <Filter className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-gray-700 font-medium">
              Filters & Specialists
            </span>
            {showFilters ? (
              <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
            )}
          </button>

          <div className="flex items-center gap-2">
            {toggleDemo && (
              <button
                onClick={toggleDemo}
                className="py-1.5 px-3 rounded-full text-xs font-medium flex items-center gap-1.5 text-white"
                style={{
                  background: isDemoRunning
                    ? "#d9848b" // BRAND_COLORS.blush
                    : "linear-gradient(to right, #5988a6, #3c4659)", // BRAND_COLORS.horizon, BRAND_COLORS.charcoal
                }}
              >
                {isDemoRunning ? (
                  <>
                    <X className="w-3.5 h-3.5" />
                    Stop Demo
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Interactive Demo
                  </>
                )}
              </button>
            )}

            {onEditProfile && (
              <button
                onClick={onEditProfile}
                className="flex items-center gap-1.5 py-1.5 px-3 text-xs bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Expandable filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              variants={filterPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden mt-3 mb-1"
            >
              {/* Search Criteria Section */}
              <div className="mb-3">
                <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">
                  Search Criteria
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {userProfile && (
                    <>
                      <div className="flex items-center justify-between py-1.5 px-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" />
                          <span className="text-xs text-gray-700">
                            Location
                          </span>
                        </div>
                        <span className="text-xs font-medium text-gray-900">
                          {userProfile.city
                            ? (typeof userProfile.city === "string" &&
                                {
                                  sf: "San Francisco",
                                  nyc: "New York City",
                                  la: "Los Angeles",
                                  chi: "Chicago",
                                  mia: "Miami",
                                  sea: "Seattle",
                                  bos: "Boston",
                                  den: "Denver",
                                }[userProfile.city]) ||
                              userProfile.city
                            : "Any"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-1.5 px-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-xs text-gray-700">Budget</span>
                        </div>
                        <span className="text-xs font-medium text-gray-900">
                          {userProfile.budget
                            ? `$${userProfile.budget.toLocaleString()}`
                            : "Any"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-1.5 px-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-1.5">
                          <Home className="w-3.5 h-3.5 text-purple-600" />
                          <span className="text-xs text-gray-700">
                            Property
                          </span>
                        </div>
                        <span className="text-xs font-medium text-gray-900">
                          {userProfile.propertyType || "Any"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-1.5 px-3 bg-amber-50 rounded-lg">
                        <div className="flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-amber-600" />
                          <span className="text-xs text-gray-700">
                            Bedrooms
                          </span>
                        </div>
                        <span className="text-xs font-medium text-gray-900">
                          {userProfile.beds || "Any"}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Real Estate Specialists Section */}
              {specializations && specializations.length > 0 && (
                <div className="mb-3">
                  <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">
                    Your Real Estate Specialists
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {specializations.map((spec) => (
                      <div
                        key={spec.id}
                        className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 ${spec.color.replace("gradient-to-r", "gradient-to-br")} text-white`}
                      >
                        {React.createElement(spec.icon, {
                          className: "w-3 h-3",
                        })}
                        <span className="font-medium">{spec.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features section */}
              {userProfile &&
                userProfile.homeFeatures &&
                userProfile.homeFeatures.length > 0 && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">
                      Must-Have Features
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {userProfile.homeFeatures.map((feature) => (
                        <div
                          key={feature}
                          className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-700"
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Message Input and Send Button */}
      <div className="p-4">
        <form onSubmit={onSubmit} className="relative flex items-center gap-2">
          <motion.div
            className="flex-1 relative"
            animate={{ scale: isInputFocused ? 1.01 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder={`Ask Jessica about real estate in San Francisco...`}
              className={`w-full px-4 py-3.5 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                isInputFocused ? "shadow-md" : ""
              }`}
              disabled={isLoading || isDemoRunning}
            />

            {/* Command Palette trigger */}
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded flex items-center gap-1 hover:bg-gray-300 transition-colors"
            >
              <Command className="w-3 h-3" />
              <span>K</span>
            </button>
          </motion.div>

          {/* Send Button */}
          <motion.button
            type="submit"
            disabled={!input.trim() || isLoading || isDemoRunning}
            whileHover={
              !input.trim() || isLoading || isDemoRunning ? {} : { scale: 1.05 }
            }
            whileTap={
              !input.trim() || isLoading || isDemoRunning ? {} : { scale: 0.95 }
            }
            className={`p-3.5 rounded-lg shadow-sm ${
              !input.trim() || isLoading || isDemoRunning
                ? "bg-gray-200 text-gray-500"
                : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
            } transition-all`}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ChatInteraction;
