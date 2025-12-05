import { useSpring, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { animated } from "@react-spring/web";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  const springProps = useSpring({
    width: `${progress}%`,
    config: { tension: 300, friction: 10 },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity },
          }}
          className="w-32 h-32 mx-auto mb-8 text-8xl"
        >
          🎂
        </motion.div>

        <motion.h2
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-8"
          style={{ backgroundSize: "200% 200%" }}
        >
          5/12 là ngày gì ta...
        </motion.h2>

        <div className="w-64 bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
          <animated.div
            style={springProps}
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
          />
        </div>

        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white text-lg"
        >
          {progress}% đã xong
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
