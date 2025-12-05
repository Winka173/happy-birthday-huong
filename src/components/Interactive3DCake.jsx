import confetti from "canvas-confetti";
import { useState } from "react";
import { motion } from "framer-motion";

const Interactive3DCake = ({ onComplete }) => {
  const [candlesLit, setCandlesLit] = useState(0);
  const [isWishMade, setIsWishMade] = useState(false);
  const totalCandles = 5;

  const lightCandle = (index) => {
    if (candlesLit === index) {
      setCandlesLit(index + 1);

      if (index + 1 === totalCandles) {
        setTimeout(() => {
          setIsWishMade(true);
          confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 },
          });
          setTimeout(onComplete, 7000);
        }, 5000);
      }
    }
  };

  return (
    <div className="text-center px-4 max-w-2xl mx-auto">
      <motion.h2
        animate={{
          color: ["#ffffff", "#ffff00", "#ff69b4", "#ffffff"],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12"
      >
        {isWishMade
          ? "Lời chúc đã được nghe và thực hiện! ✨"
          : "Em thổi nến nha! 🕯️"}
      </motion.h2>

      <div className="relative mx-auto w-64 md:w-80 lg:w-96 h-48 md:h-56 lg:h-64 perspective-1000">
        {/* Cake Base - 3D effect */}
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(10deg) rotateY(5deg)",
          }}
          whileHover={{
            transform: "rotateX(15deg) rotateY(10deg) scale(1.05)",
          }}
          className="relative w-full h-full"
        >
          {/* Bottom Layer */}
          <div className="absolute bottom-0 w-full h-24 md:h-28 lg:h-32 bg-gradient-to-br from-amber-600 via-amber-500 to-amber-400 rounded-lg shadow-2xl">
            <div className="absolute inset-1 md:inset-2 bg-gradient-to-br from-amber-500 to-amber-300 rounded-lg"></div>
          </div>

          {/* Middle Layer */}
          <div className="absolute bottom-16 md:bottom-20 lg:bottom-24 left-4 md:left-6 lg:left-8 right-4 md:right-6 lg:right-8 h-16 md:h-18 lg:h-24 bg-gradient-to-br from-pink-500 via-pink-400 to-pink-300 rounded-lg shadow-xl">
            <div className="absolute inset-1 md:inset-2 bg-gradient-to-br from-pink-400 to-pink-200 rounded-lg"></div>
          </div>

          {/* Top Layer */}
          <div className="absolute bottom-28 md:bottom-32 lg:bottom-40 left-8 md:left-12 lg:left-16 right-8 md:right-12 lg:right-16 h-12 md:h-16 lg:h-20 bg-gradient-to-br from-purple-500 via-purple-400 to-purple-300 rounded-lg shadow-lg">
            <div className="absolute inset-1 md:inset-2 bg-gradient-to-br from-purple-400 to-purple-200 rounded-lg"></div>
          </div>

          {/* Candles */}
          {Array.from({ length: totalCandles }).map((_, index) => (
            <motion.div
              key={index}
              onClick={() => lightCandle(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-40 md:bottom-48 lg:bottom-56 cursor-pointer"
              style={{ left: `${20 + index * 12}%` }}
            >
              {/* Candle */}
              <div className="w-2 md:w-3 h-8 md:h-10 lg:h-12 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-sm shadow-md"></div>

              {/* Flame */}
              {candlesLit > index && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    y: [0, -2, 0],
                    scaleY: [1, 1.1, 0.9, 1],
                  }}
                  transition={{
                    scale: { duration: 0.3 },
                    opacity: { duration: 0.3 },
                    y: { duration: 1, repeat: Infinity },
                    scaleY: { duration: 0.5, repeat: Infinity },
                  }}
                  className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2 w-1.5 md:w-2 h-3 md:h-4 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full"
                />
              )}
            </motion.div>
          ))}

          {/* Decorative elements */}
          <div className="absolute top-32 md:top-40 lg:top-48 left-2 md:left-4 w-3 md:w-4 h-3 md:h-4 bg-red-400 rounded-full"></div>
          <div className="absolute top-36 md:top-44 lg:top-52 right-4 md:right-6 w-2 md:w-3 h-2 md:h-3 bg-blue-400 rounded-full"></div>
          <div className="absolute top-28 md:top-36 lg:top-44 left-1/2 w-1.5 md:w-2 h-1.5 md:h-2 bg-green-400 rounded-full"></div>
        </motion.div>
      </div>

      <motion.p
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-white text-sm md:text-lg lg:text-xl mt-6 md:mt-8 px-4"
      >
        {candlesLit < totalCandles
          ? `Nhấp vào nến nha! (${candlesLit}/${totalCandles})`
          : isWishMade
          ? "Ước nguyện của em đã thành hiện thực! 🌟"
          : "Ước 1 điều luôn! 💫"}
      </motion.p>
    </div>
  );
};

export default Interactive3DCake;
