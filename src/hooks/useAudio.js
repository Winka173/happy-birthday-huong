// Enhanced Audio Hook
import { useState, useRef, useEffect } from "react";
const useAudio = (url) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(new Audio(url));

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, [volume]);

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const toggle = () => (isPlaying ? pause() : play());

  return { isPlaying, play, pause, toggle, setVolume };
};

export default useAudio;
