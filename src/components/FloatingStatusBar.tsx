// src/components/FloatingStatusBar.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";

interface FloatingStatusBarProps {
  message: string;
}

export default function FloatingStatusBar({ message }: FloatingStatusBarProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
