import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VirtualGiftUnwrapping = ({ onComplete }) => {
  const [currentGift, setCurrentGift] = useState(0);
  const [isUnwrapping, setIsUnwrapping] = useState(false);
  const [unwrappedGifts, setUnwrappedGifts] = useState(new Set());
  const [showGiftContent, setShowGiftContent] = useState(false);

  const gifts = [
    {
      id: 0,
      color: "from-red-400 to-red-600",
      ribbon: "from-yellow-400 to-yellow-600",
      content: {
        emoji: "🌟",
        title: "Một năm tỏa sáng!",
        message: "Chúc em luôn rạng rỡ như ngôi sao nha!",
      },
    },
    {
      id: 1,
      color: "from-blue-400 to-blue-600",
      ribbon: "from-pink-400 to-pink-600",
      content: {
        emoji: "💝",
        title: "Tình yêu thương!",
        message: "Gửi em tất cả tình yêu và lời chúc tốt đẹp!",
      },
    },
    {
      id: 2,
      color: "from-green-400 to-green-600",
      ribbon: "from-purple-400 to-purple-600",
      content: {
        emoji: "🎈",
        title: "Niềm vui bất tận!",
        message: "Chúc em có những ngày tháng luôn tràn đầy tiếng cười!",
      },
    },
    {
      id: 3,
      color: "from-purple-400 to-purple-600",
      ribbon: "from-orange-400 to-orange-600",
      content: {
        emoji: "🌈",
        title: "Ước mơ thành hiện thực!",
        message: "Chúc em mọi điều em mơ ước đều trở thành sự thật!",
      },
    },
  ];

  const unwrapGift = (giftId) => {
    if (unwrappedGifts.has(giftId) || isUnwrapping) return;

    setIsUnwrapping(true);
    setShowGiftContent(false);

    // Mark gift as unwrapped and show content
    setTimeout(() => {
      setUnwrappedGifts((prev) => new Set([...prev, giftId]));

      // Wait a bit for unwrap animation, then show content
      setTimeout(() => {
        setShowGiftContent(true);
        setIsUnwrapping(false);
      }, 400);
    }, 600);

    // Handle next gift or completion
    if (giftId < gifts.length - 1) {
      // Show content for 4 seconds, then transition to next
      setTimeout(() => {
        setShowGiftContent(false);
        setTimeout(() => {
          setCurrentGift(giftId + 1);
        }, 300);
      }, 5000);
    } else {
      // Final gift - trigger completion
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 6000);
    }
  };

  // Auto unwrap first gift after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (unwrappedGifts.size === 0) {
        unwrapGift(0);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-amber-100 to-rose-100"
    >
      <div className="text-center max-w-4xl mx-auto">
        <motion.h2
          animate={{
            scale: [1, 1.05, 1],
            color: ["#dc2626", "#ec4899", "#8b5cf6", "#dc2626"],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-3xl md:text-5xl font-bold mb-12"
        >
          🎁 Mở quà sinh nhật! 🎁
        </motion.h2>

        {/* Gift Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {gifts.map((gift, index) => (
            <motion.div
              key={gift.id}
              className="relative"
              whileHover={{ scale: currentGift === index ? 1.05 : 0.95 }}
              layout
            >
              <motion.div
                onClick={() => unwrapGift(gift.id)}
                className={`
                  relative w-24 h-24 md:w-32 md:h-32 mx-auto cursor-pointer
                  ${
                    currentGift === index
                      ? "ring-4 ring-yellow-400 ring-opacity-75"
                      : ""
                  }
                `}
                animate={{
                  scale: currentGift === index ? [1, 1.1, 1] : 1,
                  rotateY: unwrappedGifts.has(gift.id) ? 180 : 0,
                }}
                transition={{ duration: 0.8 }}
                style={{ transformStyle: "preserve-3d" }}
                layout
              >
                {/* Gift Box */}
                <AnimatePresence>
                  {!unwrappedGifts.has(gift.id) && (
                    <motion.div
                      exit={{
                        scale: 0,
                        rotateY: 180,
                        opacity: 0,
                      }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0"
                    >
                      {/* Box */}
                      <div
                        className={`w-full h-full bg-gradient-to-br ${gift.color} rounded-lg shadow-xl`}
                      >
                        {/* Ribbon Vertical */}
                        <div
                          className={`absolute left-1/2 top-0 bottom-0 w-4 bg-gradient-to-b ${gift.ribbon} transform -translate-x-1/2`}
                        />

                        {/* Ribbon Horizontal */}
                        <div
                          className={`absolute top-1/2 left-0 right-0 h-4 bg-gradient-to-r ${gift.ribbon} transform -translate-y-1/2`}
                        />

                        {/* Bow */}
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute top-2 left-1/2 transform -translate-x-1/2 text-2xl"
                        >
                          🎀
                        </motion.div>

                        {/* Gift shine effect */}
                        <motion.div
                          animate={{
                            x: [-100, 100],
                            opacity: [0, 0.5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Unwrapped Content */}
                <AnimatePresence>
                  {unwrappedGifts.has(gift.id) && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-lg shadow-xl flex items-center justify-center"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-4xl"
                      >
                        {gift.content.emoji}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Unwrapping particles */}
                {isUnwrapping && currentGift === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{
                          x: "50%",
                          y: "50%",
                          scale: 0,
                          opacity: 1,
                        }}
                        animate={{
                          x: `${50 + (Math.random() - 0.5) * 200}%`,
                          y: `${50 + (Math.random() - 0.5) * 200}%`,
                          scale: [0, 1, 0],
                          opacity: [1, 1, 0],
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.1,
                        }}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                      />
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Gift label */}
              <motion.p className="text-sm text-gray-600 mt-2" layout>
                Quà {index + 1}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Current gift message with smooth transitions */}
        <div className="relative min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {showGiftContent && (
              <motion.div
                key={`gift-content-${currentGift}`}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl max-w-md mx-auto absolute"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{
                    scale: [0, 1.3, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    scale: { duration: 0.8, delay: 0.2 },
                    rotate: { duration: 2, repeat: Infinity, delay: 1 },
                  }}
                  className="text-6xl mb-4"
                >
                  {gifts[currentGift].content.emoji}
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold text-purple-800 mb-4"
                >
                  {gifts[currentGift].content.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg text-purple-600 leading-relaxed"
                >
                  {gifts[currentGift].content.message}
                </motion.p>

                {currentGift < gifts.length - 1 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 }}
                    onClick={() => unwrapGift(currentGift + 1)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
                  >
                    Mở quà tiếp theo! 🎁
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress indicator */}
        <motion.div className="mt-8" layout>
          <div className="flex justify-center space-x-2">
            {gifts.map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  scale: unwrappedGifts.has(index) ? 1.2 : 1,
                  backgroundColor: unwrappedGifts.has(index)
                    ? "#10b981"
                    : "#d1d5db",
                }}
                transition={{ duration: 0.3 }}
                className="w-3 h-3 rounded-full"
              />
            ))}
          </div>
          <motion.p
            className="text-gray-600 mt-2"
            key={unwrappedGifts.size}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Đã mở: {unwrappedGifts.size} / {gifts.length} món quà
          </motion.p>
        </motion.div>

        {/* Instructions */}
        <AnimatePresence>
          {!isUnwrapping && unwrappedGifts.size < gifts.length && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0.7, 1, 0.7], y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                opacity: { duration: 2, repeat: Infinity },
                y: { duration: 0.3 },
              }}
              className="text-purple-600 mt-6"
            >
              Nhấp vào quà để mở! ✨
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default VirtualGiftUnwrapping;
