import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BirthdayCard3D = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [petals, setPetals] = useState([]);

  const handleCardClick = () => {
    if (!isOpen) {
      setIsOpen(true);

      // Generate petals
      const newPetals = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        size: Math.random() * 0.5 + 0.5,
        color: ["🌸", "🌺", "🌼", "🌻", "🌷"][Math.floor(Math.random() * 5)],
      }));
      setPetals(newPetals);

      setTimeout(() => setShowMessage(true), 1000);
      setTimeout(onComplete, 8000);
    }
  };

  const cardVariants = {
    closed: {
      rotateY: 0,
      scale: 1,
    },
    open: {
      rotateY: -120,
      scale: 1.1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const coverVariants = {
    closed: {
      rotateY: 0,
    },
    open: {
      rotateY: 120,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-rose-100 to-purple-100"
    >
      <div className="text-center max-w-4xl mx-auto">
        <motion.h2
          animate={{
            scale: [1, 1.05, 1],
            color: ["#be185d", "#ec4899", "#f97316", "#be185d"],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-3xl md:text-5xl font-bold mb-12"
        >
          💌 Thiệp sinh nhật cho em! 💌
        </motion.h2>

        {/* 3D Card Container */}
        <div className="relative mx-auto" style={{ perspective: "1000px" }}>
          <motion.div
            className="relative w-80 h-60 md:w-96 md:h-72 mx-auto cursor-pointer"
            onClick={handleCardClick}
            whileHover={{ scale: isOpen ? 1.1 : 1.05 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Card Back/Base */}
            <motion.div
              variants={cardVariants}
              animate={isOpen ? "open" : "closed"}
              className="absolute inset-0 bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl shadow-2xl border-4 border-white"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "left center",
              }}
            >
              {/* Front Cover */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-rose-400 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-4"
                  >
                    🎂
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    Happy Birthday
                  </h3>
                  <p className="text-lg text-white/90">em</p>
                  {!isOpen && (
                    <motion.p
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-sm text-white/80 mt-4"
                    >
                      Nhấp để mở thiệp ✨
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Card Cover (that opens) */}
            <motion.div
              variants={coverVariants}
              animate={isOpen ? "open" : "closed"}
              className="absolute inset-0 bg-gradient-to-br from-purple-300 to-pink-400 rounded-xl shadow-2xl border-4 border-white"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "right center",
                zIndex: 10,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="text-7xl mb-4"
                  >
                    🎉
                  </motion.div>
                  <div className="text-3xl font-bold text-white drop-shadow-lg">
                    🌟 🎈 🎁 🌟
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Inside Message */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-xl flex items-center justify-center p-6"
                  style={{
                    transform: "rotateY(-120deg)",
                    transformOrigin: "left center",
                  }}
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.5, duration: 0.8 }}
                      className="space-y-4"
                    >
                      <div className="text-4xl mb-4">🎂✨</div>
                      <h3 className="text-2xl font-bold text-purple-800 mb-4">
                        Chúc mừng sinh nhật!
                      </h3>
                      <div className="text-lg text-purple-700 space-y-2">
                        <p>🌟 Chúc em luôn xinh đẹp</p>
                        <p>💖 Luôn vui vẻ và hạnh phúc</p>
                        <p>🎈 Thêm một tuổi mới tuyệt vời</p>
                        <p>🌸 Mọi ước mơ đều thành hiện thực</p>
                      </div>
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-3xl mt-6"
                      >
                        🥳 🎊 🌺 🎊 🥳
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Floating petals effect */}
          <AnimatePresence>
            {isOpen && (
              <div className="absolute inset-0 pointer-events-none">
                {petals.map((petal) => (
                  <motion.div
                    key={petal.id}
                    initial={{
                      x: "50%",
                      y: "50%",
                      opacity: 0,
                      scale: 0,
                      rotate: petal.rotation,
                    }}
                    animate={{
                      x: `${petal.x}%`,
                      y: `${petal.y + 100}%`,
                      opacity: [0, 1, 1, 0],
                      scale: petal.size,
                      rotate: petal.rotation + 360,
                    }}
                    transition={{
                      duration: 4,
                      ease: "easeOut",
                      delay: Math.random() * 2,
                    }}
                    className="absolute text-2xl"
                  >
                    {petal.color}
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Sparkle effects */}
          <AnimatePresence>
            {isOpen && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      x: "50%",
                      y: "50%",
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="absolute text-yellow-400 text-2xl"
                  >
                    ✨
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress indicator */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="mt-8"
          >
            <div className="bg-black/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/30 inline-block">
              <span className="text-purple-800 font-semibold">
                Bấm vào thiệp để mở thiệp... ✨
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default BirthdayCard3D;
