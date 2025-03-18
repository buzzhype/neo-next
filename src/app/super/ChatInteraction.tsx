import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Command,
  Send,
  Home,
  DollarSign,
  MapPin,
  PlusCircle,
  Users,
  Settings,
  Check,
  Bell,
  ThumbsUp,
  Zap,
  Sliders,
  AlertCircle,
  X,
} from "lucide-react";

interface ChatInteractionProps {
  input: string;
  onInputChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isDemoRunning: boolean;

  // User profile
  userProfile?: {
    city?: string;
    budget?: number;
    propertyType?: string;
    specializations?: string[];
  };
  onEditProfile?: () => void;
  updateSpecializations?: (specializations: string[]) => void;

  // Command Palette
  onOpenCommandPalette: () => void;

  // The function we'll call when "Add Specialist" is clicked
  onAddSpecialist?: () => void;
}

// Define all available specializations with professional descriptions
const SPECIALIZATIONS = [
  {
    id: "firstTimeBuyer",
    name: "First-Time Buyer Guide",
    description:
      "Expert guidance through the first-time homebuying process with personalized support",
    icon: Home,
    color: "bg-gradient-to-r from-blue-600 to-blue-500",
  },
  {
    id: "familyFocused",
    name: "Family-Focused Specialist",
    description:
      "Specialized expertise in family-friendly properties, communities, and amenities",
    icon: Users,
    color: "bg-gradient-to-r from-teal-600 to-teal-500",
  },
  {
    id: "investmentAnalyst",
    name: "Investment Analyst",
    description:
      "Data-driven analysis for investment properties with ROI forecasting and market trends",
    icon: DollarSign,
    color: "bg-gradient-to-r from-green-600 to-green-500",
  },
];

// City names mapping for display
const CITY_NAMES: { [key: string]: string } = {
  sf: "San Francisco",
  nyc: "New York City",
  la: "Los Angeles",
  chi: "Chicago",
  mia: "Miami",
  sea: "Seattle",
  bos: "Boston",
  den: "Denver",
};

