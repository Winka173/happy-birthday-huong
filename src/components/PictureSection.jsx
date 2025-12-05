import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Loader2 } from "lucide-react";

const PictureSection = ({ onComplete }) => {
  const [currentPicture, setCurrentPicture] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Pictures for em
  const pictures = [
    {
      src: "/images/huong1.jpg",
      caption: "🎂 Thêm một năm với những kỷ niệm đẹp nha!",
      emoji: "🎂",
    },
    {
      src: "/images/huong2.jpg",
      caption: "🌟 Những khoảnh khắc đặc biệt em tỏa sáng!",
      emoji: "🌟",
    },
    {
      src: "/images/huong3.jpg",
      caption: "🎉 Những giây phút quý giá của em!",
      emoji: "🎉",
    },
    {
      src: "/images/huong4.jpg",
      caption: "💝 Những thời khắc cùng nhau đáng trân trọng!",
      emoji: "💝",
    },
    {
      src: "/images/huong5.jpg",
      caption: "✨ Những kỷ niệm!",
      emoji: "✨",
    },
    {
      src: "/images/huong6.jpg",
      caption: "🌈 Sắc màu của hạnh phúc!",
      emoji: "🌈",
    },
    {
      src: "/images/huong7.jpg",
      caption: "💖 Những khoảnh khắc tràn ngập tình yêu thương!",
      emoji: "💖",
    },
    {
      src: "/images/huong8.jpg",
      caption: "🎈 Chúc mừng sinh nhật Hương!",
      emoji: "🎈",
    },
    {
      src: "/images/huong9.jpg",
      caption: "🌺 Chúc mừng sinh nhật Hương!",
      emoji: "🌺",
    },
    {
      src: "/images/huong10.jpg",
      caption: "🎊 Chúc mừng sinh nhật Hương!",
      emoji: "🎊",
    },
    {
      src: "/images/huong11.jpg",
      caption: "🌙 Chúc mừng sinh nhật Hương!",
      emoji: "🌙",
    },
    {
      src: "/images/huong12.jpg",
      caption: "🦋 Chúc mừng sinh nhật Hương!",
      emoji: "🦋",
    },
    {
      src: "/images/huong13.jpg",
      caption: "🌸 Chúc mừng sinh nhật Hương!",
      emoji: "🌸",
    },
    {
      src: "/images/huong14.jpg",
      caption: "🎭 Chúc mừng sinh nhật Hương!",
      emoji: "🎭",
    },
    {
      src: "/images/huong15.jpg",
      caption: "🌅 Chúc mừng sinh nhật Hương!",
      emoji: "🌅",
    },
  ];

  // Preload all images before starting slideshow
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = pictures.length;

    pictures.forEach((picture) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / totalImages) * 100));
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / totalImages) * 100));
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = picture.src;
    });
  }, [pictures]);

  useEffect(() => {
    if (!imagesLoaded) return; // Don't start until images are loaded

    if (currentPicture === pictures.length - 1) {
      // Fire onComplete after a pause on the last image
      const timeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, 3000);

      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      setCurrentPicture((prev) => {
        if (prev < pictures.length - 1) {
          return prev + 1;
        } else {
          return prev; // stop incrementing
        }
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [currentPicture, pictures.length, onComplete, imagesLoaded]);

  useEffect(() => {
    if (!imagesLoaded) return; // Don't start hearts until images are loaded

    const heartInterval = setInterval(() => {
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 2000);
    }, 2000);

    return () => clearInterval(heartInterval);
  }, [imagesLoaded]);

  // Generate floating hearts
  const FloatingHearts = () => {
    return (
      <AnimatePresence>
        {showHearts && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight,
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0],
                  y: -100,
                  x: Math.random() * window.innerWidth,
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                className="absolute text-2xl md:text-3xl"
              >
                {index % 3 === 0 ? "💖" : index % 3 === 1 ? "✨" : "🌟"}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center px-4 py-8"
    >
      {!imagesLoaded && (
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">
            Đang tải ảnh... {loadingProgress}%
          </p>
        </div>
      )}

      {imagesLoaded && (
        <div className="text-center max-w-4xl mx-auto w-full">
          <motion.h2
            animate={{
              scale: [1, 1.05, 1],
              color: ["#ffffff", "#ff69b4", "#ffff00", "#ffffff"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12"
          >
            📸 Hành Trình Kỷ Niệm Của em 📸
          </motion.h2>

          {/* Picture Container */}
          <div className="relative mx-auto max-w-md md:max-w-lg lg:max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPicture}
                initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative"
              >
                {/* Polaroid-style frame */}
                <div className="bg-white p-3 md:p-4 rounded-lg shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="relative overflow-hidden rounded">
                    <img
                      src={pictures[currentPicture].src}
                      alt={`Birthday memory ${currentPicture + 1}`}
                      className="w-full max-h-[60vh] object-contain rounded bg-gray-100"
                    />

                    {/* Picture overlay effects */}
                    <motion.div
                      animate={{
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 1,
                      }}
                      className="absolute inset-0 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded"
                    />
                  </div>

                  {/* Caption */}
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-800 font-handwriting text-lg md:text-xl mt-3 md:mt-4 text-center"
                  >
                    {pictures[currentPicture].caption}
                  </motion.p>
                </div>

                {/* Decorative elements around the picture */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-4 -right-4 text-2xl md:text-3xl"
                >
                  {pictures[currentPicture].emoji}
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-4 -left-4 text-2xl md:text-3xl"
                >
                  💖
                </motion.div>

                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-6 -left-6 text-xl md:text-2xl"
                >
                  ✨
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Picture counter and navigation dots */}
          <div className="mt-8 md:mt-12 flex justify-center items-center space-x-4">
            <div className="flex space-x-2">
              {pictures.map((_, index) => (
                <motion.div
                  key={index}
                  animate={{
                    scale: currentPicture === index ? 1.2 : 1,
                    opacity: currentPicture === index ? 1 : 0.5,
                  }}
                  className={`w-3 h-3 rounded-full ${
                    currentPicture === index ? "bg-pink-400" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Progress text */}
          <motion.p
            animate={{
              opacity: [0.7, 1, 0.7],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-white/80 text-sm md:text-lg font-light mt-6 md:mt-8"
          >
            {currentPicture < pictures.length - 1
              ? `Đang xem kỷ niệm ${currentPicture + 1} / ${
                  pictures.length
                }... 📷`
              : "Tạo nên những kỷ niệm đẹp! ✨"}
          </motion.p>

          {/* Camera icon with flash effect */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-6 md:mt-8 flex justify-center"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0px rgba(255, 255, 255, 0)",
                  "0 0 20px rgba(255, 255, 255, 0.8)",
                  "0 0 0px rgba(255, 255, 255, 0)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30"
            >
              <Camera className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Floating hearts and stars */}
      {imagesLoaded && <FloatingHearts />}
    </motion.section>
  );
};

export default PictureSection;
