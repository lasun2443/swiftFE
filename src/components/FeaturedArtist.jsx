import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from "react-router-dom";
import ArtistCard from './ArtistCard';
import axios from 'axios';
const FeaturedArtist = () => {
  const [artistt, setartistt] = useState([])
  let token = localStorage.getItem("accessToken")
  let navigate =useNavigate()
  useEffect(() => {
    const fetchFeatured=async()=>{
      try {
        let url ="https://musicappbe.onrender.com/api/artists/featured"
      let response = await axios.get(url, {
        headers:{
          "Content-Type": "Application/json",
          "Authorization":`Bearer ${token}`
        }
      })
      if(response.data.success){
        let data = response.data.data
        setartistt(data)
      }
      else if(response.status==400){
        navigate('/login')
      }
      } catch (error) {
        console.log(error)
      }

      
    }

    fetchFeatured()
  }, [])
  
  return (
    <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Featured Artists</h2>
            <Link
              to="/artists"
              className="text-sm text-green-400 hover:text-green-300"
            >
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {artistt.slice(0,5).map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>
  )
}

export default FeaturedArtist