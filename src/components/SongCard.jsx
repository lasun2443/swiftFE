import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Heart, HeartOff } from 'lucide-react'; 

function SongCard({ title, artist, cover, duration, audioUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const audioRef = useRef(null);

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle audio ended
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="group cursor-pointer bg-zinc-900 rounded-lg p-3 hover:bg-zinc-800 transition-all">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
      />
      
      <div className="relative aspect-square rounded-md overflow-hidden mb-3 bg-zinc-800">
        <img
          src={cover}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Play/Pause Button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}
            className="bg-green-500 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform hover:bg-green-600"
          >
            {isPlaying ? (
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
        <p className="text-xs text-gray-500">{formatDuration(duration)}</p>
      </div>
    </div>
  );
}

export default SongCard;