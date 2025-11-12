import { Pause, Play } from "lucide-react";
import { useMemo } from "react";
import { usePlayer } from "../context/PlayerContext.jsx";

const formatTime = (seconds) => {
  if (!seconds || Number.isNaN(seconds)) {
    return "0:00";
  }

  const wholeSeconds = Math.floor(seconds);
  const mins = Math.floor(wholeSeconds / 60);
  const secs = wholeSeconds % 60;

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const NowPlayingBar = () => {
  const { currentTrack, isPlaying, isLoading, currentTime, duration, togglePlayback, seek } = usePlayer();

  const sliderMax = useMemo(() => {
    if (!duration || Number.isNaN(duration) || duration <= 0) {
      return 1;
    }
    return duration;
  }, [duration]);

  if (!currentTrack) {
    return null;
  }

  const progressValue = Math.min(currentTime, sliderMax);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 border-t border-zinc-800 backdrop-blur-sm px-4 sm:px-6 py-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          {currentTrack.cover ? (
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="h-12 w-12 rounded-md object-cover border border-zinc-800 flex-shrink-0"
            />
          ) : (
            <div className="h-12 w-12 rounded-md bg-zinc-800 border border-zinc-700 flex-shrink-0" />
          )}

          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{currentTrack.title || "Untitled track"}</p>
            <p className="text-xs text-zinc-400 truncate">{currentTrack.artist || "Unknown artist"}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:ml-auto">
          <button
            type="button"
            onClick={togglePlayback}
            disabled={isLoading}
            className="flex items-center justify-center h-11 w-11 rounded-full bg-green-500 text-white hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={isPlaying ? "Pause current track" : "Play current track"}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span className="text-xs text-zinc-400 w-10">{formatTime(progressValue)}</span>

        <input
          type="range"
          min={0}
          max={sliderMax}
          step={0.1}
          value={progressValue}
          onChange={(event) => seek(Number(event.target.value))}
          className="flex-1 accent-green-500"
          aria-label="Seek through the current track"
        />

        <span className="text-xs text-zinc-400 w-10 text-right">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default NowPlayingBar;

