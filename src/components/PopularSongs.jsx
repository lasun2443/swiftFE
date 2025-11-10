import axios from "axios";
import { useEffect, useState } from "react";
import SongSection from "./SongSection";

function PopularSongs() {
    const [songs, setSongs] = useState([]);
    const token = localStorage.getItem("accessToken");
    
    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                let url = "https://musicappbe.onrender.com/api/songs/popular?limit=10";
                let response = await axios.get(url, {
                    headers: {
                        "Content-Type": "Application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                console.log(response.data)
                if (response.data.success) {
                    let data = response.data.data;
                    setSongs(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchFeatured();
    }, [token]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Popular Songs</h2>
            <SongSection songs={songs} />
        </div>
    );
}

export default PopularSongs;