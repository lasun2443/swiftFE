import { useState } from "react";
import SongCard from "./SongCard";

const SongSection = ({ songs }) => {
    const [showAll, setShowAll] = useState(false);
    const visibleSongs = showAll ? songs : songs.slice(0, 4);
  
    return (
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {visibleSongs.map((song) => {
            const artistName =
              song.artistId?.artistName ||
              song.artistName ||
              (typeof song.artist === "string" ? song.artist : "Unknown artist");

            return (
              <SongCard
                key={song.id ?? song.audioFile?.url}
                id={song.id ?? song.audioFile?.url}
                title={song.title ?? "Untitled track"}
                artist={artistName}
                cover={song.coverImage?.url || song.albumArtUrl || ""}
                duration={song.audioFile?.duration}
                audioUrl={song.audioFile?.url}
              />
            );
          })}
        </div>
  
        {songs.length > 4 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-green-500 border border-green-500 px-6 py-2 rounded-full hover:bg-green-600 hover:text-white transition-all text-sm font-medium"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    );
  }
  
  export default SongSection;