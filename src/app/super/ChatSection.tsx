"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  User,
  ChevronRight,
  LineChart,
  Map,
  X,
  MessageSquare,
  ArrowRight,
  Lightbulb,
  Search,
  Clock,
  Sparkles,
  Zap,
  Home,
  DollarSign,
  Building,
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
}

interface Agent {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface ChatSectionProps {
  messages: Message[];
  agents: Agent[];
  selectedAgent: string;
  newestMessageId: number | string | null;
  isLoading: boolean;
  isDemoTyping: boolean;
  onArtifactView: (message: Message) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  showSuggestions: boolean;
  selectedQuestionCategory: string;
  onCategorySelect: (category: string) => void;
  suggestedQuestions: string[];
  onSuggestedQuestion: (question: string) => void;
  questionCategories: Array<{
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
  }>;
  isDemoRunning: boolean;
}

// ONLY include questions that the AI can definitely answer
const answerableSuggestionPools = {
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
  neighborhoods: [
    "What neighborhoods have the best schools?",
    "Which neighborhoods have the best access to public transportation?",
    "What neighborhoods have the best restaurants and nightlife?",
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
    "Should I get a home inspection?",
    "What closing costs should I expect?",
  ],
};

// Suggestion category definitions with icons
const suggestionCategories = [
  { id: "market", name: "Market", icon: LineChart, color: "text-blue-500" },
  { id: "pricing", name: "Pricing", icon: DollarSign, color: "text-green-500" },
  { id: "buying", name: "Buying", icon: Home, color: "text-purple-500" },
  {
    id: "neighborhoods",
    name: "Areas",
    icon: Building,
    color: "text-amber-500",
  },
  { id: "mortgage", name: "Mortgage", icon: Clock, color: "text-indigo-500" },
  { id: "process", name: "Process", icon: Sparkles, color: "text-pink-500" },
];

export default function ChatSection({
  messages,
  agents,
  selectedAgent,
  newestMessageId,
  isLoading,
  isDemoTyping,
  onArtifactView,
  messagesEndRef,
  showSuggestions,
  selectedQuestionCategory,
  onCategorySelect,
  suggestedQuestions: propSuggestedQuestions,
  onSuggestedQuestion,
  questionCategories,
  isDemoRunning,
}: ChatSectionProps) {
  // State for active suggestion type
  const [activeSuggestionType, setActiveSuggestionType] =
    useState<string>("market");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // State to track suggestion rotation
  const [suggestionSeed, setSuggestionSeed] = useState(0);

  // Track which questions have already been asked to avoid duplication
  const [askedQuestions, setAskedQuestions] = useState<Set<string>>(new Set());

  // When new messages come in, change the suggestions and track asked questions
  useEffect(() => {
    // Update seed to rotate suggestions
    if (messages.length > 0 && messages[messages.length - 1].role === "agent") {
      setSuggestionSeed((prev) => prev + 1);
    }

    // Track questions that have been asked to avoid showing them again
    const userMessages = messages.filter((m) => m.role === "user");
    if (userMessages.length > 0) {
      const userQuestions = userMessages.map((m) => m.content);
      setAskedQuestions(new Set(userQuestions));
    }
  }, [messages]);

  // Check if chat is active (has at least one message)
  const hasChatStarted =
    messages.length > 0 && messages.some((m) => m.role !== "system");

  // Randomize and select suggestions based on the current seed
  const shuffleAndSelectSuggestions = useCallback(
    (pool: string[], count: number, seed: number, excludeSet?: Set<string>) => {
      // Filter out excluded suggestions if provided
      const filteredPool = excludeSet
        ? pool.filter((item) => !excludeSet.has(item))
        : pool;

      // If there aren't enough items after filtering, return what we have
      if (filteredPool.length <= count) return filteredPool;

      // Simple pseudo-random shuffle based on seed
      const shuffled = [...filteredPool].sort(() => {
        // Use a consistent seed + position for deterministic but different ordering
        return 0.5 - Math.sin(seed * 9999);
      });

      return shuffled.slice(0, count);
    },
    [],
  );

  // Generate groups of suggestions that change with each message
  const groupedSuggestions = useMemo(() => {
    // Create an object with all suggestion categories
    const result: Record<string, string[]> = {};

    // Add each category with properly filtered suggestions
    Object.keys(answerableSuggestionPools).forEach((category) => {
      const pool =
        answerableSuggestionPools[
          category as keyof typeof answerableSuggestionPools
        ];

      // Exclude questions that have already been asked
      result[category] = shuffleAndSelectSuggestions(
        pool,
        4,
        suggestionSeed,
        askedQuestions,
      );
    });

    // Incorporate any prop suggestions that are known to be answerable
    if (propSuggestedQuestions.length > 0) {
      // Filter out any suggestions that match already asked questions
      const filteredPropSuggestions = propSuggestedQuestions
        .filter((q) => !askedQuestions.has(q))
        // Only include questions that appear in our answerable pool across all categories
        .filter((q) =>
          Object.values(answerableSuggestionPools).some((pool) =>
            pool.includes(q),
          ),
        );

      // Add these to the market category as a fallback
      if (filteredPropSuggestions.length > 0) {
        result.market = [
          ...filteredPropSuggestions.slice(0, 2),
          ...result.market,
        ].slice(0, 4);
      }
    }

    return result;
  }, [
    suggestionSeed,
    propSuggestedQuestions,
    shuffleAndSelectSuggestions,
    askedQuestions,
  ]);

  // Get all answerable questions as a flat array for search
  const allAnswerableQuestions = useMemo(() => {
    return Object.values(answerableSuggestionPools).flat();
  }, []);

  // Handle suggestion search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter suggestions based on search - only include answerable questions
  const getFilteredSuggestions = useCallback(() => {
    if (!searchQuery) return [];

    return allAnswerableQuestions
      .filter(
        (q) =>
          q.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !askedQuestions.has(q),
      )
      .slice(0, 5);
  }, [searchQuery, allAnswerableQuestions, askedQuestions]);

  const filteredSuggestions = useMemo(
    () => getFilteredSuggestions(),
    [getFilteredSuggestions],
  );

  // Scroll to newest message
  useEffect(() => {
    if (newestMessageId || isDemoTyping) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [newestMessageId, messages, isDemoTyping, messagesEndRef]);

  // Get agent name from ID
  const getAgentName = useCallback(
    (agentId: string) => {
      const agent = agents.find((a) => a.id === agentId);
      return agent ? agent.name : "AI Assistant";
    },
    [agents],
  );

  // Format time
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get artifact icon
  const getArtifactIcon = (type: string) => {
    switch (type) {
      case "chart":
      case "graph":
        return LineChart;
      case "map":
        return Map;
      default:
        return LineChart;
    }
  };

  // Determine if we should show the suggestions
  const shouldShowSuggestions = showSuggestions && !isLoading && !isDemoRunning;

  // When a suggestion is selected, add it to the asked questions set
  const handleSuggestionSelect = (question: string) => {
    // Add to asked questions to prevent duplication
    setAskedQuestions((prev) => new Set([...prev, question]));
    // Call the parent handler
    onSuggestedQuestion(question);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Message List */}
      <div className="flex-1 p-3 space-y-2.5 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={message.id} className="flex flex-col">
            {message.role === "system" ? (
              <div className="text-center py-1.5 px-2.5 my-1 bg-gray-100 rounded-md mx-auto max-w-max">
                <p className="text-sm text-gray-600">{message.content}</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2 max-w-[94%] ${
                  message.role === "user" ? "self-end" : "self-start"
                }`}
              >
                {/* Agent Avatar */}
                {message.role === "agent" && (
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                )}

                <div className="flex-1">
                  {/* Message Content */}
                  <div
                    className={`rounded-lg px-3.5 py-2.5 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white border shadow-sm"
                    }`}
                  >
                    {/* Agent name at the top of agent messages */}
                    {message.role === "agent" && message.agentId && (
                      <div className="flex items-center gap-1 mb-0.5">
                        <p className="text-xs font-medium text-blue-600 truncate max-w-[140px]">
                          {getAgentName(message.agentId)}
                        </p>
                        <span className="text-xs text-gray-400">
                          • {formatTime(message.timestamp)}
                        </span>
                      </div>
                    )}

                    {/* Message content */}
                    {message.role === "agent" ? (
                      <div className="prose prose-sm max-w-none text-sm">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </p>
                    )}

                    {/* Compact Artifact button */}
                    {message.role === "agent" && message.artifactType && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={() => onArtifactView(message)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-sm transition-colors w-full"
                        >
                          {React.createElement(
                            getArtifactIcon(message.artifactType),
                            { className: "w-3.5 h-3.5" },
                          )}
                          <span className="truncate">
                            {message.artifactData?.title ||
                              message.artifactType.charAt(0).toUpperCase() +
                                message.artifactType.slice(1)}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 ml-auto flex-shrink-0" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* User Avatar */}
                {message.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.div>
            )}
          </div>
        ))}

        {/* Typing Indicator (for demo) */}
        <AnimatePresence>
          {isDemoTyping && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-2 self-start"
            >
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <div className="rounded-lg px-3.5 py-2.5 bg-white border shadow-sm">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "600ms" }}
                  ></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading indicator */}
        <AnimatePresence>
          {isLoading && !isDemoRunning && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-2 self-start"
            >
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <div className="rounded-lg px-3.5 py-2.5 bg-white border shadow-sm">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "600ms" }}
                  ></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* End of messages ref for scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {/* Unified Suggestion Section - Only Answerable Questions */}
      {shouldShowSuggestions && (
        <div className="border-t border-gray-100 bg-white">
          {/* Category tabs - horizontal scroll with no scrollbar */}
          <div className="flex items-center px-2.5 py-1.5 overflow-x-auto no-scrollbar">
            {/* Search toggle - fixed at start */}
            <button
              onClick={() => {
                setShowSearch(!showSearch);
                setSearchQuery("");
              }}
              className={`p-1.5 rounded-full flex-shrink-0 mr-1.5 ${
                showSearch
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Suggestion category tabs */}
            <div className="flex gap-1 text-xs overflow-x-auto no-scrollbar">
              {suggestionCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveSuggestionType(category.id);
                    setShowSearch(false);
                  }}
                  className={`px-2 py-1 rounded-full flex items-center gap-1 flex-shrink-0 whitespace-nowrap ${
                    activeSuggestionType === category.id && !showSearch
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  <category.icon className={`w-3 h-3 ${category.color}`} />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search input field */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-2.5 py-2 flex items-center gap-1.5 border-t border-b border-gray-100">
                  <Search className="w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search questions..."
                    className="flex-1 text-sm bg-transparent outline-none text-gray-800"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <X className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid of suggestions */}
          <div className="p-2">
            {showSearch ? (
              // Search results
              <div className="min-h-[40px]">
                {filteredSuggestions.length > 0 ? (
                  <div className="grid grid-cols-1 gap-1">
                    {filteredSuggestions.map((question, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionSelect(question)}
                        className="flex items-start gap-1.5 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-left"
                      >
                        <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{question}</span>
                      </button>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <div className="flex items-center justify-center h-10 text-sm text-gray-500">
                    No matching questions found
                  </div>
                ) : null}
              </div>
            ) : (
              // Grid layout of categorized suggestions
              <div className="min-h-[40px]">
                {hasChatStarted &&
                groupedSuggestions[activeSuggestionType] &&
                groupedSuggestions[activeSuggestionType].length > 0 ? (
                  <div className="grid grid-cols-2 gap-1.5">
                    {groupedSuggestions[activeSuggestionType].map(
                      (question, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionSelect(question)}
                          className="flex items-start gap-1.5 p-2 text-xs text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-left"
                        >
                          <ArrowRight className="w-3 h-3 mt-0.5 flex-shrink-0 text-blue-500" />
                          <span className="line-clamp-2">{question}</span>
                        </button>
                      ),
                    )}
                  </div>
                ) : (
                  // First-time suggestions (guaranteed answerable)
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() =>
                        handleSuggestionSelect(
                          "What are the current real estate market trends in San Francisco?",
                        )
                      }
                      className="flex items-start gap-1.5 p-2 text-xs text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-left"
                    >
                      <LineChart className="w-3 h-3 mt-0.5 flex-shrink-0 text-blue-500" />
                      <span className="line-clamp-2">
                        What are the current real estate market trends in San
                        Francisco?
                      </span>
                    </button>
                    <button
                      onClick={() =>
                        handleSuggestionSelect(
                          "How much have home prices increased in the last year?",
                        )
                      }
                      className="flex items-start gap-1.5 p-2 text-xs text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-left"
                    >
                      <DollarSign className="w-3 h-3 mt-0.5 flex-shrink-0 text-green-500" />
                      <span className="line-clamp-2">
                        How much have home prices increased in the last year?
                      </span>
                    </button>
                    <button
                      onClick={() =>
                        handleSuggestionSelect(
                          "Is now a good time to buy a house?",
                        )
                      }
                      className="flex items-start gap-1.5 p-2 text-xs text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-left"
                    >
                      <Home className="w-3 h-3 mt-0.5 flex-shrink-0 text-purple-500" />
                      <span className="line-clamp-2">
                        Is now a good time to buy a house?
                      </span>
                    </button>
                    <button
                      onClick={() =>
                        handleSuggestionSelect(
                          "What neighborhoods have the best schools?",
                        )
                      }
                      className="flex items-start gap-1.5 p-2 text-xs text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-left"
                    >
                      <Building className="w-3 h-3 mt-0.5 flex-shrink-0 text-amber-500" />
                      <span className="line-clamp-2">
                        What neighborhoods have the best schools?
                      </span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
