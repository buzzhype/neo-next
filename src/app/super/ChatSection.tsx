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
import MessageBubble from "./MessageBubble";

interface Message {
  id: number | string;
  role: "user" | "agent" | "system";
  content: string;
  timestamp: Date;
  agentId?: string;
  artifactType?: string;
  artifactData?: any;
  suggestedQuestions?: string[]; // Added for suggested questions
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
  // Track which questions have already been asked to avoid duplication
  const [askedQuestions, setAskedQuestions] = useState<Set<string>>(new Set());

  // State to track suggestion rotation
  const [suggestionSeed, setSuggestionSeed] = useState(0);

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

  // Generate suggested questions for the latest agent message
  const getSuggestionsForLatestMessage = () => {
    // Get a mix of different categories
    const marketQuestions = shuffleAndSelectSuggestions(
      answerableSuggestionPools.market,
      1,
      suggestionSeed,
      askedQuestions,
    );

    const pricingQuestions = shuffleAndSelectSuggestions(
      answerableSuggestionPools.pricing,
      1,
      suggestionSeed + 1,
      askedQuestions,
    );

    const buyingQuestions = shuffleAndSelectSuggestions(
      answerableSuggestionPools.buying,
      1,
      suggestionSeed + 2,
      askedQuestions,
    );

    // Combine all question types
    return [...marketQuestions, ...pricingQuestions, ...buyingQuestions];
  };

  // Add suggested questions to the latest agent message
  const messagesWithSuggestions = useMemo(() => {
    if (!hasChatStarted || !showSuggestions || isLoading || isDemoRunning) {
      return messages;
    }

    // Clone the messages array
    const enhancedMessages = [...messages];

    // Find the last agent message
    const lastAgentMessageIndex = enhancedMessages
      .map((m, i) => (m.role === "agent" ? i : -1))
      .filter((i) => i !== -1)
      .pop();

    // If there's an agent message, add suggested questions to it
    if (lastAgentMessageIndex !== undefined) {
      enhancedMessages[lastAgentMessageIndex] = {
        ...enhancedMessages[lastAgentMessageIndex],
        suggestedQuestions: getSuggestionsForLatestMessage(),
      };
    }

    return enhancedMessages;
  }, [
    messages,
    hasChatStarted,
    showSuggestions,
    isLoading,
    isDemoRunning,
    suggestionSeed,
    askedQuestions,
  ]);

  // Scroll to newest message
  useEffect(() => {
    if (newestMessageId || isDemoTyping) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [newestMessageId, messages, isDemoTyping, messagesEndRef]);

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
        {messagesWithSuggestions.map((message, index) => (
          <div key={message.id} className="flex flex-col">
            {message.role === "system" ? (
              <div className="text-center py-1.5 px-2.5 my-1 bg-gray-100 rounded-md mx-auto max-w-max">
                <p className="text-sm text-gray-600">{message.content}</p>
              </div>
            ) : (
              <MessageBubble
                message={message}
                agents={agents}
                isLastMessage={index === messagesWithSuggestions.length - 1}
                onArtifactView={onArtifactView}
                onSuggestedQuestion={handleSuggestionSelect}
              />
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
    </div>
  );
}
