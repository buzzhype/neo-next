import React from "react";
import ChatSection from "./ChatSection";

// Define proper types for the component props
interface ChatSectionWrapperProps {
  messages: any[];
  agents: any[];
  selectedAgent: string;
  newestMessageId: string | null;
  isLoading: boolean;
  isDemoTyping?: boolean;
  onArtifactView: (msg: any) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  showSuggestions: boolean;
  selectedQuestionCategory: string;
  onCategorySelect: (category: string) => void;
  suggestedQuestions: string[];
  onSuggestedQuestion: (question: string) => void;
  questionCategories: any[];
  isDemoRunning?: boolean;
  forceShowSuggestions?: boolean;
  [key: string]: any; // For any other props that might be passed
}

// Create a wrapper component that correctly handles the forceShowSuggestions prop
export default function ChatSectionWrapper(props: ChatSectionWrapperProps) {
  const { showSuggestions, forceShowSuggestions, ...otherProps } = props;

  // Combine forceShowSuggestions with showSuggestions
  const actuallyShowSuggestions = forceShowSuggestions || showSuggestions;

  // Pass the modified props to ChatSection
  return (
    <ChatSection {...otherProps} showSuggestions={actuallyShowSuggestions} />
  );
}
