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
}) => {
  const [showPersonaPicker, setShowPersonaPicker] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Currently selected agent
  const currentAgent =
    agents.find((agent) => agent.id === selectedAgent) || agents[0];

  // Convert the agent's icon string to an actual Lucide component
  const AgentIcon = getAgentIcon(currentAgent?.icon || "brain");

  // Animation variants for the persona dropdown
  const personaVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="border-t border-gray-200 bg-white">
      {/* Persona/Agent Picker */}
      <div className="px-4 pt-3">
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowPersonaPicker(!showPersonaPicker)}
            className="flex items-center justify-between w-full px-4 py-2.5 text-sm bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg hover:from-gray-100 hover:to-gray-200 transition-colors shadow-sm"
          >
            <div className="flex items-center gap-2">
              {/* Agent avatar */}
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-inner">
                <AgentIcon className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-medium text-gray-800">
                {currentAgent?.name || "AI Assistant"}
              </span>
            </div>
            {showPersonaPicker ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </motion.button>

          {/* Dropdown for selecting an agent/persona */}
          <AnimatePresence>
            {showPersonaPicker && (
              <motion.div
                variants={personaVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="max-h-64 overflow-y-auto">
                  {agents.map((agent, index) => {
                    const Icon = getAgentIcon(agent.icon);
                    const isSelected = agent.id === selectedAgent;
                    return (
                      <motion.button
                        key={agent.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => {
                          onSelectAgent(agent.id);
                          setShowPersonaPicker(false);
                        }}
                        className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left ${
                          isSelected ? "bg-blue-50" : ""
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isSelected
                              ? "bg-gradient-to-br from-blue-500 to-blue-700 shadow-inner"
                              : "bg-gradient-to-br from-gray-100 to-gray-300"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${
                              isSelected ? "text-white" : "text-gray-600"
                            }`}
                          />
                        </div>
                        <div>
                          <p
                            className={`font-medium ${
                              isSelected ? "text-blue-600" : "text-gray-700"
                            }`}
                          >
                            {agent.name}
                          </p>
                          {agent.description && (
                            <p className="text-xs text-gray-500">
                              {agent.description}
                            </p>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
              placeholder={`Ask something about ${
                isHomeSearchMode ? "real estate" : "anything"
              }...`}
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
