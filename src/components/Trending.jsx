import React, { useEffect, useState } from 'react'
import AlbumCard from './AlbumCard'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Trending = () => {
    const [albums, setalbums] = useState([])
  let token = localStorage.getItem("accessToken")
  useEffect(() => {
    const fetchFeatured=async()=>{
      try {
        let url ="https://musicappbe.onrender.com/api/albums/trending"
      let response = await axios.get(url, {
        headers:{
          "Content-Type": "Application/json",
          "Authorization":`Bearer ${token}`
        }
      })
      if(response.data.success){
        let data = response.data.data
        console.log(data)
        setalbums(data)
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
            <h2 className="text-2xl font-bold">Trending Albums</h2>
            <Link
              to="/albums"
              className="text-sm text-green-400 hover:text-green-300"
            >
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {albums.map((album) => (
              <AlbumCard key={album._id} album={album} />
            ))}
          </div>
        </section>
  )
}

export default Trending