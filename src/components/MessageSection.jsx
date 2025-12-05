import { useEffect, useState } from "react";
import { useSpring, motion, AnimatePresence } from "framer-motion";
import { animated } from "@react-spring/web";

const MessageSection = ({ onComplete }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = [
    "😊 Lời chúc bằng tiếng anh 😊😊😊",
    "🌟 Today is your special day! 🌟",
    "📸 Another year of amazing memories 📸",
    "✨ May all your dreams come true ✨",
    "😊 Wishing you happiness and joy 😊",
    "😊 Always cute and adorable 😊",
    "🥳 Wish you have another fantastic year! 🥳",
    "🎉 Happy Birthday Hương! 🎉",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => {
        if (prev >= messages.length - 1) {
          setTimeout(onComplete, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [onComplete, messages.length]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="text-center max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessage}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-4xl md:text-6xl font-light text-white leading-relaxed"
          >
            {messages[currentMessage]}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default MessageSection;
