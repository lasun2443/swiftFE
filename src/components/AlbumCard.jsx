import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AlbumCard({ album }) {
  const navigate = useNavigate();

  const handleAlbumClick = () => {
    // Navigate to album page using the album ID
    navigate(`/album/${album.id}`);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation(); // Prevent navigation when play button is clicked
    // Add play functionality here (play the first track, etc.)
    console.log('Play album:', album.title);
  };

  return (
    <div 
      className="group cursor-pointer"
      onClick={handleAlbumClick}
    >
      <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-zinc-800">
        <img
          src={album.coverImage.url}
          alt={album.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={handlePlayClick}
            className="bg-green-500 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform hover:bg-green-600"
          >
            <Play className="w-5 h-5 text-white fill-white" />
          </button>
        </div>
      </div>
      <h3 className="font-semibold text-sm sm:text-base truncate">
        {album.title}
      </h3>
      <p className="text-xs text-gray-400">
        {album.artistId?.artistName} • {new Date(album.releaseDate).getFullYear()}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        {album.totalTracks} tracks • {album.formattedDuration}
      </p>
    </div>
  );
}

export default AlbumCard;