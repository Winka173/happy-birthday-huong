import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BalloonSection = ({ onComplete }) => {
  const [phase, setPhase] = useState("forming"); // forming -> floating

  const letters = [
    "H",
    "A",
    "P",
    "P",
    "Y",
    " ",
    "B",
    "I",
    "R",
    "T",
    "H",
    "D",
    "A",
    "Y",
  ];

  const colors = ["red", "blue", "green", "purple", "yellow", "pink", "orange"];

  // Enhanced balloon variants with 3 phases
  const balloonVariants = {
    hidden: {
      y: 150,
      opacity: 0,
      rotate: -15,
      scale: 0.5,
    },
    forming: (i) => ({
      y: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        delay: i * 0.08, // Faster formation
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    }),
    displaying: {
      y: [-8, 8, -8],
      rotate: [-1.5, 1.5, -1.5],
      scale: [1, 1.02, 1],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    floating: (i) => ({
      y: [-50, -100, -150, -200, -window.innerHeight - 200],
      x: [
        0,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 400,
      ],
      rotate: [
        0,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 80,
      ],
      scale: [1, 0.95, 0.9, 0.85, 0.7],
      opacity: [1, 0.9, 0.7, 0.4, 0],
      transition: {
        delay: i * 0.05, // Staggered float away
        duration: 4, // Longer duration to see the floating
        ease: "easeOut",
        times: [0, 0.25, 0.5, 0.75, 1], // Control animation timing
      },
    }),
  };

  // Phase management
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPhase("floating");
    }, 3000); // Form for 3 seconds, then start floating

    const timer2 = setTimeout(() => {
      onComplete();
    }, 8000); // Complete after float animation

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  // Generate floating particles
  const FloatingParticles = () => (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            opacity: 0,
          }}
          animate={{
            y: -100,
            opacity: [0, 1, 1, 0],
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: 6,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute text-2xl"
        >
          {i % 4 === 0 ? "🎈" : i % 4 === 1 ? "✨" : i % 4 === 2 ? "🎉" : "💖"}
        </motion.div>
      ))}
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {/* Background particles */}
      <FloatingParticles />

      <div className="text-center relative z-10">
        {/* Simple title */}
        <motion.h2
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl md:text-5xl font-bold text-white mb-8 md:mb-16"
        >
          🎈 Chúc mừng sinh nhật Hương! 🎈
        </motion.h2>

        {/* Balloons formation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-4xl mx-auto">
          {letters.map((letter, index) => {
            if (letter === " ") {
              return <div key={index} className="w-2 md:w-4" />;
            }

            const colorClass = colors[index % colors.length];

            return (
              <motion.div
                key={index}
                custom={index}
                variants={balloonVariants}
                initial="hidden"
                animate={
                  phase === "forming"
                    ? "forming"
                    : phase === "floating"
                    ? "floating"
                    : "displaying"
                }
                whileHover={{
                  scale: 1.15,
                  y: -20,
                  transition: { duration: 0.3 },
                }}
                className="relative cursor-pointer"
              >
                {/* Balloon */}
                <motion.div
                  className={`
                    w-12 h-16 md:w-16 md:h-24 rounded-full shadow-xl relative overflow-hidden
                    bg-gradient-to-b
                    ${
                      colorClass === "red"
                        ? "from-red-400 to-red-600"
                        : colorClass === "blue"
                        ? "from-blue-400 to-blue-600"
                        : colorClass === "green"
                        ? "from-green-400 to-green-600"
                        : colorClass === "purple"
                        ? "from-purple-400 to-purple-600"
                        : colorClass === "yellow"
                        ? "from-yellow-400 to-yellow-600"
                        : colorClass === "pink"
                        ? "from-pink-400 to-pink-600"
                        : "from-orange-400 to-orange-600"
                    }
                  `}
                >
                  {/* Balloon highlight */}
                  <div className="absolute top-1 left-1 w-3 h-4 md:w-4 md:h-6 bg-white/40 rounded-full blur-sm" />

                  {/* Letter */}
                  <div className="flex items-center justify-center h-full text-white font-bold text-lg md:text-xl drop-shadow-lg">
                    {letter}
                  </div>
                </motion.div>

                {/* String */}
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-6 md:h-8 bg-gray-700"
                  animate={
                    phase === "displaying"
                      ? {
                          scaleY: [1, 1.1, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Sparkle effect when forming */}
                {phase === "forming" && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      delay: index * 0.08 + 0.5,
                      duration: 0.8,
                    }}
                    className="absolute -top-2 -right-2 text-yellow-300 text-xl"
                  >
                    ✨
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Simple bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 md:mt-16"
        >
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white text-lg md:text-xl"
          >
            Mong ước mơ em bay cao như những quả bóng bay này! 🌈
          </motion.p>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex space-x-2">
            {["forming", "floating"].map((p, i) => (
              <div
                key={p}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  phase === p ? "bg-white scale-125" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BalloonSection;
