// // src/pages/Library.jsx (Fixed)
// import React, { useEffect, useState } from "react";
// import PlaylistCard from "../components/PlaylistCard";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// export default function Lib() {
//     const [isLoading, setIsLoading] = useState(true); // Renamed setisLoading to setIsLoading
//     const [playlists, setPlaylists] = useState([]);
//     const { id } = useParams();
//     // console.log("User ID from params:", id); // Removed this as 'id' from params is likely not used here

//     useEffect(() => {
//         // Retrieve user data inside useEffect to ensure consistency
//         let user = localStorage.getItem("user");
//         user = user ? JSON.parse(user) : null;

//         const fetchPlaylists = async () => {
//             if (!user || !user.id) {
//                 console.error("User ID not found, cannot fetch playlists.");
//                 setIsLoading(false);
//                 return; // Exit early if no user ID
//             }

//             try {
//                 setIsLoading(true);
//                 // Correct way: use 'await' to wait for the response
//                 const response = await axios.get(`https://musicappbe.onrender.com/api/playlists/${user.id}`);
                
//                 console.log("API Response Data:", response.data); 
//                 setPlaylists(response.data.playlists || []); // Use optional chaining or fallback array
//                 setIsLoading(false);
//             } catch (error) {
//                 console.error("Error fetching playlists:", error.response?.data || error.message);
//                 setIsLoading(false); // Make sure to stop loading state even on error
//             }
//         }

//         fetchPlaylists();
//   }, []); // Empty dependency array means this runs once on mount
  

//   return (
//     <div className="p-6">
//       {isLoading ? (
//         <div className="text-black h-screen flex items-center justify-center">Loading...</div>
//       ) : (
//         <div>
//           <h2 className="text-2xl font-bold mb-6">Your Playlists</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//             {/* {playlists.length > 0 ? ( // Check if length is greater than 0
//               playlists.map((p) => <PlaylistCard key={p._id} playlist={p} />)
//             ) : (
//               <p className="text-gray-400">No playlists yet. Create one!</p>
//             )} */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import React from 'react'

const Lib = () => {
  return (
    <div>Lib</div>
  )
}

export default Lib