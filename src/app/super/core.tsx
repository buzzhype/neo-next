"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
} from "react";
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
  Brain,
  Home,
  Star,
  DollarSign,
  Building,
} from "lucide-react";

import ChatSection from "./ChatSection";
import ChatInteraction from "./ChatInteraction";
import CommandPalette from "./CommandPalette";
import ArtifactRenderer, { getArtifactIcon } from "./ArtifactRenderer";
import SFMarketTrends from "./SFMarketTrends";

// Your question/answer data
import { questionsData } from "./questionsData";

// Example neighborhoods for the command palette
const sampleNeighborhoods = [
  {
    name: "Pacific Heights",
    description: "Upscale neighborhood with panoramic views",
  },
  {
    name: "Mission District",
    description: "Vibrant area with murals and nightlife",
  },
  {
    name: "Marina District",
    description: "Scenic waterfront area with shops and dining",
  },
  {
    name: "SoMa",
    description: "Urban district with tech companies and entertainment",
  },
];

// Example categories for suggestions
const questionCategories = [
  {
    id: "all",
    name: "All Topics",
    icon: <span>✨</span>,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "market",
    name: "Market Trends",
    icon: <span>📈</span>,
    color: "bg-green-100 text-green-700",
  },
  {
    id: "neighborhoods",
    name: "Neighborhoods",
    icon: <span>📍</span>,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "firstTimeBuyer",
    name: "First-Time Buyers",
    icon: <span>🏠</span>,
    color: "bg-pink-100 text-pink-700",
  },
  {
    id: "investment",
    name: "Investment",
    icon: <span>💼</span>,
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "mortgage",
    name: "Mortgages",
    icon: <span>💲</span>,
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    id: "process",
    name: "Buying Process",
    icon: <span>🔑</span>,
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "property",
    name: "Property Types",
    icon: <span>🏡</span>,
    color: "bg-emerald-100 text-emerald-700",
  },
];

/**
 * Return suggested questions for a chosen category.
 */
function getSuggestedQuestions(category = "all") {
  if (category === "all") {
    return questionsData.slice(0, 6).map((q) => q.question);
  }
  const filtered = questionsData.filter((q) => q.category === category);
  return filtered.slice(0, 6).map((q) => q.question);
}

// Demo mode steps for interactive demo
const artifactSteps = [
  {
    question: "What are the current real estate market trends in SF?",
    artifactType: "custom-react",
    artifactData: {
      componentType: "SFMarketTrends",
      title: "San Francisco Real Estate Market Trends",
    },
    answer:
      "Here's the latest SF market data: median prices up 3.2% YoY, etc. Would you like more neighborhood details?",
  },
  {
    question: "What are the best neighborhoods for families?",
    artifactType: "map",
    artifactData: {
      title: "Family-Friendly Neighborhoods",
      centerLat: 37.7749,
      centerLng: -122.4194,
      zoom: 12,
      markers: [
        {
          name: "Noe Valley",
          lat: 37.7502,
          lng: -122.4337,
          score: 8.5,
        },
        {
          name: "West Portal",
          lat: 37.7405,
          lng: -122.4663,
          score: 8.3,
        },
      ],
    },
    answer:
      "Family-friendly picks include Noe Valley, West Portal, etc. Each area offers good schools and walkability.",
  },
  {
    question: "How much house can I afford with $200,000 annual income?",
    artifactType: "calculator",
    artifactData: {
      title: "Home Affordability Calculator",
      income: 200000,
      downPayment: 300000,
      monthlyDebts: 2000,
      interestRate: 5.8,
      propertyTax: 1.2,
      insurance: 0.5,
      results: {
        maxPurchasePrice: 1250000,
        monthlyPayment: 7850,
        breakdownChart: true,
      },
    },
    answer:
      "With $200k income, you could afford around $1.25M, monthly payment ~$7,850. This depends on exact rates, though!",
  },
];

// Define types for demo state and actions
interface DemoState {
  isRunning: boolean;
  messages: any[];
  currentStep: number;
  isTyping: boolean;
  progress: number;
  currentArtifact: any;
}

type DemoAction =
  | { type: "START_DEMO"; selectedAgent: string }
  | { type: "STOP_DEMO" }
  | { type: "ADD_USER_MESSAGE"; message: any }
  | { type: "ADD_AGENT_MESSAGE"; message: any };

