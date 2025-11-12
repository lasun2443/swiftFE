import React, { useMemo, useState } from "react";
import { Play, Pause, Heart, HeartOff } from "lucide-react";
import { usePlayer } from "../context/PlayerContext.jsx";

function SongCard({ id, title, artist, cover, duration, audioUrl }) {
  const [liked, setLiked] = useState(false);
  const { currentTrack, isPlaying, playTrack, pause, resume } = usePlayer();

  const isCurrentTrack = currentTrack?.id === id;
  const isCurrentTrackPlaying = isCurrentTrack && isPlaying;

  // Format duration from seconds to MM:SS
  const formattedDuration = useMemo(() => {
    if (!duration || Number.isNaN(duration)) return "0:00";

    const mins = Math.floor(duration / 60);
    const secs = Math.floor(duration % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, [duration]);

  const handleToggle = (event) => {
    event.stopPropagation();

    if (!audioUrl) {
      console.warn("Track does not have an audioUrl");
      return;
    }

    if (isCurrentTrack) {
      if (isPlaying) {
        pause();
      } else {
        resume();
      }
    } else {
      playTrack({ id, title, artist, cover, duration, audioUrl });
    }
  };

  return (
    <div className="group cursor-pointer bg-zinc-900 rounded-lg p-3 hover:bg-zinc-800 transition-all">
      <div className="relative aspect-square rounded-md overflow-hidden mb-3 bg-zinc-800">
        <img
          src={cover}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Play/Pause Button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={handleToggle}
            className="bg-green-500 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform hover:bg-green-600"
          >
            {isCurrentTrackPlaying ? (
              <Pause className="w-5 h-5 text-white fill-white" />
            ) : (
              <Play className="w-5 h-5 text-white fill-white" />
            )}
          </button>
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
        >
          {liked ? (
            <Heart className="fill-red-500 text-red-500" size={16} />
          ) : (
            <HeartOff className="text-white" size={16} />
          )}
        </button>
      </div>

      <h3 className="font-semibold text-sm truncate">{title}</h3>
      <div className="flex items-center justify-between mt-1">
        <p className="text-xs text-gray-400 truncate flex-1">{artist}</p>
        <p className="text-xs text-gray-500">{formattedDuration}</p>
      </div>

      {isCurrentTrack && (
        <div className="mt-2 rounded bg-green-500/10 text-green-400 text-[11px] font-medium py-1 px-2 inline-flex items-center gap-1">
          {isCurrentTrackPlaying ? "Playing" : "Paused"}
        </div>
      )}
    </div>
  );
}

export default SongCard;