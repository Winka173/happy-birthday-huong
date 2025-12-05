import { useTrail } from "@react-spring/web";
import { useState } from "react";
import { motion } from "framer-motion";
import { animated } from "@react-spring/web";

const LightShow = ({ onComplete }) => {
  const [activeBulbs, setActiveBulbs] = useState(new Set());
  const bulbColors = ["yellow", "red", "blue", "green", "pink", "orange"];

  const bulbVariants = {
    inactive: {
      scale: 1,
      boxShadow: "0 0 0px rgba(0,0,0,0)",
      filter: "brightness(0.3)",
    },
    active: {
      scale: 1.2,
      boxShadow: "0 0 20px currentColor, 0 0 40px currentColor",
      filter: "brightness(1.2)",
    },
  };

  const handleBulbClick = (index) => {
    const newActiveBulbs = new Set(activeBulbs);
    newActiveBulbs.add(index);
    setActiveBulbs(newActiveBulbs);

    if (newActiveBulbs.size === bulbColors.length) {
      setTimeout(onComplete, 1500);
    }
  };

  const trail = useTrail(bulbColors.length, {
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(50px)" },
    config: { tension: 300, friction: 10 },
  });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="text-center max-w-4xl mx-auto">
        <motion.h1
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-4xl md:text-6xl lg:text-8xl mb-8 md:mb-16"
        >
          🎉
        </motion.h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-16 max-w-2xl md:max-w-4xl mx-auto">
          {trail.map((style, index) => (
            <animated.div
              key={index}
              style={style}
              className="flex justify-center"
            >
              <motion.div
                variants={bulbVariants}
                animate={activeBulbs.has(index) ? "active" : "inactive"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBulbClick(index)}
                className={`w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full cursor-pointer transition-all duration-500 ${
                  bulbColors[index] === "yellow"
                    ? "bg-yellow-400"
                    : bulbColors[index] === "red"
                    ? "bg-red-500"
                    : bulbColors[index] === "blue"
                    ? "bg-blue-500"
                    : bulbColors[index] === "green"
                    ? "bg-green-500"
                    : bulbColors[index] === "pink"
                    ? "bg-pink-500"
                    : "bg-orange-500"
                }`}
              />
            </animated.div>
          ))}
        </div>

        <motion.p
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white text-sm md:text-lg lg:text-xl font-light px-4"
        >
          Bật đèn lên nhé! ✨
        </motion.p>
      </div>
    </motion.section>
  );
};

export default LightShow;