// Demo mode reducer to manage demo state
function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "START_DEMO":
      return {
        ...state,
        isRunning: true,
        messages: [
          {
            id: Date.now(),
            role: "agent",
            agentId: action.selectedAgent,
            content:
              "Welcome to the Interactive Demo! I'll share some SF real estate steps with artifacts. Enjoy!",
            timestamp: new Date(),
          },
        ],
        currentStep: 0,
        isTyping: false,
        progress: 0,
        currentArtifact: null,
      };
    case "STOP_DEMO":
      return {
        ...state,
        isRunning: false,
        currentArtifact: null,
      };
    case "ADD_USER_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.message],
        isTyping: true,
        progress: ((state.currentStep + 0.4) / artifactSteps.length) * 100,
      };
    case "ADD_AGENT_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.message],
        isTyping: false,
        currentStep: state.currentStep + 1,
        currentArtifact: action.message,
        progress: ((state.currentStep + 1) / artifactSteps.length) * 100,
      };
    default:
      return state;
  }
}

// Render custom or normal artifact based on type
function EnhancedArtifactRenderer({ type, data }: { type: string; data: any }) {
  if (type === "custom-react") {
    if (data.componentType === "SFMarketTrends") {
      return <SFMarketTrends />;
    }
    return null;
  }
  return <ArtifactRenderer type={type} data={data} />;
}

