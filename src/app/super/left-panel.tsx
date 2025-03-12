import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Compass,
  Sparkles,
  BookOpen,
  User,
  ChevronLeft,
  ChevronRight,
  Menu,
  Bot,
  Search,
  Settings,
  Plus,
  MessageSquare,
  Brain,
  Library,
  Lightbulb,
  Clock,
  LogOut,
  Heart,
  Star,
} from "lucide-react";

// Updated interface to replace setActiveTab with onViewChange
interface LeftPanelProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isHomeSearchMode: boolean;
  setIsHomeSearchMode: (value: boolean) => void;
  selectedAgent: string;
  setSelectedAgent: (value: string) => void;
  agents: any[];
  activeView: string; // Current active view
  onViewChange: (view: string) => void; // Function to change view
}

const LeftPanel = ({
  isCollapsed,
  toggleSidebar,
  isHomeSearchMode,
  setIsHomeSearchMode,
  selectedAgent,
  setSelectedAgent,
  agents,
  activeView,
  onViewChange,
}: LeftPanelProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredItem, setHoveredItem] = useState("");

  // Update navItems to match the actual view IDs
  const navItems = [
    { icon: MessageSquare, label: "Chat", id: "chat" },
    { icon: Library, label: "Knowledge Base", id: "knowledge" },
    { icon: Compass, label: "Discover", id: "discover" },
    { icon: Lightbulb, label: "Re-imagine", id: "reimagine" },
  ];

  // Recent conversation mock data
  const recentConversations = [
    {
      id: "conv1",
      title: "First-Time Buyer Guide",
      agentId: "firstTimeBuyer",
      preview: "How can I assist with your home search today?",
      time: "Today",
    },
    {
      id: "conv2",
      title: "Family-Focused Search",
      agentId: "familyFocused",
      preview: "Let me help you find the perfect family neighborhood",
      time: "Yesterday",
    },
    {
      id: "conv3",
      title: "Investment Properties",
      agentId: "investmentAnalyst",
      preview: "Analyzing potential ROI for San Francisco condos",
      time: "3 days ago",
    },
  ];

  // Filter conversations based on search query
  const filteredConversations = recentConversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Get agent icon component based on agent ID
  const getAgentIcon = (agentId) => {
    const agent = agents.find((a) => a.id === agentId);

    switch (agent?.icon) {
      case "brain":
        return Brain;
      case "home":
        return Home;
      case "star":
        return Star;
      case "dollarSign":
        return Heart;
      default:
        return MessageSquare;
    }
  };

  // Updated to use onViewChange instead of setActiveTab
  const handleTabSelection = (viewId) => {
    onViewChange(viewId);
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? "72px" : "280px" }}
      className="h-full bg-gray-50 border-r border-gray-200 flex flex-col relative z-20"
      style={{
        boxShadow: isCollapsed ? "none" : "0 4px 20px rgba(0, 0, 0, 0.05)",
        transition: "width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1)",
      }}
    >
      {/* Toggle button - now floating outside the sidebar */}
      <motion.button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 z-30"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-500" />
        )}
      </motion.button>

      {/* App Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              key="logo-expanded"
            >
              <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                AgentNeo
              </h1>
            </motion.div>
          ) : (
            <motion.div
              className="mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              key="logo-collapsed"
            >
              <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* New Conversation Button */}
      <div className="p-3">
        {isCollapsed ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all mx-auto"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-sm hover:shadow-md transition-all w-full font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>New Conversation</span>
          </motion.button>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-none py-3 border-b border-gray-200">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => handleTabSelection(item.id)}
            whileHover={{
              backgroundColor: "rgba(243, 244, 246, 1)",
              transition: { duration: 0.2 },
            }}
            className={`flex items-center w-full py-2.5 px-3 rounded-xl my-1 mx-2 transition-colors ${
              isCollapsed ? "justify-center" : "gap-3 px-4"
            } ${
              activeView === item.id
                ? "text-blue-600 bg-blue-50"
                : "text-gray-700"
            }`}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem("")}
          >
            <item.icon
              className={`w-5 h-5 ${activeView === item.id ? "text-blue-600" : "text-gray-600"}`}
            />

            {!isCollapsed && <span className="font-medium">{item.label}</span>}

            {/* Tooltip for collapsed state */}
            {isCollapsed && hoveredItem === item.id && (
              <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-gray-800 text-white text-xs rounded-md z-50 whitespace-nowrap">
                {item.label}
              </div>
            )}
          </motion.button>
        ))}
      </nav>

      {/* Recent Chats */}
      <div className="flex-1 overflow-y-auto py-3 px-2">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative mb-4 px-2">
                <Search className="w-4 h-4 text-gray-500 absolute left-5 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                />
              </div>

              <div className="flex items-center justify-between px-3 mb-2">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recent Conversations
                </h3>
                <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  View all
                </button>
              </div>

              {/* Conversation list */}
              <div className="space-y-2 px-1">
                {filteredConversations.map((conversation, index) => {
                  const AgentIcon = getAgentIcon(conversation.agentId);

                  return (
                    <motion.button
                      key={conversation.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className="w-full p-3 rounded-xl bg-white border border-gray-200 text-left hover:border-blue-200 hover:shadow-sm transition-all flex items-start gap-3"
                      onClick={() => handleTabSelection("chat")}
                    >
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <AgentIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-gray-900 truncate text-sm">
                          {conversation.title}
                        </h4>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {conversation.preview}
                        </p>
                        <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {conversation.time}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}

                {/* Empty state if no conversations match search */}
                {filteredConversations.length === 0 && (
                  <div className="text-center py-8">
                    <Search className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      No conversations found
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Try a different search term
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <div
          className={`flex items-center ${isCollapsed ? "justify-center" : "px-2"}`}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0 border border-blue-200">
            <User className="w-5 h-5 text-blue-600" />
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                className="ml-3 flex-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-medium text-gray-900 text-sm">
                  Thomas Anderson
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-medium">
                    Pro
                  </span>
                  <span className="text-xs text-gray-500">Settings</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.button
                className="ml-auto p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                whileHover={{ backgroundColor: "rgba(243, 244, 246, 1)" }}
              >
                <LogOut className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default LeftPanel;
