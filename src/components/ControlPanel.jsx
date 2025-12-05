import { motion } from "framer-motion";
import {
  Lightbulb,
  Music,
  Heart,
  Mail,
  Cake,
  Gift,
  Image,
  MessageCircle,
  Sparkles,
  Star,
} from "lucide-react";

const ControlPanel = ({ steps, currentStep, goToStep, completedSteps }) => {
  // Enhanced steps icon mapping
  const getStepIcon = (stepIndex, stepName, stepId) => {
    const iconMap = {
      lights: Lightbulb,
      music: Music,
      balloons: Heart,
      card: Mail,
      cake3d: Cake,
      gifts: Gift,
      pictures: Image,
      typewriter: MessageCircle,
      message: MessageCircle,
      finale: Sparkles,
    };

    // Map by step ID first (most specific)
    if (stepId && iconMap[stepId]) {
      return iconMap[stepId];
    }

    // Fallback by name keywords
    const nameMap = {
      đèn: Lightbulb,
      lights: Lightbulb,
      nhạc: Music,
      music: Music,
      "bóng bay": Heart,
      balloons: Heart,
      thiệp: Mail,
      card: Mail,
      "bánh kem": Cake,
      cake: Cake,
      quà: Gift,
      gift: Gift,
      ảnh: Image,
      picture: Image,
      image: Image,
      "lời chúc": MessageCircle,
      message: MessageCircle,
      typewriter: MessageCircle,
      "hết òi": Sparkles,
      finale: Sparkles,
      sparkles: Sparkles,
    };

    const lowerName = stepName?.toLowerCase() || "";
    for (const [keyword, Icon] of Object.entries(nameMap)) {
      if (lowerName.includes(keyword)) {
        return Icon;
      }
    }

    // Final fallback
    return Star;
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-2 md:bottom-6 left-[50%] z-40 !transform -translate-x-1/2"
    >
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg md:rounded-xl p-1.5 md:p-2">
        {/* Mobile: Scrollable horizontal layout with icons */}
        <div className="flex md:hidden overflow-x-auto scrollbar-hide gap-1 pb-0.5 max-w-64">
          {steps.slice(1).map((step, index) => {
            const stepIndex = index + 1;
            const isCompleted = completedSteps.has(stepIndex);
            const isCurrent = currentStep === stepIndex;
            const IconComponent = getStepIcon(stepIndex, step.name, step.id);

            return (
              <motion.button
                key={step.id}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToStep(stepIndex)}
                disabled={!isCompleted && stepIndex > currentStep + 1}
                className={`
                  flex-shrink-0 w-8 h-8 rounded-md font-medium transition-all duration-300 flex items-center justify-center text-xs
                  ${
                    isCurrent
                      ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                      : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-600 text-gray-300"
                  }
                  ${
                    stepIndex <= currentStep + 1
                      ? "hover:bg-purple-700 cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }
                `}
              >
                <IconComponent size={14} strokeWidth={2.5} />
              </motion.button>
            );
          })}
        </div>

        {/* Desktop: Compact wrap layout with text */}
        <div className="hidden md:flex flex-wrap justify-center gap-1.5 max-w-2xl">
          {steps.slice(1).map((step, index) => {
            const stepIndex = index + 1;
            const isCompleted = completedSteps.has(stepIndex);
            const isCurrent = currentStep === stepIndex;

            return (
              <motion.button
                key={step.id}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToStep(stepIndex)}
                disabled={!isCompleted && stepIndex > currentStep + 1}
                className={`
                  px-2 py-1.5 rounded-md font-medium transition-all duration-300 flex items-center space-x-1.5 text-xs
                  ${
                    isCurrent
                      ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                      : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-600 text-gray-300"
                  }
                  ${
                    stepIndex <= currentStep + 1
                      ? "hover:bg-purple-700 cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }
                `}
              >
                <span className="whitespace-nowrap text-xs">{step.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Mobile step indicator - smaller */}
        <div className="flex md:hidden justify-center mt-1">
          <div className="flex space-x-0.5">
            {steps.slice(1).map((_, index) => {
              const stepIndex = index + 1;
              const isCompleted = completedSteps.has(stepIndex);
              const isCurrent = currentStep === stepIndex;

              return (
                <div
                  key={index}
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${
                    isCurrent
                      ? "bg-purple-400 scale-125"
                      : isCompleted
                      ? "bg-green-400"
                      : "bg-gray-500"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ControlPanel;