export default function Core() {
  // Define available agents
  const agents = [
    {
      id: "firstTimeBuyer",
      name: "First-Time Buyer Guide",
      icon: "brain",
      description: "Helps new buyers navigate the market",
    },
    {
      id: "luxuryAgent",
      name: "Luxury Property Agent",
      icon: "star",
      description: "Focuses on high-end real estate",
    },
    {
      id: "investorAgent",
      name: "Investment Advisor",
      icon: "dollarSign",
      description: "Analyzes ROI on properties",
    },
    {
      id: "neighborhoodExpert",
      name: "Neighborhood Expert",
      icon: "building",
      description: "Deep knowledge of local SF districts",
    },
  ];

  // Demo mode state using reducer
  const [demoState, dispatchDemo] = useReducer(demoReducer, {
    isRunning: false,
    messages: [],
    currentStep: 0,
    isTyping: false,
    progress: 0,
    currentArtifact: null,
  });

  // Main component state
  const [selectedAgent, setSelectedAgent] = useState("firstTimeBuyer");
  const [messages, setMessages] = useState([
    {
      id: 123,
      role: "agent",
      agentId: "firstTimeBuyer",
      content:
        "Hi! I'm your First-Time Buyer Guide. Ask me about SF real estate, neighborhoods, or mortgages.",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [newestMessageId, setNewestMessageId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [selectedQuestionCategory, setSelectedQuestionCategory] =
    useState("all");
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  // Refs for non-triggering re-renders
  const inputRef = useRef(input);
  const isLoadingRef = useRef(isLoading);
  const selectedAgentRef = useRef(selectedAgent);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const demoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const responseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const artifactTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    inputRef.current = input;
    isLoadingRef.current = isLoading;
    selectedAgentRef.current = selectedAgent;
  }, [input, isLoading, selectedAgent]);

  // Artifact panel state
  const [artifactState, setArtifactState] = useState({
    activeArtifact: null,
    showPanel: false,
    isFullScreen: false,
    minimizeChat: false,
  });

  const updateArtifactState = useCallback((updates) => {
    setArtifactState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Determine messages to display (demo vs normal)
  const displayMessages = demoState.isRunning ? demoState.messages : messages;

  // Get suggested questions for the selected category
  const suggestedQuestions = getSuggestedQuestions(selectedQuestionCategory);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (demoTimerRef.current) clearTimeout(demoTimerRef.current);
      if (responseTimerRef.current) clearTimeout(responseTimerRef.current);
      if (artifactTimerRef.current) clearTimeout(artifactTimerRef.current);
    };
  }, []);

  // Demo step processor
  useEffect(() => {
    if (
      !demoState.isRunning ||
      demoState.isTyping ||
      demoState.currentStep >= artifactSteps.length
    ) {
      return;
    }

    demoTimerRef.current = setTimeout(() => {
      const step = artifactSteps[demoState.currentStep];
      const userMsg = {
        id: Date.now(),
        role: "user",
        content: step.question,
        timestamp: new Date(),
      };
      dispatchDemo({ type: "ADD_USER_MESSAGE", message: userMsg });

      responseTimerRef.current = setTimeout(() => {
        if (!demoState.isRunning) return;
        const agentMsg = {
          id: Date.now() + 1,
          role: "agent",
          agentId: selectedAgentRef.current,
          artifactType: step.artifactType,
          artifactData: step.artifactData,
          content: step.answer,
          timestamp: new Date(),
        };
        dispatchDemo({ type: "ADD_AGENT_MESSAGE", message: agentMsg });
      }, 2000);
    }, 3000);

    return () => {
      if (demoTimerRef.current) clearTimeout(demoTimerRef.current);
      if (responseTimerRef.current) clearTimeout(responseTimerRef.current);
    };
  }, [demoState.isRunning, demoState.currentStep, demoState.isTyping]);

  // Handle demo artifact display
  useEffect(() => {
    if (!demoState.isRunning || !demoState.currentArtifact) return;
    artifactTimerRef.current = setTimeout(() => {
      updateArtifactState({
        activeArtifact: demoState.currentArtifact,
        showPanel: true,
        minimizeChat: true,
      });
    }, 100);
    return () => {
      if (artifactTimerRef.current) clearTimeout(artifactTimerRef.current);
    };
  }, [demoState.currentArtifact, demoState.isRunning, updateArtifactState]);

  // Find answer from question data
  const getAnswerFromQuestionsData = useCallback((userInput) => {
    const normalized = userInput.toLowerCase().trim();
    return questionsData.find((q) =>
      q.question.toLowerCase().includes(normalized),
    );
  }, []);

  // Simulate AI response
  const simulateResponse = useCallback(
    (userMessage: string) => {
      if (isLoadingRef.current || demoState.isRunning) return;
      setIsLoading(true);
      isLoadingRef.current = true;
      const matched = getAnswerFromQuestionsData(userMessage);
      responseTimerRef.current = setTimeout(() => {
        const newId = Date.now();
        let response: any = {
          id: newId,
          role: "agent",
          agentId: selectedAgentRef.current,
          content: "",
          timestamp: new Date(),
        };
        if (matched) {
          response.content = matched.answer;
          if (matched.artifactType && matched.artifactData) {
            response.artifactType = matched.artifactType;
            response.artifactData = matched.artifactData;
            artifactTimerRef.current = setTimeout(() => {
              updateArtifactState({
                activeArtifact: response,
                showPanel: true,
                minimizeChat: true,
              });
            }, 800);
          }
        } else {
          response.content = `I don't have specific info about "${userMessage}". Are you curious about neighborhoods, mortgages, or something else?`;
        }
        setMessages((prev) => [...prev, response]);
        setNewestMessageId(newId);
        setIsLoading(false);
        isLoadingRef.current = false;
        setShowSuggestions(true);
      }, 1500);
    },
    [getAnswerFromQuestionsData, updateArtifactState, demoState.isRunning],
  );

  // Handle user form submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (
        !inputRef.current.trim() ||
        isLoadingRef.current ||
        demoState.isRunning
      )
        return;
      const userMsg = {
        id: Date.now(),
        role: "user",
        content: inputRef.current.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setShowSuggestions(false);
      simulateResponse(userMsg.content);
    },
    [simulateResponse, demoState.isRunning],
  );

  // Handle suggested question selection
  const handleSuggestedQuestion = useCallback(
    (question: string) => {
      if (!question.trim() || isLoadingRef.current || demoState.isRunning)
        return;
      const userMsg = {
        id: Date.now(),
        role: "user",
        content: question,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setShowSuggestions(false);
      simulateResponse(question);
    },
    [simulateResponse, demoState.isRunning],
  );

  // Handle agent selection
  const handleSelectAgent = useCallback(
    (agentId: string) => {
      setSelectedAgent(agentId);
      selectedAgentRef.current = agentId;
      const agent = agents.find((a) => a.id === agentId);
      if (agent) {
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
          content: `Hello! I'm your ${agent.name}. How can I assist?`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, sysMsg, greetMsg]);
      }
    },
    [agents],
  );

  // Handle artifact view from a message
  const handleArtifactView = useCallback(
    (message: any) => {
      updateArtifactState({
        activeArtifact: message,
        showPanel: true,
        minimizeChat: true,
      });
    },
    [updateArtifactState],
  );

  // Toggle artifact fullscreen
  const toggleArtifactFullScreen = useCallback(() => {
    updateArtifactState((prev) => ({
      ...prev,
      isFullScreen: !prev.isFullScreen,
      minimizeChat: true,
    }));
  }, [updateArtifactState]);

  // Toggle chat visibility
  const toggleChatVisibility = useCallback(() => {
    updateArtifactState((prev) => ({
      ...prev,
      minimizeChat: !prev.minimizeChat,
    }));
  }, [updateArtifactState]);

  // Close artifact panel
  const closeArtifactPanel = useCallback(() => {
    updateArtifactState({
      showPanel: false,
      isFullScreen: false,
      minimizeChat: false,
    });
  }, [updateArtifactState]);

  // Toggle demo mode
  const toggleDemo = useCallback(() => {
    if (demoState.isRunning) {
      dispatchDemo({ type: "STOP_DEMO" });
    } else {
      dispatchDemo({
        type: "START_DEMO",
        selectedAgent: selectedAgentRef.current,
      });
    }
  }, [demoState.isRunning]);

  // Global keyboard shortcut for Command+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Animation variants for artifact panel and chat section
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
      width: artifactState.showPanel ? "40%" : "100%",
      opacity: 1,
      x: 0,
    },
    minimized: {
      width: "40%",
      opacity: 0.8,
      x: 0,
    },
  };

  const { activeArtifact, showPanel, isFullScreen, minimizeChat } =
    artifactState;

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

      {/* Demo Progress Bar */}
      <AnimatePresence>
        {demoState.isRunning && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50"
          >
            <motion.div
              className="h-full bg-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${demoState.progress}%` }}
              transition={{ type: "spring", damping: 30 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Mode Toggle Button */}
      <motion.button
        onClick={toggleDemo}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed top-4 right-4 z-10 px-4 py-2 rounded-lg text-sm font-medium shadow-md flex items-center gap-2 ${
          demoState.isRunning
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900"
        }`}
      >
        {demoState.isRunning ? (
          <>
            <X className="w-4 h-4" /> Stop Demo
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" /> Interactive Demo
          </>
        )}
      </motion.button>

      {/* Main Layout */}
      <div className="flex-1 flex h-full w-full overflow-hidden">
        {/* Chat Section (Left Side) */}
        <motion.div
          initial="normal"
          animate={
            !showPanel ? "normal" : minimizeChat ? "minimized" : "normal"
          }
          variants={chatSectionVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="h-full flex flex-col relative overflow-y-auto"
        >
          <div className="flex-1 overflow-y-auto">
            <ChatSection
              messages={displayMessages}
              agents={agents}
              selectedAgent={selectedAgent}
              newestMessageId={newestMessageId}
              isLoading={isLoading}
              isDemoTyping={demoState.isTyping}
              onArtifactView={handleArtifactView}
              messagesEndRef={messagesEndRef}
              showSuggestions={showSuggestions}
              selectedQuestionCategory={selectedQuestionCategory}
              onCategorySelect={setSelectedQuestionCategory}
              suggestedQuestions={suggestedQuestions}
              onSuggestedQuestion={handleSuggestedQuestion}
              questionCategories={questionCategories}
              isDemoRunning={demoState.isRunning}
            />
          </div>

          <ChatInteraction
            input={input}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isDemoRunning={demoState.isRunning}
            isHomeSearchMode={true}
            selectedAgent={selectedAgent}
            agents={agents}
            onSelectAgent={handleSelectAgent}
            onOpenCommandPalette={() => setShowCommandPalette(true)}
          />

          {showPanel && (
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

        {/* Artifact Panel (Right Sidebar) */}
        <AnimatePresence>
          {showPanel && activeArtifact && (
            <motion.div
              initial="hidden"
              animate={isFullScreen ? "fullscreen" : "visible"}
              exit="exit"
              variants={artifactPanelVariants}
              className={`bg-white border-l border-gray-200 flex flex-col overflow-hidden z-20 shadow-xl ${
                isFullScreen ? "fixed inset-0" : "flex-1"
              }`}
            >
              {/* Artifact Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 border-b border-blue-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {activeArtifact.artifactType === "custom-react" ? (
                    <LineChartIcon className="w-5 h-5 text-blue-200" />
                  ) : (
                    React.createElement(
                      getArtifactIcon(activeArtifact.artifactType),
                      {
                        className: "w-5 h-5 text-blue-200",
                      },
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
                    title={isFullScreen ? "Exit fullscreen" : "Fullscreen"}
                  >
                    {isFullScreen ? (
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

              {/* Artifact Content */}
              <div className="flex-1 overflow-auto">
                <div className="p-4 h-full">
                  <EnhancedArtifactRenderer
                    key={activeArtifact.id}
                    type={activeArtifact.artifactType}
                    data={activeArtifact.artifactData}
                  />
                </div>
              </div>

              {/* Artifact Footer */}
              <div className="p-3 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                <div className="text-xs text-gray-500 flex items-center gap-1.5">
                  <Info className="w-3 h-3" />
                  <span>Data based on SF MLS stats</span>
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

      {/* Floating Artifact Toggle Button */}
      <AnimatePresence>
        {activeArtifact && !showPanel && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => updateArtifactState({ showPanel: true })}
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
