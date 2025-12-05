import { useState } from "react";
import {
  Lightbulb,
  Music,
  Heart,
  Cake,
  MessageCircle,
  Sparkles,
  Image,
  Gift,
  Star,
  Mail,
} from "lucide-react";

// Enhanced custom hook for managing steps
const useSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    { id: "loading", name: "Tải", icon: Sparkles },
    { id: "lights", name: "Đèn", icon: Lightbulb },
    { id: "music", name: "Nhạc", icon: Music },
    { id: "balloons", name: "Bóng bay", icon: Heart },
    { id: "card", name: "Thiệp", icon: Mail },
    { id: "cake3d", name: "Bánh kem", icon: Cake },
    { id: "gifts", name: "Quà", icon: Gift },
    { id: "pictures", name: "Ảnh", icon: Image },
    { id: "typewriter", name: "Lời chúc", icon: MessageCircle },
    { id: "message", name: "Thêm lời chúc", icon: MessageCircle },
    { id: "finale", name: "Hết òi", icon: Sparkles },
  ];

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
    setCompletedSteps((prev) => new Set([...prev, stepIndex]));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      goToStep(currentStep + 1);
    }
  };

  const resetSteps = () => {
    setCurrentStep(0);
    setCompletedSteps(new Set());
  };

  const skipToStep = (stepIndex) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      // Mark all previous steps as completed
      const newCompletedSteps = new Set();
      for (let i = 0; i <= stepIndex; i++) {
        newCompletedSteps.add(i);
      }
      setCompletedSteps(newCompletedSteps);
      setCurrentStep(stepIndex);
    }
  };

  const getStepProgress = () => {
    return {
      current: currentStep,
      total: steps.length - 1, // Exclude loading step
      percentage: Math.round((currentStep / (steps.length - 1)) * 100),
      completed: completedSteps.size,
    };
  };

  const isStepCompleted = (stepIndex) => {
    return completedSteps.has(stepIndex);
  };

  const getNextIncompleteStep = () => {
    for (let i = 1; i < steps.length; i++) {
      if (!completedSteps.has(i)) {
        return i;
      }
    }
    return steps.length - 1; // All steps completed, return finale
  };

  return {
    currentStep,
    steps,
    goToStep,
    nextStep,
    completedSteps,
    resetSteps,
    skipToStep,
    getStepProgress,
    isStepCompleted,
    getNextIncompleteStep,
  };
};

export default useSteps;
