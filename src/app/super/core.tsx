"use client";
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  X,
  ChevronRight,
  ChevronLeft,
  LineChart as LineChartIcon,
  MessageSquare,
  Info,
  Maximize2,
  Minimize2,
  ExternalLink,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";

import ChatSection from "./ChatSection";
import ChatInteraction from "./ChatInteraction";
import CommandPalette from "./CommandPalette";
import ArtifactRenderer, { getArtifactIcon } from "./ArtifactRenderer";
import SFMarketTrends from "./SFMarketTrends";

// Import *all* your Q&A data
import { questionsData } from "./questionsData";

// Example neighborhoods for the Command Palette
const sampleNeighborhoods = [
  { name: "Pacific Heights", description: "Upscale area with panoramic views" },
  { name: "Mission District", description: "Vibrant, culturally diverse" },
  { name: "Marina District", description: "Scenic waterfront" },
  { name: "SoMa", description: "Urban district with tech companies" },
];

// Example categories
const questionCategories = [
  { id: "all", name: "All Topics", color: "bg-blue-100 text-blue-700" },
  { id: "market", name: "Market Trends", color: "bg-green-100 text-green-700" },
  {
    id: "neighborhoods",
    name: "Neighborhoods",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "firstTimeBuyer",
    name: "First-Time Buyers",
    color: "bg-pink-100 text-pink-700",
  },
];

/**
 * Return up to six top suggested questions for a chosen category
 */
function getSuggestedQuestions(category = "all") {
  if (category === "all") {
    return questionsData.slice(0, 6).map((q) => q.question);
  }
  const filtered = questionsData.filter((q) => q.category === category);
  return filtered.slice(0, 6).map((q) => q.question);
}

/**
 * Extended artifact renderer for "custom-react" artifacts
 */
function EnhancedArtifactRenderer({ type, data }: { type: string; data: any }) {
  // If type is "custom-react", e.g. SFMarketTrends
  if (type === "custom-react") {
    if (data.componentType === "SFMarketTrends") {
      return <SFMarketTrends />;
    }
    return null;
  }
  // Otherwise use the standard artifact logic
  return <ArtifactRenderer type={type} data={data} />;
}

/**
 * Interactive demo hook that automatically cycles through
 * **every** question in questionsData that has artifact data,
 * calling onOpenArtifact(...) for each artifact-based step.
 */
