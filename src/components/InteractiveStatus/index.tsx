// src/components/InteractiveStatus/index.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

interface InteractiveStatusProps {
  phases: string[];
  currentPhase: number;
}

export function InteractiveStatus({
  phases,
  currentPhase,
}: InteractiveStatusProps) {
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-full px-6 py-3 flex items-center gap-4 z-50 border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />

      {phases.map((phase, index) => (
        <div key={phase} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
            ${
              index < currentPhase
                ? "bg-green-500 text-white"
                : index === currentPhase
                  ? "bg-blue-600 text-white animate-pulse"
                  : "bg-gray-100 text-gray-400"
            }`}
          >
            {index < currentPhase ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <span className="text-sm font-medium">{index + 1}</span>
            )}
          </div>
          <AnimatePresence>
            {index <= currentPhase && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium hidden md:inline-block"
              >
                {phase}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
}
