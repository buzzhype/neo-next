"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  MessageSquare,
  Brain,
  Home,
  Star,
  DollarSign,
  Building,
  MapPin,
  ChevronRight,
  Sparkles,
  Command,
  Clock,
  Zap,
  Users,
  Lightbulb,
  PieChart,
  BarChart,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: string) => void;
  agents: Array<{
    id: string;
    name: string;
    icon: string;
    description?: string;
  }>;
  selectedAgent: string;
  onSelectAgent: (agentId: string) => void;
  questions: string[];
  neighborhoods: Array<{
    name: string;
    description: string;
  }>;
}

function formatTimeAgo(timestamp: Date) {
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h`;
  return `${Math.floor(diffHours / 24)}d`;
}

/** Map an agent icon name to the corresponding Lucide icon component */
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

export default function CommandPalette({
  isOpen,
  onClose,
  onSelectItem,
  agents,
  selectedAgent,
  onSelectAgent,
  questions,
  neighborhoods,
}: CommandPaletteProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentActions] = useState([
    {
      id: "recent1",
      type: "question",
      display: "What are the current real estate market trends?",
      timestamp: new Date(Date.now() - 100000),
    },
    {
      id: "recent2",
      type: "neighborhood",
      display: "Mission District",
      timestamp: new Date(Date.now() - 300000),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLDivElement>(null);
  const [showIntro, setShowIntro] = useState(true);

  // Command categories for filtering (pills)
  const categories = [
    { id: "all", name: "All", icon: <Command className="w-3 h-3" /> },
    { id: "agents", name: "Agents", icon: <Users className="w-3 h-3" /> },
    {
      id: "questions",
      name: "Questions",
      icon: <MessageSquare className="w-3 h-3" />,
    },
    {
      id: "neighborhoods",
      name: "Neighborhoods",
      icon: <MapPin className="w-3 h-3" />,
    },
    {
      id: "insights",
      name: "Insights",
      icon: <Lightbulb className="w-3 h-3" />,
    },
  ];

  // Focus the search input when the palette opens, and reset intro on close
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      const timeout = setTimeout(() => setShowIntro(false), 1500);
      return () => clearTimeout(timeout);
    } else {
      // Reset when closing
      setShowIntro(true);
      setSearchTerm("");
      setSelectedCategory("all");
      setActiveIndex(0);
    }
  }, [isOpen]);

  // Scroll the active highlighted item into view when it changes
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  // Reset highlight index when search term or category changes
  useEffect(() => {
    setActiveIndex(0);
  }, [searchTerm, selectedCategory]);

  // Predefined popular questions (shown when no search term)
  const getPopularQuestions = () => [
    {
      id: "popular1",
      type: "question",
      display: "Current real estate market trends in SF?",
      category: "market",
    },
    {
      id: "popular2",
      type: "question",
      display: "Best neighborhoods for families?",
      category: "neighborhoods",
    },
    {
      id: "popular3",
      type: "question",
      display: "Down payment needed for first home?",
      category: "firstTimeBuyer",
    },
    {
      id: "popular4",
      type: "question",
      display: "Current mortgage rates in California?",
      category: "mortgage",
    },
  ];

  // Trending insight topics (for suggestions)
  const getTrendingTopics = () => [
    {
      id: "trend1",
      type: "insight",
      display: "Market Trends Analysis",
      icon: <BarChart className="w-3 h-3 text-blue-500" />,
    },
    {
      id: "trend2",
      type: "insight",
      display: "Price Per Square Foot",
      icon: <PieChart className="w-3 h-3 text-purple-500" />,
    },
    {
      id: "trend3",
      type: "insight",
      display: "Mortgage Rate Forecast",
      icon: <Sparkles className="w-3 h-3 text-amber-500" />,
    },
  ];

  // Filter and compile list items based on search term and category
  const getFilteredItems = () => {
    // If no search term and viewing "All", show recent + popular + trending
    if (!searchTerm && selectedCategory === "all") {
      const popularQuestions = getPopularQuestions().map((q) => ({
        ...q,
        secondary: "Popular",
        icon: <Zap className="w-3 h-3 text-amber-500" />,
      }));
      const formattedRecent = recentActions.map((recent) => ({
        ...recent,
        secondary: `${recent.type === "question" ? "Q" : "Area"} • ${formatTimeAgo(recent.timestamp)}`,
        icon:
          recent.type === "question" ? (
            <Clock className="w-3 h-3 text-blue-500" />
          ) : (
            <MapPin className="w-3 h-3 text-green-500" />
          ),
      }));
      const trendingItems = getTrendingTopics().map((trend) => ({
        ...trend,
        secondary: "Trending",
      }));
      return [...formattedRecent, ...popularQuestions, ...trendingItems];
    }

    const items: any[] = [];

    // Agents
    if (selectedCategory === "all" || selectedCategory === "agents") {
      const filteredAgents = agents.filter(
        (agent) =>
          agent.id !== selectedAgent && // exclude current agent
          agent.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      items.push(
        ...filteredAgents.map((agent) => ({
          id: agent.id,
          type: "agent",
          display: agent.name,
          icon: React.createElement(getAgentIcon(agent.icon), {
            className: "w-3 h-3 text-gray-500",
          }),
          secondary: agent.description
            ? agent.description.substring(0, 30) + "..."
            : "Agent",
        })),
      );
    }

    // Questions
    if (selectedCategory === "all" || selectedCategory === "questions") {
      const filteredQuestions = questions.filter((q) =>
        q.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      items.push(
        ...filteredQuestions.map((q) => ({
          id: q,
          type: "question",
          display: q,
          icon: <MessageSquare className="w-3 h-3 text-gray-500" />,
        })),
      );
    }

    // Neighborhoods
    if (selectedCategory === "all" || selectedCategory === "neighborhoods") {
      const filteredNeighborhoods = neighborhoods.filter((n) =>
        n.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      items.push(
        ...filteredNeighborhoods.map((n) => ({
          id: n.name,
          type: "neighborhood",
          display: n.name,
          secondary: n.description
            ? n.description.substring(0, 30) + "..."
            : "",
          icon: <MapPin className="w-3 h-3 text-gray-500" />,
        })),
      );
    }

    // **New**: Insights
    if (selectedCategory === "all" || selectedCategory === "insights") {
      const topics = getTrendingTopics();
      const filteredInsights = topics.filter((trend) =>
        trend.display.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      items.push(
        ...filteredInsights.map((trend) => ({
          id: trend.id,
          type: "insight",
          display: trend.display,
          icon: trend.icon,
          secondary: "Trending",
        })),
      );
    }

    return items;
  };

  const filteredItems = getFilteredItems();

  // Handle selection of an item from the list
  const handleSelectItem = (item: any) => {
    if (item.type === "agent") {
      // Switch agent
      onSelectAgent(item.id);
    } else {
      // Use the item’s display text as a question
      onSelectItem(item.display);
    }
    onClose();
  };

  // Keyboard navigation within the palette (arrow keys and Enter/Escape)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (activeIndex < filteredItems.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    } else if (e.key === "Enter") {
      if (filteredItems[activeIndex]) {
        handleSelectItem(filteredItems[activeIndex]);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  // Category pill buttons (for UI)
  const CategoryPills = () => (
    <div className="flex gap-1 px-2 py-1 overflow-x-auto no-scrollbar">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] whitespace-nowrap ${
            selectedCategory === category.id
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {category.icon}
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center p-3 bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Click outside to close overlay */}
          <div
            className="absolute inset-0"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Palette container */}
          <motion.div
            className="relative bg-white w-full max-w-md rounded-lg shadow-lg border border-gray-200 overflow-hidden"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.15 }}
            onKeyDown={handleKeyDown}
          >
            {/* Header with search input */}
            <div className="flex items-center px-2 py-1.5 border-b border-gray-100">
              <Search className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
              <input
                ref={inputRef}
                type="text"
                className="w-full bg-transparent focus:outline-none text-xs text-gray-800 placeholder-gray-400 py-0.5"
                placeholder="Search agents, questions, neighborhoods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={onClose}
                className="p-0.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Category filter pills (shown only when no search term) */}
            {!searchTerm && <CategoryPills />}

            {/* Intro helper text */}
            {showIntro && !searchTerm && (
              <div className="px-2 py-1 mx-2 mt-1 mb-1 bg-blue-50 text-blue-700 text-[10px] rounded">
                Type to search or select from suggestions
              </div>
            )}

            {/* Results list */}
            <div
              ref={listRef}
              className="max-h-64 overflow-y-auto px-1 py-1 focus:outline-none"
              tabIndex={-1}
            >
              {filteredItems.length === 0 ? (
                <div className="p-2 text-gray-500 text-xs">
                  No results found.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-0.5">
                  {filteredItems.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      ref={idx === activeIndex ? activeItemRef : null}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition-colors ${
                        idx === activeIndex
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                      onClick={() => handleSelectItem(item)}
                    >
                      {/* Icon and display text */}
                      {item.icon && <span>{item.icon}</span>}
                      <span className="text-xs flex-1">{item.display}</span>
                      {/* Secondary label (if any) */}
                      {item.secondary && (
                        <>
                          <span className="text-[10px] ml-2 opacity-50">
                            {item.secondary}
                          </span>
                          {item.type === "agent" && (
                            <ChevronRight className="w-3 h-3 opacity-50" />
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
