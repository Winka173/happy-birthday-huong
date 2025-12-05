import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TypewriterEffect = ({ messages, onComplete }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentMessage >= messages.length) {
      onComplete && onComplete();
      return;
    }

    const message = messages[currentMessage];
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index <= message.length) {
        setCurrentText(message.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);

        setTimeout(() => {
          setCurrentMessage((prev) => prev + 1);
          setCurrentText("");
          setIsTyping(true);
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentMessage, messages, onComplete]);

  return (
    <div className="text-center max-w-4xl mx-auto px-4">
      <motion.div
        key={currentMessage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl md:text-3xl lg:text-5xl font-light text-white leading-relaxed min-h-24 md:min-h-32 lg:min-h-40 flex items-center justify-center px-4"
      >
        <span className="text-center break-words max-w-full">
          {currentText}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="ml-2 text-purple-400"
            >
              |
            </motion.span>
          )}
        </span>
      </motion.div>
    </div>
  );
};

export default TypewriterEffect;
