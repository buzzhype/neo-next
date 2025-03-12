"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Clock,
  MoreHorizontal,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Bot,
} from "lucide-react";
import { getArtifactIcon } from "./ArtifactRenderer";

interface MessageBubbleProps {
  message: any;
  agents: any[];
  isLastMessage: boolean;
  isTyping?: boolean;
  onArtifactView?: (artifact: any) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  agents,
  isLastMessage,
  isTyping = false,
  onArtifactView,
}) => {
  // State management
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [formattedTime, setFormattedTime] = useState("");

  // Determine message type
  const isUser = message.role === "user";
  const isSystem = message.role === "system";
  const agent = agents.find((a) => a.id === message.agentId) || agents[0];
  const hasArtifact = !isUser && message.artifactType && message.artifactData;

  // Format timestamp
  useEffect(() => {
    if (message.timestamp) {
      setFormattedTime(
        new Date(message.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }
  }, [message.timestamp]);

  // Get appropriate artifact icon if exists
  let ArtifactIconComponent = null;
  if (hasArtifact) {
    ArtifactIconComponent = getArtifactIcon(message.artifactType);
  }

  // Action handlers
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleFeedback = (type: "like" | "dislike") => {
    setFeedbackGiven(type);
    setShowFeedback(false);
    console.log(`User ${type}d message:`, message.id);
  };

  // System message
  if (isSystem) {
    return (
      <div className="inline-block mx-auto my-0.5 px-1.5 py-0.5 bg-gray-100 text-xs text-gray-500 rounded">
        {message.content}
      </div>
    );
  }

  // Regular message
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-0.5`}>
      <div
        className={`max-w-[94%] ${isUser ? "order-1" : "order-0"} relative group`}
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => {
          setShowOptions(false);
          if (!feedbackGiven) setShowFeedback(false);
        }}
      >
        <div className="flex items-start gap-1.5">
          {/* Small Avatar - only show for first message in a sequence */}
          {!isUser && (
            <div className="w-5 h-5 rounded-full flex-shrink-0 bg-blue-100 mt-1 flex items-center justify-center">
              <Bot className="w-2.5 h-2.5 text-blue-600" />
            </div>
          )}

          <div className="space-y-0 flex-1 min-w-0">
            {/* Agent name as tiny text above bubble */}
            {!isUser && (
              <div className="text-[9px] text-gray-500 leading-tight flex items-center gap-1 mb-0.5">
                <span className="font-medium truncate max-w-[120px]">
                  {agent?.name || "AI Assistant"}
                </span>
                {formattedTime && (
                  <>
                    <span className="mx-0.5">•</span>
                    <span className="flex items-center">
                      <Clock className="w-1.5 h-1.5 inline mr-0.5" />
                      {formattedTime}
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Ultra-compact message bubble */}
            <div
              className={`px-2 py-1 rounded ${
                isUser
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-800"
              }`}
            >
              <div className="text-xs leading-tight">
                {message.content
                  .split("\n")
                  .map((line: string, idx: number) => (
                    <p
                      key={idx}
                      className={`${line.trim() === "" ? "h-0.5" : ""} ${idx > 0 ? "mt-0.5" : ""}`}
                    >
                      {line}
                    </p>
                  ))}
              </div>
            </div>

            {/* Inline artifact chip */}
            {hasArtifact && (
              <button
                className="flex items-center mt-0.5 rounded border border-blue-100 bg-blue-50 overflow-hidden w-full hover:bg-blue-100 transition-colors"
                onClick={() => onArtifactView && onArtifactView(message)}
              >
                <div className="p-1 bg-blue-600 flex items-center justify-center">
                  {ArtifactIconComponent && (
                    <ArtifactIconComponent className="w-2.5 h-2.5 text-white" />
                  )}
                </div>
                <div className="px-1.5 py-0.5 flex-1 flex justify-between items-center">
                  <span className="text-[10px] font-medium text-blue-700 truncate">
                    {message.artifactData?.title ||
                      message.artifactType.charAt(0).toUpperCase() +
                        message.artifactType.slice(1)}
                  </span>
                  <Eye className="w-2.5 h-2.5 text-blue-500 ml-1 flex-shrink-0" />
                </div>
              </button>
            )}

            {/* User message timestamp - right aligned, tiny */}
            {isUser && formattedTime && (
              <div className="flex justify-end">
                <span className="text-[8px] text-gray-400 flex items-center mt-0.5">
                  <Clock className="w-1.5 h-1.5 mr-0.5" />
                  {formattedTime}
                </span>
              </div>
            )}
          </div>

          {/* User Avatar - tiny */}
          {isUser && (
            <div className="w-5 h-5 rounded-full flex-shrink-0 bg-blue-600 mt-1 flex items-center justify-center">
              <User className="w-2.5 h-2.5 text-white" />
            </div>
          )}
        </div>

        {/* Minimalist action buttons */}
        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute ${
                isUser ? "-left-7 top-1" : "-right-7 top-5"
              } flex bg-white rounded shadow-sm border border-gray-200 overflow-hidden`}
            >
              <button
                onClick={() => {
                  setShowFeedback(!showFeedback);
                  if (feedbackGiven) setFeedbackGiven(null);
                }}
                className="p-0.5 hover:bg-gray-50"
                title="Feedback"
              >
                {feedbackGiven === "like" ? (
                  <ThumbsUp className="w-2.5 h-2.5 text-green-500" />
                ) : feedbackGiven === "dislike" ? (
                  <ThumbsDown className="w-2.5 h-2.5 text-red-500" />
                ) : (
                  <MoreHorizontal className="w-2.5 h-2.5 text-gray-500" />
                )}
              </button>
              <button
                onClick={copyToClipboard}
                className="p-0.5 border-l border-gray-200 hover:bg-gray-50"
                title="Copy"
              >
                {isCopied ? (
                  <Check className="w-2.5 h-2.5 text-green-500" />
                ) : (
                  <Copy className="w-2.5 h-2.5 text-gray-500" />
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Micro feedback popover */}
        <AnimatePresence>
          {showFeedback && !feedbackGiven && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute ${
                isUser ? "-left-14 top-1" : "-right-14 top-5"
              } flex bg-white rounded border border-gray-200 p-0.5 shadow-sm z-20`}
            >
              <button
                onClick={() => handleFeedback("like")}
                className="p-0.5 rounded hover:bg-green-50 text-gray-500 hover:text-green-600"
                title="Helpful"
              >
                <ThumbsUp className="w-2.5 h-2.5" />
              </button>
              <button
                onClick={() => handleFeedback("dislike")}
                className="p-0.5 rounded hover:bg-red-50 text-gray-500 hover:text-red-600"
                title="Not helpful"
              >
                <ThumbsDown className="w-2.5 h-2.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MessageBubble;
