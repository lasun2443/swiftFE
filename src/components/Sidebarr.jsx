import React, { useState } from "react";
import { Home, Library, Search, Menu, X, PlusCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
// import { useAppContext } from "../context/AppContext.jsx";

const Sidebarr = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
//   const { currentSong } = useAppContext();

  const navLinks = [
    { to: "/", label: "Home", icon: <Home size={20} /> },
    { to: "/search", label: "Search", icon: <Search size={20} /> },
    { to: "/library", label: "Library", icon: <Library size={20} /> },
  ];

  return (
    <>
      {/* ===== Desktop Sidebar ===== */}
      <div className="hidden md:flex flex-col h-screen w-60 bg-zinc-900 text-white p-5">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-2">
          <img src="/assets/images/logo.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-lg font-bold">SwiftBeats</h1>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                location.pathname === link.to
                  ? "bg-green-600 text-white"
                  : "hover:bg-zinc-800"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}

          {/* Create Playlist Section */}
          <Link
            to="/create-playlist"
            className="flex items-center gap-3 px-3 py-2 mt-3 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-all"
          >
            <PlusCircle size={20} />
            <span>Create Playlist</span>
          </Link>
        </nav>

        {/* Now Playing */}
        <div className="flex-grow" />
        <div className="border-t border-zinc-700 pt-4 text-sm text-gray-400">
          {/* <p>Now Playing: {currentSong ? currentSong.title : "None"}</p> */}
        </div>
      </div>

      {/* ===== Mobile Top Bar ===== */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-zinc-900 text-white flex items-center justify-between p-4 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <img src="/assets/images/logo.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-lg font-semibold">SwiftBeats</h1>
        </div>
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ===== Mobile Slide-in Menu ===== */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-950 text-white transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 md:hidden`}
      >
        <div className="p-5 flex justify-between items-center border-b border-zinc-800">
          <h1 className="text-lg font-bold">Menu</h1>
          <button onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 mt-6 px-5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                location.pathname === link.to
                  ? "bg-green-600 text-white"
                  : "hover:bg-zinc-800"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}

          {/* Create Playlist (Mobile) */}
          <Link
            to="/create-playlist"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2 mt-2 rounded-md bg-green-500 hover:bg-green-600 text-white"
          >
            <PlusCircle size={20} />
            <span>Create Playlist</span>
          </Link>
        </nav>
      </div>

      {/* Background overlay when menu is open */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebarr;
