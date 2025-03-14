import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  User,
  ArrowRight,
  FileText,
  Image,
  LineChart,
  Search,
  DollarSign,
  Home,
  MapPin,
  Clock,
  Sparkles,
  Building,
  Info,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: number | string;
  role: "user" | "agent" | "system";
  content: string;
  timestamp: Date;
  agentId?: string;
  artifactType?: string;
  artifactData?: any;
  suggestedQuestions?: string[];
}

interface Agent {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface MessageBubbleProps {
  message: Message;
  agents: Agent[];
  isLastMessage: boolean;
  onArtifactView: (message: Message) => void;
  onSuggestedQuestion: (question: string) => void;
  showSuggestions?: boolean;
  suggestedQuestions?: string[];
  questionCategories?: Array<{
    id: string;
    name: string;
    icon: any;
    color: string;
  }>;
}

// Question categories if not provided
const defaultCategories = [
  {
    id: "market",
    name: "Market",
    icon: LineChart,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "pricing",
    name: "Pricing",
    icon: DollarSign,
    color: "bg-green-50 text-green-600",
  },
  {
    id: "buying",
    name: "Buying",
    icon: Home,
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: "areas",
    name: "Areas",
    icon: Building,
    color: "bg-amber-50 text-amber-600",
  },
  {
    id: "mortgage",
    name: "Mortgage",
    icon: Clock,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    id: "process",
    name: "Process",
    icon: Sparkles,
    color: "bg-pink-50 text-pink-600",
  },
];

// Sample questions by category if none provided
const defaultQuestions = {
  market: [
    "What are the current real estate market trends in San Francisco?",
    "How has the San Francisco housing inventory changed recently?",
    "Is it a buyer's or seller's market in San Francisco right now?",
    "How long do homes typically stay on the market in San Francisco?",
  ],
  pricing: [
    "How much have home prices increased in the last year?",
    "What's the average cost of a home in San Francisco?",
    "What are the most affordable neighborhoods in San Francisco?",
    "How do San Francisco home prices compare to other Bay Area cities?",
  ],
  buying: [
    "Is now a good time to buy a house?",
    "What neighborhoods would you recommend for families in San Francisco?",
    "What are the best neighborhoods for first-time buyers?",
    "What should I know about bidding wars in San Francisco?",
  ],
  areas: [
    "Which neighborhoods in San Francisco have the best schools?",
    "What are the up-and-coming neighborhoods in San Francisco?",
    "Which neighborhoods have the best public transportation?",
    "What are the safest neighborhoods in San Francisco?",
  ],
  mortgage: [
    "What are current mortgage rates in California?",
    "How much down payment do I need for a first home?",
    "What's the difference between fixed and adjustable rates?",
    "What are the typical closing costs in San Francisco?",
  ],
  process: [
    "What does the home buying process look like step by step?",
    "What inspections should I get before buying?",
    "Should I get pre-approved for a mortgage?",
    "What closing costs should I expect?",
  ],
};

export default function MessageBubble({
  message,
  agents,
  isLastMessage,
  onArtifactView,
  onSuggestedQuestion,
  showSuggestions = true,
  suggestedQuestions,
  questionCategories = defaultCategories,
}: MessageBubbleProps) {
  const isUser = message.role === "user";
  const icon = isUser ? User : Bot;
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState("market");

  // Function to get the icon for the artifact type
  const getArtifactIcon = (type: string) => {
    switch (type) {
      case "document":
        return FileText;
      case "image":
        return Image;
      case "chart":
      case "visualization":
      case "custom-react":
        return LineChart;
      default:
        return FileText;
    }
  };

  // Get questions for current category
  const getQuestionsForCategory = () => {
    if (suggestedQuestions && suggestedQuestions.length > 0) {
      // If we have explicitly provided questions, use those
      return suggestedQuestions.slice(0, 4);
    }
    return (
      defaultQuestions[selectedCategory as keyof typeof defaultQuestions] || []
    );
  };

  // Should we show suggestions for this message?
  const shouldShowSuggestions = !isUser && isLastMessage && showSuggestions;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center mt-1">
          {React.createElement(icon, { className: "w-4 h-4 text-blue-600" })}
        </div>
      )}

      <div className="flex flex-col max-w-[85%]">
        <div
          className={`rounded-lg px-3.5 py-2.5 ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-white border shadow-sm text-gray-800"
          }`}
        >
          <div
            className={`prose prose-sm ${isUser ? "text-white" : "text-gray-800"} max-w-none`}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>

          {/* Artifact Button - only for agent messages and if there's an artifact */}
          {!isUser && message.artifactType && (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => onArtifactView(message)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
              >
                {React.createElement(getArtifactIcon(message.artifactType), {
                  className: "w-3 h-3",
                })}
                <span>
                  {message.artifactData?.title || "View Visualization"}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Message timestamp */}
        <div
          className={`text-xs text-gray-500 mt-1 ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {formattedTime}
        </div>

        {/* Suggested Questions with Tab Design - only for last agent message */}
        {shouldShowSuggestions && (
          <div className="mt-2 border-t border-gray-100 bg-white rounded-lg shadow-sm">
            {/* Category tabs */}
            <div className="flex items-center px-2.5 py-1.5 overflow-x-auto no-scrollbar">
              <button className="p-1.5 rounded-full flex-shrink-0 mr-1.5 hover:bg-gray-100 text-gray-600">
                <Search className="w-3.5 h-3.5" />
              </button>
              <div className="flex gap-1 text-xs overflow-x-auto no-scrollbar">
                {questionCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-2 py-1 rounded-full flex items-center gap-1 flex-shrink-0 whitespace-nowrap ${
                      selectedCategory === category.id
                        ? category.color
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    {React.createElement(category.icon, {
                      className: "w-3 h-3",
                    })}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question grid */}
            <div className="p-2">
              <div className="min-h-[40px]">
                <div className="grid grid-cols-2 gap-1.5">
                  {getQuestionsForCategory().map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSuggestedQuestion(question)}
                      className="flex items-start gap-1.5 p-2 text-xs text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-left"
                    >
                      <ArrowRight className="w-3 h-3 mt-0.5 flex-shrink-0 text-blue-500" />
                      <span className="line-clamp-2">{question}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center mt-1">
          {React.createElement(icon, { className: "w-4 h-4 text-white" })}
        </div>
      )}
    </motion.div>
  );
}
