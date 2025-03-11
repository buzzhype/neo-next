// src/components/OnboardingContainer/index.tsx
import React from "react";

interface OnboardingContainerProps {
  title: string;
  subtitle?: React.ReactNode; // Change this from string to React.ReactNode
  children: React.ReactNode;
}

const OnboardingContainer: React.FC<OnboardingContainerProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      {subtitle && <div className="text-lg text-gray-600 mb-6">{subtitle}</div>}
      <div>{children}</div>
    </div>
  );
};

export default OnboardingContainer;
