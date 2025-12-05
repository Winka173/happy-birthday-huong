import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// Import all enhanced components
import useSteps from "./hooks/useSteps";
import BalloonSection from "./components/BalloonSection";
import MessageSection from "./components/MessageSection";
import LightShow from "./components/LightShow";
import ParticleBackground from "./components/ParticleBackground";
import LoadingScreen from "./components/LoadingScreen";
import MusicPlayer from "./components/MusicPlayer";
import Interactive3DCake from "./components/Interactive3DCake";
import TypewriterEffect from "./components/TypewriterEffect";
import PictureSection from "./components/PictureSection";
import BirthdayCard3D from "./components/BirthdayCard3D";
import VirtualGiftUnwrapping from "./components/VirtualGiftUnwrapping";
import ControlPanel from "./components/ControlPanel";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [musicPlayerCollapsed, setMusicPlayerCollapsed] = useState(false);

  const { currentStep, steps, goToStep, nextStep, completedSteps } = useSteps();

  const handleLoadingComplete = () => {
    setIsLoading(false);
    goToStep(1);
  };

  const handleMusicStart = () => {
    setMusicEnabled(true);
    setShowMusicPlayer(true);
  };

  const toggleMusicPlayer = () => {
    setMusicPlayerCollapsed(!musicPlayerCollapsed);
  };

  // Enhanced confetti function with multiple patterns
  const triggerConfetti = (pattern = "default") => {
    import("canvas-confetti").then((confetti) => {
      switch (pattern) {
        case "burst":
          confetti.default({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
            colors: ["#ff69b4", "#ffff00", "#00ff00", "#ff6b6b", "#4ecdc4"],
          });
          break;
        case "fountain":
          confetti.default({
            particleCount: 200,
            angle: 90,
            spread: 45,
            origin: { x: 0.5, y: 1 },
            colors: ["#ff69b4", "#ffff00", "#ff6b6b"],
          });
          break;
        case "sides":
          confetti.default({
            particleCount: 100,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          });
          confetti.default({
            particleCount: 100,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          });
          break;
        default:
          confetti.default({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
      }
    });
  };

  // Auto confetti with different patterns
  useEffect(() => {
    if (!isLoading) {
      const patterns = ["default", "burst", "fountain", "sides"];
      let patternIndex = 0;

      const initialTimer = setTimeout(() => {
        triggerConfetti(patterns[patternIndex]);

        const interval = setInterval(() => {
          patternIndex = (patternIndex + 1) % patterns.length;
          triggerConfetti(patterns[patternIndex]);
        }, 12000); // Every 12 seconds

        return () => clearInterval(interval);
      }, 5000);

      return () => clearTimeout(initialTimer);
    }
  }, [isLoading]);

  const renderCurrentSection = () => {
    switch (currentStep) {
      case 1: // Enhanced Lights
        return <LightShow onComplete={nextStep} />;

      case 2: // Music with enhanced UI
        return (
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-2xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  textShadow: [
                    "0 0 10px rgba(255, 255, 255, 0.5)",
                    "0 0 20px rgba(255, 105, 180, 0.8)",
                    "0 0 30px rgba(255, 255, 0, 1)",
                    "0 0 20px rgba(255, 105, 180, 0.8)",
                    "0 0 10px rgba(255, 255, 255, 0.5)",
                  ],
                }}
                transition={{
                  y: { duration: 0.8 },
                  textShadow: { duration: 3, repeat: Infinity },
                }}
                className="text-3xl md:text-5xl font-bold text-white mb-8"
              >
                🎵 Thêm xíu nhạc! 🎵
              </motion.h2>
              <MusicPlayer onPlay={handleMusicStart} isMainPlayer={true} />
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(147, 51, 234, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  nextStep();
                  setMusicPlayerCollapsed(true);
                }}
                className="mt-8 px-6 md:px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all text-sm md:text-base shadow-lg"
              >
                Tiếp tục đi hoi 🎉
              </motion.button>
            </div>
          </div>
        );

      case 3: // Enhanced Physics Balloons
        return <BalloonSection onComplete={nextStep} />;

      case 4: // 3D Birthday Card
        return <BirthdayCard3D onComplete={nextStep} />;

      case 5: // Interactive 3D Cake
        return (
          <div className="min-h-screen flex items-center justify-center px-4">
            <Interactive3DCake onComplete={nextStep} />
          </div>
        );

      case 6: // Virtual Gift Unwrapping
        return <VirtualGiftUnwrapping onComplete={nextStep} />;

      case 7: // Picture Section
        return <PictureSection onComplete={nextStep} />;

      case 8: // Typewriter Messages
        return (
          <div className="min-h-screen flex items-center justify-center px-4">
            <TypewriterEffect
              messages={[
                "🎉 Chúc mừng sinh nhật Hương! 🎉",
                "✨ Thêm một năm với những kỷ niệm tuyệt vời ✨",
                "🌟 Chúc mọi ước mơ của em đều thành hiện thực 🌟",
                "😊 Chúc em luôn hạnh phúc và vui vẻ 😊",
                "🥳 Luôn xinh đẹp và dễ thương! 🥳",
                "🎂 Chúc ngày sinh nhật của em thật đặc biệt! 🎂",
              ]}
              onComplete={nextStep}
            />
          </div>
        );

      case 9: // Final Messages
        return <MessageSection onComplete={nextStep} />;

      case 10: // Grand Finale with enhanced effects
        return (
          <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Enhanced background effects */}
            <div className="absolute inset-0">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl opacity-30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    rotate: [0, 360],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  {["🎉", "🎊", "🌟", "✨", "🎈", "🎁"][i % 6]}
                </motion.div>
              ))}
            </div>

            <div className="text-center max-w-4xl mx-auto relative z-10">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, type: "spring" }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                    filter: [
                      "hue-rotate(0deg)",
                      "hue-rotate(90deg)",
                      "hue-rotate(180deg)",
                      "hue-rotate(270deg)",
                      "hue-rotate(360deg)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl md:text-8xl mb-8"
                >
                  🎉
                </motion.div>

                <motion.h1
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    textShadow: [
                      "0 0 20px rgba(255, 105, 180, 0.8)",
                      "0 0 40px rgba(255, 255, 0, 1)",
                      "0 0 60px rgba(0, 255, 255, 0.8)",
                      "0 0 40px rgba(255, 255, 0, 1)",
                      "0 0 20px rgba(255, 105, 180, 0.8)",
                    ],
                  }}
                  transition={{
                    backgroundPosition: { duration: 3, repeat: Infinity },
                    textShadow: { duration: 2, repeat: Infinity },
                  }}
                  className="text-3xl md:text-6xl font-bold text-gradient mb-8"
                  style={{ backgroundSize: "200% 200%" }}
                >
                  CHÚC MỪNG SINH NHẬT HƯƠNG!
                </motion.h1>

                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl md:text-4xl mb-8"
                >
                  🎂🎈🎁🎊🥳
                </motion.div>

                <motion.p
                  animate={{
                    color: [
                      "#ffffff",
                      "#ff69b4",
                      "#ffff00",
                      "#00ffff",
                      "#ffffff",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-lg md:text-xl mb-8 font-semibold"
                >
                  Cảm ơn em nhìu! 🌟
                </motion.p>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(147, 51, 234, 0.8)",
                    filter: "brightness(1.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    triggerConfetti("burst");
                    setTimeout(() => triggerConfetti("fountain"), 500);
                    setTimeout(() => triggerConfetti("sides"), 1000);
                    setTimeout(() => window.location.reload(), 2000);
                  }}
                  className="px-6 md:px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white rounded-full font-semibold hover:shadow-lg transition-all text-sm md:text-base relative overflow-hidden"
                >
                  <motion.span
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative z-10"
                  >
                    🔄 Ăn mừng típ luôn!
                  </motion.span>

                  {/* Button shine effect */}
                  <motion.div
                    animate={{
                      x: [-100, 300],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12"
                  />
                </motion.button>
              </motion.div>
            </div>
          </div>
        );

      default:
        return <LightShow onComplete={nextStep} />;
    }
  };

  // Updated steps with all new components
  const enhancedSteps = [
    { id: "loading", name: "Tải", icon: "Sparkles" },
    { id: "lights", name: "Đèn", icon: "Lightbulb" },
    { id: "music", name: "Nhạc", icon: "Music" },
    { id: "balloons", name: "Bóng bay", icon: "Heart" },
    { id: "card", name: "Thiệp", icon: "Mail" },
    { id: "cake3d", name: "Bánh kem", icon: "Cake" },
    { id: "gifts", name: "Quà", icon: "Gift" },
    { id: "pictures", name: "Ảnh", icon: "Image" },
    { id: "typewriter", name: "Lời chúc", icon: "MessageCircle" },
    { id: "message", name: "Thêm lời chúc", icon: "MessageCircle" },
    { id: "finale", name: "Hết òi", icon: "Sparkles" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 font-poppins relative overflow-hidden">
      {/* Enhanced Particle Background */}
      <ParticleBackground currentStep={currentStep} />

      {/* Floating Music Player */}
      <AnimatePresence>
        {showMusicPlayer && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 100 }}
            animate={{
              opacity: 1,
              scale: musicPlayerCollapsed ? 0.6 : 0.8,
              x: 0,
            }}
            exit={{ opacity: 0, scale: 0, x: 100 }}
            className="fixed top-4 right-4 z-30"
          >
            <MusicPlayer
              isMainPlayer={false}
              collapsed={musicPlayerCollapsed}
              onToggleCollapse={toggleMusicPlayer}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main Content with enhanced transitions */}
      {!isLoading && (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{
                opacity: 0,
                x: 100,
                filter: "blur(10px)",
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: -100,
                filter: "blur(10px)",
                scale: 0.9,
              }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
              {renderCurrentSection()}
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Control Panel */}
          <ControlPanel
            steps={enhancedSteps}
            currentStep={currentStep}
            goToStep={goToStep}
            completedSteps={completedSteps}
            totalSteps={11}
          />

          {/* Enhanced Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-4 left-4 z-30"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 10px rgba(255, 255, 255, 0.3)",
                  "0 0 20px rgba(255, 105, 180, 0.6)",
                  "0 0 10px rgba(255, 255, 255, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-white/10 backdrop-blur-lg rounded-full px-3 md:px-4 py-2 border border-white/20"
            >
              <span className="text-white text-xs md:text-sm font-medium">
                Bước {currentStep} / {enhancedSteps.length - 1}
              </span>
            </motion.div>
          </motion.div>

          {/* Enhanced Celebrate Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
            className="fixed bottom-16 md:bottom-24 right-4 z-30"
          >
            <motion.button
              whileHover={{
                scale: 1.1,
                rotate: 10,
                boxShadow: "0 0 25px rgba(255, 193, 7, 0.8)",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => triggerConfetti("burst")}
              animate={{
                boxShadow: [
                  "0 0 10px rgba(255, 193, 7, 0.5)",
                  "0 0 25px rgba(255, 193, 7, 0.8)",
                  "0 0 10px rgba(255, 193, 7, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xl md:text-2xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
              title="Ăn mừng ngay lập tức!"
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                🎉
              </motion.span>
            </motion.button>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default App;
