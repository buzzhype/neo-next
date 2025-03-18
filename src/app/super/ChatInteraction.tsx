import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
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
  Edit2,
  Bell,
  ThumbsUp,
  Zap,
  HelpCircle,
  Sliders,
  AlertCircle,
} from "lucide-react";

interface ChatInteractionProps {
  input: string;
  onInputChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isDemoRunning: boolean;
  isHomeSearchMode?: boolean; // Added this prop to match usage in core.tsx
  selectedAgent?: string; // Added this prop to match usage in core.tsx
  agents?: any[]; // Added this prop to match usage in core.tsx
  onSelectAgent?: (agentId: string) => void; // Added this prop to match usage in core.tsx
  toggleDemo?: () => void; // Added this prop to match usage in core.tsx

  // User profile
  userProfile?: {
    city?: string;
    budget?: number;
    propertyType?: string;
    specializations?: string[];
  };
  specializations?: Array<{
    id: string;
    name: string;
    color: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  onEditProfile?: () => void;
  updateSpecializations?: (specializations: string[]) => void;

  // Command Palette
  onOpenCommandPalette: () => void;
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
  isHomeSearchMode,
  selectedAgent,
  agents,
  onSelectAgent,
  toggleDemo,
}) => {
  // State for the options dropdown
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "general" | "specialists" | "notifications"
  >("general");

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
  }, [userProfile?.specializations, updateSpecializations]);

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

  // Handler for Add Specialist button with improved navigation
  const handleAddSpecialist = () => {
    // Open the options panel and navigate directly to specialists tab
    setOptionsOpen(true);
    setActiveTab("specialists");

    // Call the parent handler if provided
    if (onAddSpecialist) {
      onAddSpecialist();
    }
  };

  // Animation variants
  const optionsVariants = {
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

  // Render current specialists with improved styling and functionality
  const renderCurrentSpecialists = () => {
    return (
      <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto border-b border-gray-100">
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
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md ${bgColorClass} text-white text-sm shadow-sm group relative`}
            >
              {React.createElement(spec.icon, { className: "w-4 h-4" })}
              <span className="mr-1">{spec.name}</span>

              {/* Clearly visible close button */}
              <button
                onClick={() => toggleSpecialization(spec.id)}
                className="ml-1 w-5 h-5 bg-white bg-opacity-40 hover:bg-opacity-60 rounded-full flex items-center justify-center text-blue-800"
                aria-label={`Remove ${spec.name} specialist`}
              >
                ✕
              </button>
            </div>
          );
        })}

        <button
          onClick={handleAddSpecialist}
          className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-colors shadow-sm"
          aria-label="Add Specialist"
          title="Add a new specialty to refine your search results"
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
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-1.5 py-1 px-3 text-sm bg-blue-50 text-blue-600 rounded-md cursor-pointer hover:bg-blue-100"
          onClick={onEditProfile}
        >
          <Home className="w-4 h-4" />
          <span>{userProfile?.propertyType || "condo"}</span>
        </div>

        <div
          className="flex items-center gap-1.5 py-1 px-3 text-sm bg-green-50 text-green-600 rounded-md cursor-pointer hover:bg-green-100"
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
          className="flex items-center gap-1.5 py-1 px-3 text-sm bg-amber-50 text-amber-600 rounded-md cursor-pointer hover:bg-amber-100"
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
    );
  };

  return (
    <div className="border-t border-gray-200 bg-white">
      {/* Top Bar with Options and Property Details */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
        <button
          onClick={() => setOptionsOpen(!optionsOpen)}
          className="flex items-center gap-1.5 py-1.5 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          <Settings className="w-4 h-4 text-gray-600" />
          <span className="text-gray-700 font-medium">Customization</span>
          {optionsOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {renderPropertyDetails()}
      </div>

      {/* Current specialists ribbon */}
      {renderCurrentSpecialists()}

      {/* Options panel with agent voice and improved structure */}
      <AnimatePresence>
        {optionsOpen && (
          <motion.div
            variants={optionsVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden border-b border-gray-200 bg-white shadow-md"
          >
            <div className="p-4">
              {/* Professional tabbed navigation */}
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  onClick={() => setActiveTab("general")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === "general"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  General Settings
                </button>
                <button
                  onClick={() => setActiveTab("specialists")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === "specialists"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Expertise Selection
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === "notifications"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Notification Preferences
                </button>
              </div>

              {activeTab === "general" && (
                <div>
                  <div className="space-y-3 mb-4">
                    <div className="w-full p-4 rounded-lg border border-gray-200 bg-white hover:border-blue-200 transition-colors">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Settings className="w-5 h-5 text-blue-600" />
                          <div>
                            <span className="font-medium">
                              Search Style Preferences
                            </span>
                            <p className="text-sm text-gray-600 mt-1">
                              Customize how information is presented in your
                              search results
                            </p>
                          </div>
                        </div>
                        <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors flex items-center gap-1">
                          <Edit2 className="w-3.5 h-3.5" />
                          Configure
                        </button>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 border-2 border-blue-600 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            </div>
                            <div>
                              <span className="text-sm font-medium">
                                Conversational Q&A
                              </span>
                              <p className="text-xs text-gray-500">
                                Interactive dialogue format with clear answers
                                to your questions
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                            <div>
                              <span className="text-sm font-medium">
                                Personalized Property Recommendations
                              </span>
                              <p className="text-xs text-gray-500">
                                Tailored suggestions based on your preferences
                                and requirements
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                            <div>
                              <span className="text-sm font-medium">
                                Market Analysis and Investment Insights
                              </span>
                              <p className="text-xs text-gray-500">
                                Data-driven evaluation of market trends and
                                investment potential
                              </p>
                            </div>
                          </div>
                        </div>

                        <button className="w-full mt-3 px-3 py-2 text-sm bg-gray-50 text-blue-600 rounded border border-gray-200 hover:bg-gray-100 transition-colors flex items-center justify-center gap-1.5">
                          Create Custom Style
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "specialists" && (
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-2">
                    Real Estate Expertise Selection
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    I can tailor my assistance based on your specific real
                    estate needs. Please select the specializations that align
                    with your goals, and I'll adjust my recommendations
                    accordingly.
                  </p>

                  <div className="grid grid-cols-1 gap-3 mb-4">
                    {SPECIALIZATIONS.map((spec) => (
                      <div
                        key={spec.id}
                        className={`p-4 rounded-lg flex items-start gap-3 transition-colors ${
                          selectedSpecializations.includes(spec.id)
                            ? "bg-blue-50 border border-blue-200"
                            : "border border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg text-white flex-shrink-0 ${
                            spec.id === "firstTimeBuyer"
                              ? "bg-blue-500"
                              : spec.id === "familyFocused"
                                ? "bg-teal-500"
                                : "bg-green-500"
                          }`}
                        >
                          {React.createElement(spec.icon, {
                            className: "w-5 h-5",
                          })}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{spec.name}</div>
                          <p className="text-sm text-gray-600 mt-1">
                            {spec.description}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleSpecialization(spec.id)}
                          className={`p-2 rounded-md flex-shrink-0 ${
                            selectedSpecializations.includes(spec.id)
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : "border border-blue-500 text-blue-500 hover:bg-blue-50"
                          } transition-colors`}
                          aria-label={
                            selectedSpecializations.includes(spec.id)
                              ? "Remove this expertise"
                              : "Add this expertise"
                          }
                        >
                          {selectedSpecializations.includes(spec.id) ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <PlusCircle className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    ))}

                    {/* Request for Additional Expertise */}
                    <div className="p-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:border-blue-300 transition-colors text-center">
                      <HelpCircle className="w-5 h-5 mx-auto mb-2 text-gray-500" />
                      <p className="text-sm font-medium text-gray-600">
                        Need a different type of expertise?
                      </p>
                      <button className="mt-2 px-3 py-1.5 text-sm bg-white text-blue-600 rounded-md border border-blue-200 hover:bg-blue-50 transition-colors inline-flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        Request Custom Specialist
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-2">
                    Notification Management
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Configure how and when you'd like to receive updates about
                    market changes and property opportunities that match your
                    criteria.
                  </p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between p-3.5 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                      <div className="flex items-center gap-2">
                        <Bell className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Email Notifications</div>
                          <p className="text-sm text-gray-600">
                            Receive comprehensive property updates via email
                          </p>
                        </div>
                      </div>
                      <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                        <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 right-0.5 shadow-sm"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Price Change Alerts</div>
                          <p className="text-sm text-gray-600">
                            Be notified when properties in your target range
                            change price
                          </p>
                        </div>
                      </div>
                      <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                        <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 right-0.5 shadow-sm"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium">
                            New Property Matches
                          </div>
                          <p className="text-sm text-gray-600">
                            Receive alerts when new properties match your
                            criteria
                          </p>
                        </div>
                      </div>
                      <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                        <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5 shadow-sm"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium">
                            Notification Frequency
                          </div>
                          <p className="text-sm text-gray-600">
                            Control how often you receive updates
                          </p>
                        </div>
                      </div>
                      <select className="px-3 py-1.5 border border-gray-200 rounded-md text-sm bg-white">
                        <option value="daily">Daily Digest</option>
                        <option value="immediate">Immediate</option>
                        <option value="weekly">Weekly Summary</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-2 border-t border-gray-100">
                <button
                  onClick={() => setOptionsOpen(false)}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
