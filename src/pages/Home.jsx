// src/pages/Home.jsx - Home page with complete UI

import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search as SearchIcon,
  Play,
  Pause,
  HeartOff,
  Heart,
} from "lucide-react";
import FeaturedArtist from "../components/FeaturedArtist";
import Trending from "../components/Trending";
import SongsSection from "../components/SongSection";
import PopularSongs from "../components/PopularSongs";
// import { logout } from "../redux/authSlice";

export default function Home() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");

  let user = localStorage.getItem("user");
  user = user ? JSON.parse(user) : null;

  // Demo data - replace with real data from API later
  const localSongs = [
    {
      id: 1,
      title: "Calm Down",
      artist: "Rema",
      cover:
        "https://res.cloudinary.com/dtj1k9kka/image/upload/v1761742903/music-app/images/l6otyw8mggq7zjpknoqs.jpg",
      duration: "3:45",
    },
    {
      id: 2,
      title: "Calm Down",
      artist: "Rema",
      cover:
        "https://res.cloudinary.com/dtj1k9kka/image/upload/v1761742903/music-app/images/l6otyw8mggq7zjpknoqs.jpg",
      duration: "3:45",
    },
    {
      id: 3,
      title: "Calm Down",
      artist: "Rema",
      cover:
        "https://res.cloudinary.com/dtj1k9kka/image/upload/v1761742903/music-app/images/l6otyw8mggq7zjpknoqs.jpg",
      duration: "3:45",
    },
    {
      id: 4,
      title: "Calm Down",
      artist: "Rema",
      cover:
        "https://res.cloudinary.com/dtj1k9kka/image/upload/v1761742903/music-app/images/l6otyw8mggq7zjpknoqs.jpg",
      duration: "3:45",
    },
  ];

 
  const genres = [
    "Afrobeats",
    "Hip Hop",
    "R&B",
    "Pop",
    "Reggae",
    "Dancehall",
    "Amapiano",
    "Gospel",
  ];

  const handleLogout = () => {
    // dispatch(logout());
    localStorage.clear()
    navigate("/login");
  };

  const handleMobileSearch = (e) => {
    e.preventDefault();
    setMenuOpen(false);

    if (mobileSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(mobileSearch.trim())}`);
      setMobileSearch("");
    }
  };

  // Header Component
  const Header = () => (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 bg-zinc-950 border-b border-zinc-800 backdrop-blur-sm bg-opacity-90">
      <div className="flex items-center gap-3">
        <h1 className="text-lg sm:text-2xl font-bold whitespace-nowrap">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <span className="text-green-500">SwiftBeats 🎶</span>
          </Link>
        </h1>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-4">
        <Link
          to={`/home`}
          className="text-sm text-gray-300 hover:text-green-400 transition"
        >
          Home
        </Link>
        <Link
          to={`/lib`}
          className="text-sm text-gray-300 hover:text-green-400 transition"
        >
          Library
        </Link>

        {/* Desktop Search */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const q = e.target.search?.value?.trim();
            if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
          }}
          className="hidden md:flex items-center"
        >
          <div className="relative">
            <input
              name="search"
              placeholder="Search songs, artists..."
              className="px-3 py-2 pl-9 rounded-lg bg-zinc-900 text-sm text-gray-200 placeholder:text-zinc-400 w-56 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          </div>
        </form>

        {user ? (
          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="text-sm text-gray-300 hover:text-green-400 transition"
            >
              {user.name}
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-full transition"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/signup"
              className="text-sm text-gray-300 hover:text-green-400 transition"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="text-sm bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-full transition"
            >
              Log In
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="sm:hidden flex items-center">
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
          className="p-2 rounded text-gray-300 hover:text-green-400 focus:outline-none"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );

  // Mobile Menu Component
  const MobileMenu = () =>
    menuOpen ? (
      <div className="sm:hidden absolute top-16 right-4 left-4 z-50 bg-zinc-900 border border-zinc-800 rounded-lg p-4 shadow-lg">
        <nav className="flex flex-col gap-3">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-white text-base font-medium hover:text-green-400"
          >
            Home
          </Link>
          <Link
            to="/library"
            onClick={() => setMenuOpen(false)}
            className="text-white text-base font-medium hover:text-green-400"
          >
            Library
          </Link>

          {/* Mobile Search */}
          <form
            onSubmit={handleMobileSearch}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                value={mobileSearch}
                onChange={(e) => setMobileSearch(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-3 py-2 rounded bg-zinc-800 text-white text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            </div>
            <button
              type="submit"
              className="px-3 py-2 rounded bg-green-500 text-white text-sm hover:bg-green-600"
            >
              Go
            </button>
          </form>

          <div className="border-t border-zinc-700 pt-3 mt-2">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block text-white text-sm mb-2 hover:text-green-400"
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-2 rounded-full"
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-sm hover:text-green-400"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-3 py-2 rounded-full text-center"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    ) : null;

  return (
    <div className="bg-zinc-950 min-h-screen text-white relative">
      <Header />
      <MobileMenu />

      <main className="p-4 sm:p-6 pb-32">
        {/* Hero Section */}
        <section className="mb-10 bg-gradient-to-r from-green-900/20 to-zinc-900/20 rounded-xl p-6 sm:p-8 border border-zinc-800">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Welcome to SwiftBeats{user ? `, ${user.name}` : ""}!
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Discover and stream millions of songs from your favorite artists
          </p>
        </section>

        {/* Featured Artists */}
        
        <FeaturedArtist/>
        {/* Trending Albums */}
        <Trending/>

        {/* Popular Songs */}
       <PopularSongs/>

        {/* Browse by Genre */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Browse by Genre</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => navigate(`/genre/${genre.toLowerCase()}`)}
                className="px-3 sm:px-4 py-2 bg-zinc-800 rounded-full hover:bg-green-600 transition-all text-sm sm:text-base"
              >
                {genre}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// Artist Card Component


// Album Card Component


// Song Card Component
function SongCard({ title, artist, cover, duration }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);

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
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
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
        <p className="text-xs text-gray-500">{duration}</p>
      </div>
    </div>
  );
}

// Songs Section with Show More/Less
// function SongsSection({ songs }) {
//   const [showAll, setShowAll] = useState(false);
//   const visibleSongs = showAll ? songs : songs.slice(0, 4);

//   return (
//     <div>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
//         {visibleSongs.map((song) => (
//           <SongCard key={song.id} {...song} />
//         ))}
//       </div>

//       {songs.length > 4 && (
//         <div className="flex justify-center mt-6">
//           <button
//             onClick={() => setShowAll(!showAll)}
//             className="text-green-500 border border-green-500 px-6 py-2 rounded-full hover:bg-green-600 hover:text-white transition-all text-sm font-medium"
//           >
//             {showAll ? "Show Less" : "Show More"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
