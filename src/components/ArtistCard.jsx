import { Play } from "lucide-react";

function ArtistCard({ artist }) {
    return (
      <div className="group cursor-pointer">
        <div className="relative aspect-square rounded-full overflow-hidden mb-3 bg-zinc-800">
          <img
            src={artist.profilePicture.url}
            alt={artist.artistName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button className="bg-green-500 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform">
              <Play className="w-5 h-5 text-white fill-white" />
            </button>
          </div>
        </div>
        <h3 className="font-semibold text-sm sm:text-base truncate">
          {artist.artistName}
        </h3>
        <p className="text-xs text-gray-400">{artist.stats.totalFollowers}M followers</p>
      </div>
    );
  }

  export default ArtistCard;