const ChatInteraction: React.FC<ChatInteractionProps> = ({
  input,
  onInputChange,
  onSubmit,
  isLoading,
  isDemoRunning,
  userProfile,
  updateSpecializations,
  onOpenCommandPalette,
  onEditProfile,
  onAddSpecialist,
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showAgentVoiceDropdown, setShowAgentVoiceDropdown] = useState(false);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);

  // Default specialists
  const defaultSpecializations = ["firstTimeBuyer", "familyFocused"];

  const [selectedSpecializations, setSelectedSpecializations] = useState<
    string[]
  >(userProfile?.specializations || defaultSpecializations);

  // Initialize selected specializations from userProfile
  useEffect(() => {
    if (userProfile?.specializations) {
      setSelectedSpecializations(userProfile.specializations);
    } else {
      // Set default specialists if none are set
      setSelectedSpecializations(defaultSpecializations);
      // Also update the parent component with default specialists
      if (updateSpecializations) {
        updateSpecializations(defaultSpecializations);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile?.specializations]);

  // Toggle a specialization with proper state management
  const toggleSpecialization = (id: string) => {
    if (updateSpecializations) {
      // Create a new array to avoid direct state mutations
      let updatedSpecializations: string[];

      if (selectedSpecializations.includes(id)) {
        // Don't remove if it's the last one - maintain at least one specialist
        if (selectedSpecializations.length <= 1) return;
        updatedSpecializations = selectedSpecializations.filter(
          (specId) => specId !== id,
        );
      } else {
        updatedSpecializations = [...selectedSpecializations, id];
      }

      // Update local state immediately for responsive UI
      setSelectedSpecializations(updatedSpecializations);

      // Update parent component state for persistence
      updateSpecializations(updatedSpecializations);
    }
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Render current specialists with improved styling and functionality
  const renderCurrentSpecialists = () => {
    return (
      <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto">
        {selectedSpecializations.map((specId) => {
          const spec = SPECIALIZATIONS.find((s) => s.id === specId);
          if (!spec) return null;

          let bgColorClass = "bg-blue-500";
          if (spec.id === "familyFocused") {
            bgColorClass = "bg-teal-500";
          } else if (spec.id === "investmentAnalyst") {
            bgColorClass = "bg-green-500";
          }

          return (
            <div
              key={spec.id}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-md ${bgColorClass} text-white text-sm shadow-sm relative`}
            >
              {React.createElement(spec.icon, { className: "w-4 h-4" })}
              <span>{spec.name}</span>

              <button
                onClick={() => toggleSpecialization(spec.id)}
                className="ml-2 w-5 h-5 bg-white bg-opacity-40 hover:bg-opacity-60 rounded-full flex items-center justify-center text-blue-800"
                aria-label={`Remove ${spec.name} specialist`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}

        {/* This is the Add Specialist button. */}
        <button
          onClick={onAddSpecialist}
          className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-colors shadow-sm"
          aria-label="Add Specialist"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Specialist</span>
        </button>
      </div>
    );
  };

  // Render property details
  const renderPropertyDetails = () => {
    return (
      <div className="px-3 py-2 border-b border-gray-200 flex justify-between items-center bg-white">
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 py-1.5 px-3 text-sm bg-blue-50 text-blue-600 rounded-md cursor-pointer hover:bg-blue-100"
            onClick={onEditProfile}
          >
            <Home className="w-4 h-4" />
            <span>{userProfile?.propertyType || "condo"}</span>
          </div>

          <div
            className="flex items-center gap-1.5 py-1.5 px-3 text-sm bg-green-50 text-green-600 rounded-md cursor-pointer hover:bg-green-100"
            onClick={onEditProfile}
          >
            <DollarSign className="w-4 h-4" />
            <span>
              {userProfile?.budget
                ? `$${userProfile.budget.toLocaleString()}`
                : "$850,000"}
            </span>
          </div>

          <div
            className="flex items-center gap-1.5 py-1.5 px-3 text-sm bg-amber-50 text-amber-600 rounded-md cursor-pointer hover:bg-amber-100"
            onClick={onEditProfile}
          >
            <MapPin className="w-4 h-4" />
            <span>
              {userProfile?.city
                ? CITY_NAMES[userProfile.city as keyof typeof CITY_NAMES] ||
                  userProfile.city
                : "San Francisco"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              className="flex items-center gap-1.5 py-1.5 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              onClick={() => setShowAgentVoiceDropdown(!showAgentVoiceDropdown)}
            >
              <Settings className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 font-medium">Agent Voice</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>

            <AnimatePresence>
              {showAgentVoiceDropdown && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-1 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
                >
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Search Style Preferences
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-blue-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <span className="text-sm">Conversational Q&A</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                        <span className="text-sm">
                          Property Recommendations
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                        <span className="text-sm">Market Analysis</span>
                      </div>
                    </div>

                    <button className="mt-3 w-full px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded border border-blue-200 hover:bg-blue-100 transition-colors">
                      Configure Style
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            className="py-1.5 px-3 text-sm rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
            onClick={() => setShowNotificationsPanel(!showNotificationsPanel)}
          >
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Render notifications panel
  const renderNotificationsPanel = () => {
    if (!showNotificationsPanel) return null;

    return (
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-900">
            Notification Preferences
          </h3>
          <button
            onClick={() => setShowNotificationsPanel(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-600" />
              <span className="text-sm">Email Notifications</span>
            </div>
            <div className="w-10 h-5 bg-blue-500 rounded-full relative cursor-pointer">
              <div className="absolute w-4 h-4 bg-white rounded-full top-0.5 right-0.5 shadow-sm"></div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm">Price Change Alerts</span>
            </div>
            <div className="w-10 h-5 bg-blue-500 rounded-full relative cursor-pointer">
              <div className="absolute w-4 h-4 bg-white rounded-full top-0.5 right-0.5 shadow-sm"></div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm">New Property Matches</span>
            </div>
            <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer">
              <div className="absolute w-4 h-4 bg-white rounded-full top-0.5 left-0.5 shadow-sm"></div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span className="text-sm">Update Frequency</span>
            </div>
            <select className="px-2 py-1 border border-gray-200 rounded text-sm bg-white">
              <option value="daily">Daily</option>
              <option value="immediate">Immediate</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="border-t border-gray-200 bg-white">
      {/* Property Details */}
      {renderPropertyDetails()}

      {/* Notification Panel */}
      {renderNotificationsPanel()}

      {/* Current specialists ribbon */}
      {renderCurrentSpecialists()}

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
              placeholder="Ask Jessica about real estate in San Francisco..."
              className={`w-full px-4 py-3.5 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
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
                : "bg-blue-500 text-white hover:bg-blue-600"
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
