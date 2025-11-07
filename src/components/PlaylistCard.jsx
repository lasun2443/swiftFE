import React, { useState } from "react";
import { Play, Heart, HeartOff } from "lucide-react";

export default function PlaylistCard({ name, description, cover}) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition group cursor-pointer">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3">
        <img src={cover} alt={name} className="w-full h-full object-cover" />

        {/* Play Button */}
        <button className="absolute bottom-2 right-2 bg-green-500 text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
          <Play size={18} />
        </button>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-2 right-2 bg-black/60 p-2 rounded-full"
        >
          {liked ? (
            <Heart className="fill-red-500 text-red-500" size={18} />
          ) : (
            <HeartOff className="text-white" size={18} />
          )}
        </button>
      </div>

      <h3 className="font-semibold text-sm truncate">{name}</h3>
      <p className="text-xs text-gray-400 truncate">{description}</p>
    </div>
  );
}
