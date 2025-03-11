"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  Bot,
  User,
  Send,
  ArrowRight,
  MapPin,
  Home,
  DollarSign,
  Building2,
  RefreshCw,
} from "lucide-react";

// A single message in the conversation
interface Message {
  role: "assistant" | "user";
  content: string;
}

// Example user profile interface
interface UserProfile {
  agentType: {
    city: string;
    expertise: string[];
  };
  locationPreferences: {
    priceRange: {
      min: number;
      max: number;
    };
    selectedFeatures: string[];
  };
  homePreferences: {
    propertyType: string;
    beds: string;
    baths: string;
    squareFeet: string;
  };
  selectedNeighborhoods: any[];
  threadId?: string;
}

interface SuggestionTopic {
  icon: any;
  title: string;
  prompt: string;
}

export default function AgentNeoPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Quick Topics
  const suggestionTopics: SuggestionTopic[] = [
    {
      icon: Building2,
      title: "Neighborhood Analysis",
      prompt:
        "Can you provide a detailed analysis of my recommended neighborhoods, focusing on why they match my preferences?",
    },
    {
      icon: DollarSign,
      title: "Price Insights",
      prompt:
        "Based on my budget and preferences, what are the price trends and market conditions in my target neighborhoods?",
    },
    {
      icon: MapPin,
      title: "Location Benefits",
      prompt:
        "What are the unique advantages of each recommended neighborhood in terms of lifestyle, amenities, and community?",
    },
    {
      icon: Home,
      title: "Property Recommendations",
      prompt:
        "Given my preferences for a property with the specified beds and baths, what specific properties should I look out for?",
    },
  ];

  // Load user profile & create initial message
  useEffect(() => {
    initializeChat();
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const initializeChat = async () => {
    try {
      const stored = localStorage.getItem("agentNeoUserProfile");
      if (!stored) {
        setError("Please complete onboarding first");
        setIsLoading(false);
        return;
      }

      const profile = JSON.parse(stored);
      setUserProfile(profile);

      // Check if threadId exists in the profile
      if (profile.threadId) {
        setThreadId(profile.threadId);
      } else {
        // Create a new thread if one doesn't exist
        const threadResponse = await createChatThread(profile);
        if (threadResponse && threadResponse.threadId) {
          setThreadId(threadResponse.threadId);

          // Save threadId back to localStorage
          const updatedProfile = {
            ...profile,
            threadId: threadResponse.threadId,
          };
          localStorage.setItem(
            "agentNeoUserProfile",
            JSON.stringify(updatedProfile),
          );
        }
      }

      // Set welcome message
      const welcomeMessage = {
        role: "assistant" as const,
        content: createWelcomeMessage(profile),
      };

      setMessages([welcomeMessage]);
    } catch (err) {
      console.error("Initialize chat error:", err);
      setError("Failed to initialize chat");
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new thread with the user's profile data
  const createChatThread = async (profile: UserProfile) => {
    try {
      const response = await fetch("/api/agent/create-thread", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: profile.agentType.city,
          expertise: profile.agentType.expertise,
          preferences: {
            location: profile.locationPreferences,
            home: profile.homePreferences,
            neighborhoods: profile.selectedNeighborhoods,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create thread: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating chat thread:", error);
      throw error;
    }
  };

  const createWelcomeMessage = (profile: UserProfile): string => {
    const cityDisplay = profile.agentType.city;
    const priceRange = `$${profile.locationPreferences.priceRange.min.toLocaleString()} - $${profile.locationPreferences.priceRange.max.toLocaleString()}`;
    const propertyType = profile.homePreferences.propertyType.toLowerCase();

    return `Hello! I'm your AI real estate assistant, and I have a detailed understanding of your preferences in ${cityDisplay}.

I see you're looking for a ${propertyType} in the ${priceRange} range, and I've analyzed your neighborhood matches and preferences.

Some ways I can help you:
• Provide detailed analysis of your matched neighborhoods
• Compare different areas based on your criteria
• Share insights about property types and market conditions
• Offer recommendations for specific properties
• Answer questions about the home-buying process

What would you like to know about?`;
  };

  // Send user message to /api/agent/chat, handle the assistant reply
  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isSending || !threadId) return;
    setIsSending(true);

    // Add user's new message
    const newMessages = [
      ...messages,
      { role: "user", content: messageContent },
    ];
    setMessages(newMessages);

    // "Thinking..." placeholder
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Thinking..." },
    ]);

    try {
      // Send message to API
      const response = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threadId: threadId,
          message: messageContent,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error from server: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Get the assistant's content from the response
      // Note: The API returns response.response
      const assistantContent = data.response;

      // Replace "Thinking..." with final text
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: assistantContent },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          content: "I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  // Button click or Enter key
  const handleSendMessage = async () => {
    await sendMessage(input);
    setInput("");
  };

  const handleQuickTopicClick = async (prompt: string) => {
    setInput("");
    await sendMessage(prompt);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/onboarding")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Complete Onboarding
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-3">Your Profile</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>{userProfile?.agentType.city}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  <span>
                    $
                    {userProfile?.locationPreferences.priceRange.min.toLocaleString()}
                    -$
                    {userProfile?.locationPreferences.priceRange.max.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Home className="w-4 h-4 text-blue-600" />
                  <span>{userProfile?.homePreferences.propertyType}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push("/onboarding/success")}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Return to Summary
            </button>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm flex flex-col h-[calc(100vh-2rem)]">
              {/* Header */}
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  AI Real Estate Assistant
                </h2>
                <p className="text-sm text-gray-600">
                  Ask about neighborhoods, properties, or get personalized
                  recommendations
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-3 ${
                      message.role === "assistant"
                        ? "items-start"
                        : "items-start justify-end"
                    }`}
                  >
                    {/* If assistant, show a Bot icon on the left */}
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-blue-600" />
                      </div>
                    )}

                    <div
                      className={`rounded-lg p-4 max-w-[80%] ${
                        message.role === "assistant"
                          ? "bg-white border shadow-sm"
                          : "bg-blue-600 text-white"
                      } ${
                        message.content === "Thinking..." ? "animate-pulse" : ""
                      }`}
                    >
                      {message.content === "Thinking..." ? (
                        <p className="text-sm animate-pulse">
                          {message.content}
                        </p>
                      ) : message.role === "assistant" ? (
                        <div className="text-sm prose max-w-none">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap text-sm">
                          {message.content}
                        </p>
                      )}
                    </div>

                    {/* If user, show a user icon on the right */}
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Quick Topics if only the welcome message so far */}
                {messages.length === 1 && (
                  <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                    <h3 className="font-medium text-gray-900 mb-3">
                      Quick Topics
                    </h3>
                    <div className="space-y-2">
                      {suggestionTopics.map((topic, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickTopicClick(topic.prompt)}
                          className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <topic.icon className="w-4 h-4 text-blue-600" />
                          <span>{topic.title}</span>
                          <ArrowRight className="w-4 h-4 ml-auto" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Box */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSending}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isSending}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      isSending || !input.trim()
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    {isSending ? "Sending..." : "Send"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
