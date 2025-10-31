import React from "react";
import { Play } from "lucide-react";

export default function PlaylistCard({ name, description, cover }) {
  return (
    <div className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition group cursor-pointer">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3">
        <img src={cover} alt={name} className="w-full h-full object-cover" />
        <button className="absolute bottom-2 right-2 bg-green-500 text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
          <Play size={18} />
        </button>
      </div>
      <h3 className="font-semibold text-sm truncate">{name}</h3>
      <p className="text-xs text-gray-400 truncate">{description}</p>
    </div>
  );
}