function useDemoMode(
  agents: any[],
  selectedAgent: string,
  onOpenArtifact: (artifactMsg: any) => void,
) {
  const [demoMessages, setDemoMessages] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [demoProgress, setDemoProgress] = useState(0);

  /**
   * Identify all questions from questionsData that have
   * an artifact, i.e. artifactType && artifactData are present.
   */
  const artifactSteps = questionsData.filter(
    (q) => q.artifactType && q.artifactData,
  );

  // Convert them into "demo steps" with question/answer/artifact
  const steps = artifactSteps.map((q) => ({
    question: q.question,
    answer: q.answer,
    artifactType: q.artifactType,
    artifactData: q.artifactData,
  }));

  // Start the demo
  function startDemo() {
    setIsRunning(true);
    setIsTyping(false);
    setDemoMessages([]);
    setCurrentStep(0);
    setDemoProgress(0);

    // Intro message
    const introMsg = {
      id: Date.now(),
      role: "agent",
      agentId: selectedAgent,
      content: `Welcome to the Interactive Demo! I have ${steps.length} artifact-based questions to show you.`,
      timestamp: new Date(),
    };
    setDemoMessages([introMsg]);
  }

  // Stop the demo
  function stopDemo() {
    setIsRunning(false);
  }

  // Step the demo forward
  useEffect(() => {
    if (!isRunning || isTyping || currentStep >= steps.length) return;

    // Show next question after a short delay
    const timeout = setTimeout(() => {
      const step = steps[currentStep];
      // Add user question
      const userMsg = {
        id: Date.now(),
        role: "user",
        content: step.question,
        timestamp: new Date(),
      };
      setDemoMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);
      setDemoProgress(((currentStep + 0.4) / steps.length) * 100);

      // Wait again, then add agent response w/ artifact
      setTimeout(() => {
        const agentMsg = {
          id: Date.now() + 1,
          role: "agent",
          agentId: selectedAgent,
          content: step.answer,
          artifactType: step.artifactType,
          artifactData: step.artifactData,
          timestamp: new Date(),
        };

        setDemoMessages((prev) => [...prev, agentMsg]);

        // If there's an artifact, auto-open it
        if (agentMsg.artifactType && agentMsg.artifactData) {
          setTimeout(() => {
            onOpenArtifact(agentMsg); // callback from parent
          }, 600);
        }

        setIsTyping(false);
        setCurrentStep((prev) => prev + 1);
        setDemoProgress(((currentStep + 1) / steps.length) * 100);
      }, 1500);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isRunning, isTyping, currentStep, selectedAgent, steps]);

  return {
    demoMessages,
    isRunning,
    isTyping,
    demoProgress,
    startDemo,
    stopDemo,
  };
}

export default function Core() {
  // Agents
  const [selectedAgent, setSelectedAgent] = useState("firstTimeBuyer");
  const agents = [
    {
      id: "firstTimeBuyer",
      name: "First-Time Buyer Guide",
      icon: "brain",
      description: "Helps new buyers navigate the market",
    },
    {
      id: "neighborhoodExpert",
      name: "Neighborhood Expert",
      icon: "building",
      description: "Deep knowledge of local districts",
    },
  ];

  // Normal chat messages
  const [messages, setMessages] = useState<any[]>([
    {
      id: 123,
      role: "agent",
      agentId: "firstTimeBuyer",
      content:
        "Hi! I'm your SF real estate assistant. Ask about market trends, neighborhoods, or anything else!",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [newestMessageId, setNewestMessageId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [selectedQuestionCategory, setSelectedQuestionCategory] =
    useState("all");

  // Command palette
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  // Artifact panel
  const [activeArtifact, setActiveArtifact] = useState<any>(null);
  const [showArtifactPanel, setShowArtifactPanel] = useState(false);
  const [artifactFullScreen, setArtifactFullScreen] = useState(false);
  const [minimizeChat, setMinimizeChat] = useState(false);

  // Ref for chat auto-scroll - Fixed type definition to match what ChatSection expects
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // The interactive demo
  // Pass a callback so the demo can auto-show artifacts as they appear
  const {
    demoMessages,
    isRunning: isDemoRunning,
    isTyping: isDemoTyping,
    demoProgress,
    startDemo,
    stopDemo,
  } = useDemoMode(agents, selectedAgent, (agentMsg: any) => {
    setActiveArtifact(agentMsg);
    setShowArtifactPanel(true);
    setMinimizeChat(true);
  });

  // The array of messages: normal or from the demo
  const displayMessages = isDemoRunning ? demoMessages : messages;

  // Build suggestions for the user
  const suggestedQuestions = getSuggestedQuestions(selectedQuestionCategory);

  // Command+K detection
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const combo = isMac
        ? e.metaKey && e.key === "k"
        : e.ctrlKey && e.key === "k";
      if (combo) {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Basic Q&A logic
  function findMatch(userMsg: string) {
    const normalized = userMsg.toLowerCase().trim();
    return questionsData.find((q) =>
      q.question.toLowerCase().includes(normalized),
    );
  }

  function simulateResponse(userMessage: string) {
    setIsLoading(true);
    const matched = findMatch(userMessage);

    setTimeout(() => {
      const newId = Date.now();
      const response: any = {
        id: newId,
        role: "agent",
        agentId: selectedAgent,
        content: "",
        timestamp: new Date(),
      };

      if (matched) {
        response.content = matched.answer;
        if (matched.artifactType && matched.artifactData) {
          response.artifactType = matched.artifactType;
          response.artifactData = matched.artifactData;
          // Show the artifact automatically
          setTimeout(() => {
            setActiveArtifact(response);
            setShowArtifactPanel(true);
            setMinimizeChat(true);
          }, 800);
        }
      } else {
        response.content = `No direct match for "${userMessage}". Maybe try something about mortgages or local neighborhoods.`;
      }

      setMessages((prev) => [...prev, response]);
      setNewestMessageId(newId);
      setIsLoading(false);
      setShowSuggestions(true);
    }, 1500);
  }

  // Handling user input
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isDemoRunning) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setShowSuggestions(false);

    simulateResponse(userMsg.content);
  };

  // Handling a suggested question
  const handleSuggestedQuestion = (question: string) => {
    if (!question.trim() || isLoading || isDemoRunning) return;
    const userMsg = {
      id: Date.now(),
      role: "user",
      content: question,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setShowSuggestions(false);

    simulateResponse(question);
  };

  // Switching agent
  const handleSelectAgent = (agentId: string) => {
    setSelectedAgent(agentId);
    const agent = agents.find((a) => a.id === agentId);
    if (!agent) return;

    const sysMsg = {
      id: Date.now(),
      role: "system",
      content: `You are now chatting with ${agent.name}`,
      timestamp: new Date(),
    };
    const greetMsg = {
      id: Date.now() + 1,
      role: "agent",
      agentId,
      content: `Hello! I'm your ${agent.name}. How can I help?`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, sysMsg, greetMsg]);
  };

  // User clicked the artifact chip in a bubble
  const handleArtifactView = (msg: any) => {
    setActiveArtifact(msg);
    setShowArtifactPanel(true);
    setMinimizeChat(true);
  };

  // Fullscreen toggle
  const toggleArtifactFullScreen = () => {
    setArtifactFullScreen(!artifactFullScreen);
    setMinimizeChat(true);
  };

  // Minimize or restore chat
  const toggleChatVisibility = () => {
    setMinimizeChat(!minimizeChat);
  };

  // Close artifact
  const closeArtifactPanel = () => {
    setShowArtifactPanel(false);
    setArtifactFullScreen(false);
    setMinimizeChat(false);
  };

  // Start or stop demo
  const toggleDemo = () => {
    if (isDemoRunning) stopDemo();
    else startDemo();
  };

  // Panel animations
  const artifactPanelVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    fullscreen: {
      x: 0,
      width: "100%",
      height: "100%",
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: {
      x: "100%",
      transition: { type: "spring", damping: 30, stiffness: 400 },
    },
  };

  const chatSectionVariants = {
    normal: {
      width: showArtifactPanel ? "30%" : "100%",
      opacity: 1,
      x: 0,
    },
    minimized: {
      width: "30%",
      opacity: 0.8,
      x: 0,
    },
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gray-50 relative">
      {/* Command Palette */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onSelectItem={handleSuggestedQuestion}
        agents={agents}
        selectedAgent={selectedAgent}
        onSelectAgent={handleSelectAgent}
        questions={questionsData.map((q) => q.question)}
        neighborhoods={sampleNeighborhoods}
      />

      {/* Demo progress bar */}
      <AnimatePresence>
        {isDemoRunning && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50"
          >
            <motion.div
              className="h-full bg-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${demoProgress}%` }}
              transition={{ type: "spring", damping: 30 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Button */}
      <motion.button
        onClick={toggleDemo}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed top-4 right-4 z-10 px-4 py-2 rounded-lg text-sm font-medium shadow-md flex items-center gap-2 ${
          isDemoRunning
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900"
        }`}
      >
        {isDemoRunning ? (
          <>
            <X className="w-4 h-4" />
            Stop Demo
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Interactive Demo
          </>
        )}
      </motion.button>

      {/* Layout */}
      <div className="flex-1 flex h-full w-full overflow-hidden">
        {/* Chat Section */}
        <motion.div
          initial="normal"
          animate={
            !showArtifactPanel
              ? "normal"
              : minimizeChat
                ? "minimized"
                : "normal"
          }
          variants={chatSectionVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="h-full flex flex-col relative overflow-hidden"
        >
          {/* Main chat UI */}
          <div className="flex-1 overflow-hidden">
            // Replace line 523 in core.tsx with this type assertion
            <ChatSection
              messages={displayMessages}
              agents={agents}
              selectedAgent={selectedAgent}
              newestMessageId={newestMessageId}
              isLoading={isLoading}
              isDemoTyping={isDemoTyping}
              onArtifactView={handleArtifactView}
              messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
              showSuggestions={showSuggestions}
              selectedQuestionCategory={selectedQuestionCategory}
              onCategorySelect={setSelectedQuestionCategory}
              suggestedQuestions={suggestedQuestions}
              onSuggestedQuestion={handleSuggestedQuestion}
              questionCategories={questionCategories}
              isDemoRunning={isDemoRunning}
            />
          </div>

          <ChatInteraction
            input={input}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isDemoRunning={isDemoRunning}
            isHomeSearchMode={true}
            selectedAgent={selectedAgent}
            agents={agents}
            onSelectAgent={handleSelectAgent}
            onOpenCommandPalette={() => setShowCommandPalette(true)}
          />

          {/* If artifact is open, let user minimize/expand chat */}
          {showArtifactPanel && (
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
              <motion.button
                onClick={toggleChatVisibility}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white rounded-l-md shadow-md text-blue-600"
              >
                {minimizeChat ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Artifact Panel */}
        <AnimatePresence>
          {showArtifactPanel && activeArtifact && (
            <motion.div
              initial="hidden"
              animate={artifactFullScreen ? "fullscreen" : "visible"}
              exit="exit"
              variants={artifactPanelVariants}
              className={`bg-white border-l border-gray-200 flex flex-col overflow-hidden z-20 shadow-xl ${
                artifactFullScreen ? "fixed inset-0" : "flex-1"
              }`}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 border-b border-blue-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {activeArtifact.artifactType === "custom-react" ? (
                    <LineChartIcon className="w-5 h-5 text-blue-200" />
                  ) : (
                    React.createElement(
                      getArtifactIcon(activeArtifact.artifactType),
                      { className: "w-5 h-5 text-blue-200" },
                    )
                  )}
                  <div>
                    <h3 className="font-semibold">
                      {activeArtifact.artifactData?.title ||
                        activeArtifact.artifactType.charAt(0).toUpperCase() +
                          activeArtifact.artifactType.slice(1)}
                    </h3>
                    <p className="text-xs text-blue-200">
                      Interactive visualization
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleArtifactFullScreen}
                    className="p-1.5 hover:bg-blue-700/50 rounded-full transition-colors"
                    title={
                      artifactFullScreen ? "Exit fullscreen" : "Fullscreen"
                    }
                  >
                    {artifactFullScreen ? (
                      <Minimize2 className="w-5 h-5 text-white" />
                    ) : (
                      <Maximize2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                  <button
                    onClick={() => window.open("about:blank", "_blank")}
                    className="p-1.5 hover:bg-blue-700/50 rounded-full transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={closeArtifactPanel}
                    className="p-1.5 hover:bg-blue-700/50 rounded-full transition-colors"
                    title="Close"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-auto">
                <div className="p-4 h-full">
                  <EnhancedArtifactRenderer
                    key={activeArtifact.id}
                    type={activeArtifact.artifactType}
                    data={activeArtifact.artifactData}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                <div className="text-xs text-gray-500 flex items-center gap-1.5">
                  <Info className="w-3 h-3" />
                  <span>Sample data from SF real estate listings</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    title="Refresh data"
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={closeArtifactPanel}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Back to chat</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* If artifact is closed but we still have an activeArtifact, show a floating button */}
      <AnimatePresence>
        {activeArtifact && !showArtifactPanel && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowArtifactPanel(true)}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-20"
            title="Show Data"
          >
            <ChevronRight className="w-6 h-6 transform rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
