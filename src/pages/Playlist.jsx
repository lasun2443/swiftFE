// src/pages/Library.jsx
import React, { useEffect, useState } from "react";


import PlaylistCard from "../components/PlaylistCard";
import axios from "axios";

export default function Playlist() {
    const [isLoading, setisLoading] = useState(true)
    const [playlists, setPlaylists] = useState([])
  useEffect(() => {
    const fetchPlaylists = async () => {
        try {
            setisLoading(true)
             let response = axios.get("https://musicappbe.onrender.com/api/user/playlists");
             console.log(response.data);
             setPlaylists(response.data.playlists);
             setisLoading(false)
        } catch (error) {
            console.error("Error fetching playlists:", error);
        }
    }

    fetchPlaylists();
  
 
  }, [])
  

  return (
    <div className="p-6">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Playlists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {playlists.length ? (
              playlists.map((p) => <PlaylistCard key={p._id} playlist={p} />)
            ) : (
              <p className="text-gray-400">No playlists yet. Create one!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}