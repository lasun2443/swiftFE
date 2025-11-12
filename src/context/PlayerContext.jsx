import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(null);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsLoading(false);
    };
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const resume = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play().catch((error) => {
      console.error("Unable to resume audio playback:", error);
    });
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
  }, []);

  const playTrack = useCallback(
    (track) => {
      if (!track?.audioUrl) {
        console.warn("Attempted to play a track without an audioUrl");
        return;
      }

      const audio = audioRef.current;
      if (!audio) return;

      const isNewTrack = currentTrack?.id !== track.id;

      if (isNewTrack) {
        setCurrentTrack(track);
        setCurrentTime(0);
        setDuration(track.duration || 0);
        setIsLoading(true);
        audio.src = track.audioUrl;
      }

      audio
        .play()
        .then(() => {
          if (isNewTrack) {
            // Ensure current time reflects new track start
            setCurrentTime(audio.currentTime || 0);
          }
        })
        .catch((error) => {
          console.error("Unable to play audio:", error);
        });
    },
    [currentTrack]
  );

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  }, [isPlaying, pause, resume]);

  const seek = useCallback(
    (timeInSeconds) => {
      const audio = audioRef.current;
      if (!audio || Number.isNaN(timeInSeconds)) return;

      const safeDuration = audio.duration || duration || 0;
      const nextTime = Math.min(Math.max(timeInSeconds, 0), safeDuration);

      audio.currentTime = nextTime;
      setCurrentTime(nextTime);
    },
    [duration]
  );

  const value = useMemo(
    () => ({
      currentTrack,
      isPlaying,
      isLoading,
      currentTime,
      duration,
      playTrack,
      pause,
      resume,
      togglePlayback,
      seek,
    }),
    [currentTrack, isPlaying, isLoading, currentTime, duration, playTrack, pause, resume, togglePlayback, seek]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }

  return context;
};

