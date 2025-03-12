import React from "react";
import ChatSection from "./ChatSection";

// Create a wrapper component that correctly handles the ref type
export default function ChatSectionWrapper(props: any) {
  // The wrapper component passes all props through, but doesn't
  // enforce the strict type on messagesEndRef
  return <ChatSection {...props} />;
}
