import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Users,
  Hotel,
  LineChart,
  Home as HomeIcon,
  Palmtree,
  Leaf,
  Briefcase,
  Sparkles,
  ArrowRight,
  Brain,
  Zap,
  MessageSquare,
  ChevronDown,
} from "lucide-react";

interface AgentPersonaProps {
  onComplete: (data: {
    city: string;
    state: string;
    expertise: string[];
  }) => void;
}

const CITIES = [
  {
    id: "san-francisco--ca",
    name: "San Francisco",
    state: "CA",
    icon: "🌉",
    description: "Tech hub with iconic views",
  },
  {
    id: "new-york--ny",
    name: "New York",
    state: "NY",
    icon: "🗽",
    description: "The city that never sleeps",
  },
  {
    id: "miami--fl",
    name: "Miami",
    state: "FL",
    icon: "🌴",
    description: "Tropical paradise living",
  },
];

const EXPERTISE_TYPES = [
  {
    id: "firstTimeBuyer",
    title: "First-Time Buyer Guide",
    icon: BookOpen,
    description: "Expert in guiding first-time homebuyers through the process",
  },
  {
    id: "familyFocused",
    title: "Family-Focused Specialist",
    icon: Users,
    description: "Focuses on family-friendly properties and communities",
  },
  {
    id: "luxuryMarket",
    title: "Luxury Market Expert",
    icon: Hotel,
    description: "Specialized in high-end properties and exclusive areas",
  },
  {
    id: "investmentAnalyst",
    title: "Investment Analyst",
    icon: LineChart,
    description: "Focuses on ROI and investment opportunities",
  },
  {
    id: "downsizing",
    title: "Downsizing Specialist",
    icon: HomeIcon,
    description: "Expert in retirement and downsizing options",
  },
  {
    id: "vacationProperty",
    title: "Vacation Property Advisor",
    icon: Palmtree,
    description: "Specialized in vacation homes and rental properties",
  },
  {
    id: "sustainability",
    title: "Sustainability Expert",
    icon: Leaf,
    description: "Focused on eco-friendly and sustainable properties",
  },
  {
    id: "professionalFocus",
    title: "Professional Living Expert",
    icon: Briefcase,
    description: "Specializes in properties ideal for working professionals",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function AgentPersona({ onComplete }: AgentPersonaProps) {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const configSectionRef = useRef<HTMLDivElement>(null);

  const isReady = selectedCity && selectedExpertise.length > 0;

  const handleToggleExpertise = (expertiseId: string) => {
    setSelectedExpertise((prev) =>
      prev.includes(expertiseId)
        ? prev.filter((id) => id !== expertiseId)
        : [...prev, expertiseId],
    );
  };

  const handleStartJourney = () => {
    setShowWelcome(false);
    setTimeout(() => {
      configSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleNext = async () => {
    if (!isReady) return;
    setIsLoading(true);

    // Add button animation here
    try {
      const location = selectedCity.split("--");
      onComplete({
        city: location[0],
        state: location[1].toUpperCase(),
        expertise: selectedExpertise,
      });
    } catch (err) {
      console.error("Error in AgentPersona handleNext:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-indigo-50">
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-indigo-900"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-lg mx-auto text-center text-white p-8"
            >
              <motion.div variants={itemVariants} className="mb-8 relative">
                <div className="w-24 h-24 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Brain className="w-12 h-12" />
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-blue-400/30 blur-xl"
                />
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl font-bold mb-4"
              >
                Meet Agent Neo
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl text-blue-100 mb-8"
              >
                Your AI-powered real estate companion, ready to find your
                perfect home using advanced machine learning and local market
                expertise.
              </motion.p>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-3 gap-4 mb-8"
              >
                {[
                  { icon: Brain, text: "AI-Powered" },
                  { icon: Zap, text: "Fast Results" },
                  { icon: MessageSquare, text: "24/7 Support" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                  >
                    <item.icon className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartJourney}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  Start Your Journey <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChevronDown className="w-6 h-6 text-white/60" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="config"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-12"
            ref={configSectionRef}
          >
            <motion.div className="w-full max-w-4xl mx-4 bg-white rounded-xl shadow-[0_0_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100">
              <motion.div
                className="p-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-4 mb-8"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center relative">
                    <Brain className="w-6 h-6 text-white" />
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 rounded-xl bg-blue-400 blur-xl"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Configure Agent Neo
                    </h1>
                    <p className="text-gray-600">
                      Customize your AI assistant's expertise
                    </p>
                  </div>
                </motion.div>

                {/* City Selection */}
                <motion.div
                  variants={containerVariants}
                  className="space-y-8 mb-8"
                >
                  <motion.div variants={itemVariants}>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Where are you looking to buy?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {CITIES.map((city) => (
                        <motion.div
                          key={city.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedCity(city.id)}
                          className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg ${
                            selectedCity === city.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <div className="text-4xl mb-3">{city.icon}</div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {city.name}, {city.state}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {city.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Expertise Section */}
                  <motion.div variants={itemVariants}>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      Enhance Agent Neo's Capabilities
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">
                      Select specializations to customize your experience
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {EXPERTISE_TYPES.map((exp) => {
                        const Icon = exp.icon;
                        const isSelected = selectedExpertise.includes(exp.id);

                        return (
                          <motion.div
                            key={exp.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleToggleExpertise(exp.id)}
                            className={`rounded-xl p-4 border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                              isSelected
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center relative ${
                                  isSelected
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                <Icon className="w-6 h-6" />
                                {isSelected && (
                                  <motion.div
                                    animate={{
                                      scale: [1, 1.2, 1],
                                      opacity: [0.3, 0.6, 0.3],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 rounded-xl bg-blue-400 blur-lg"
                                  />
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">
                                  {exp.title}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  {exp.description}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-end border-t pt-6"
                >
                  <motion.button
                    whileHover={isReady && !isLoading ? { scale: 1.02 } : {}}
                    whileTap={isReady && !isLoading ? { scale: 0.98 } : {}}
                    disabled={!isReady || isLoading}
                    onClick={handleNext}
                    className={`
                      inline-flex items-center px-8 py-3 text-white
                      bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-medium text-lg gap-2
                      transition-all duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed
                      shadow-xl hover:shadow-2xl
                      relative overflow-hidden
                    `}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Sparkles className="w-5 h-5" />
                          </motion.div>
                          Initializing Agent Neo...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Activate Agent Neo
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </span>
                    {!isLoading && (
                      <motion.div
                        className="absolute inset-0 bg-indigo-400 opacity-20"
                        animate={{
                          scale: [1, 1.5],
                          opacity: [0.2, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
