import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";

// Global audio instance to prevent multiple audio players
let globalAudio = null;

const MusicPlayer = ({
  onPlay,
  isMainPlayer = false,
  collapsed = false,
  onToggleCollapse,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState(null);

  const audioRef = useRef(null);

  // Initialize or reuse global audio
  useEffect(() => {
    if (!globalAudio) {
      globalAudio = new Audio("/audio/happy-birthday.mp3");
      globalAudio.loop = true;
    }

    audioRef.current = globalAudio;
    const audio = audioRef.current;

    // Set initial properties
    audio.volume = volume;

    // Event listeners
    const handleLoadedData = () => {
      setIsLoaded(true);
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = (e) => {
      console.error("Audio error:", e);
      setError("Failed to load audio file");
      setIsLoaded(false);
    };

    const handleCanPlay = () => {
      setError(null);
      setIsLoaded(true);
    };

    // Add event listeners
    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);

    // Load the audio if not already loaded
    if (audio.readyState < 2) {
      audio.load();
    } else {
      setIsLoaded(true);
      setDuration(audio.duration);
    }

    // Sync playing state
    setIsPlaying(!audio.paused);

    // Cleanup
    return () => {
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  // Update volume when slider changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayPause = async () => {
    if (!audioRef.current || !isLoaded) {
      setError("Audio not ready. Please wait...");
      return;
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
        setError(null);
        if (onPlay && isMainPlayer) {
          onPlay();
        }
      }
    } catch (error) {
      console.error("Play/Pause failed:", error);
      setError("Click to enable audio first!");
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = clickX / rect.width;
    const newTime = clickRatio * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Collapsed view for floating player
  if (collapsed && !isMainPlayer) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-3 border border-white/20 w-16"
      >
        <div className="flex flex-col items-center space-y-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayPause}
            disabled={!isLoaded}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors ${
              isLoaded
                ? "bg-purple-600 hover:bg-purple-700 cursor-pointer"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleCollapse}
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ChevronUp size={12} />
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 ${
        isMainPlayer ? "p-4 md:p-6 max-w-sm mx-auto" : "p-4 max-w-xs"
      }`}
    >
      <div className="text-center mb-4 md:mb-6">
        <motion.div
          animate={{
            rotate: isPlaying ? 360 : 0,
            scale: isPlaying ? [1, 1.1, 1] : 1,
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity },
          }}
          className={`${
            isMainPlayer ? "w-20 h-20 md:w-24 md:h-24" : "w-16 h-16"
          } mx-auto mb-3 md:mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl md:text-4xl shadow-lg`}
        >
          🎵
        </motion.div>

        <h3
          className={`text-white font-bold ${
            isMainPlayer ? "text-lg md:text-xl" : "text-md"
          } mb-2`}
        >
          Birthday Song
        </h3>
        <p className={`text-white/70 ${isMainPlayer ? "text-sm" : "text-xs"}`}>
          {error ? error : isLoaded ? "Ready to play!" : "Loading..."}
        </p>
      </div>

      {/* Progress Bar */}
      {isLoaded && (
        <div className="mb-3 md:mb-4">
          <div
            className="w-full h-2 bg-white/20 rounded-full cursor-pointer overflow-hidden"
            onClick={handleProgressClick}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              animate={{
                width:
                  duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="flex justify-between text-white/60 text-xs mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center space-x-3 md:space-x-4 mb-3 md:mb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePlayPause}
          disabled={!isLoaded}
          className={`${
            isMainPlayer ? "w-10 h-10 md:w-12 md:h-12" : "w-10 h-10"
          } rounded-full flex items-center justify-center text-white transition-colors ${
            isLoaded
              ? "bg-purple-600 hover:bg-purple-700 cursor-pointer"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          {isPlaying ? (
            <Pause size={isMainPlayer ? 20 : 16} />
          ) : (
            <Play size={isMainPlayer ? 20 : 16} />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className={`${
            isMainPlayer ? "w-8 h-8 md:w-10 md:h-10" : "w-8 h-8"
          } bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors`}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </motion.button>

        {/* Collapse button for floating player */}
        {!isMainPlayer && onToggleCollapse && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleCollapse}
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ChevronDown size={14} />
          </motion.button>
        )}
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-2">
        <Volume2 size={14} className="text-white/70" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
        />
        <span className="text-white/70 text-xs w-8">
          {Math.round(volume * 100)}%
        </span>
      </div>

      {/* Loading indicator */}
      {!isLoaded && !error && (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-4 p-2 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-red-200 text-sm text-center">{error}</p>
        </div>
      )}
    </motion.div>
  );
};

export default MusicPlayer;
