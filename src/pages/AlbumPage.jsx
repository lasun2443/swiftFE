import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Play, Pause, Shuffle, Heart, MoreHorizontal, ArrowLeft } from 'lucide-react';

function AlbumPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`https://musicappbe.onrender.com/api/albums/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (response.data.success) {
          console.log('Album API Response:', response.data);
          setAlbum(response.data.data);
          
          
          if (response.data.data.tracks) {
            const songData = response.data.data.tracks
              .map(track => track.songId) 
              .filter(song => song); 
            
            console.log('Extracted songs:', songData);
            setSongs(songData);
          }
        }
      } catch (error) {
        console.error('Error fetching album:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [id]);

  // Format bio into paragraphs
  const formatBio = (bio) => {
    if (!bio) return [];
    // Split by sentences and group into paragraphs
    const sentences = bio.split('",\n  "').map(sentence => 
      sentence.replace(/^"/, '').replace(/"$/, '').trim()
    );
    return sentences;
  };

  const handlePlayAlbum = () => {
    if (songs.length > 0) {
      // Play the first song in the album
      playSong(songs[0]);
    }
  };

  const handlePlaySong = (song) => {
    if (currentPlaying?.id === song.id && isPlaying) {

      audioRef.current.pause();
      setIsPlaying(false);
    } else {
 
      playSong(song);
    }
  };

  const playSong = (song) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }


    const audio = new Audio(song.audioFile?.url);
    audioRef.current = audio;
    
    audio.play().then(() => {
      setCurrentPlaying(song);
      setIsPlaying(true);
    }).catch(error => {
      console.error('Error playing song:', error);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentPlaying(null);
    });

    audio.addEventListener('pause', () => {
      setIsPlaying(false);
    });
  };

  const handleShuffle = () => {
    if (songs.length > 0) {
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      playSong(randomSong);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white p-8">
        <div className="animate-pulse flex items-center space-x-4">
          <div className="rounded-full bg-zinc-700 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-zinc-700 rounded"></div>
              <div className="h-4 bg-zinc-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Album not found</h2>
          <button 
            onClick={() => navigate(-1)}
            className="text-green-500 hover:text-green-400"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 sm:p-8">

      <button 
        onClick={() => navigate(-1)}
        className="mb-6 p-2 rounded-full hover:bg-zinc-800 transition-colors"
      >
        <ArrowLeft size={24} />
      </button>


      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end mb-8">
        <div className="w-48 h-48 md:w-60 md:h-60 flex-shrink-0">
          <img
            src={album.coverImage.url}
            alt={album.title}
            className="w-full h-full object-cover rounded-lg shadow-2xl"
          />
        </div>
        
        <div className="flex-1">
          <p className="text-sm font-medium mb-2">ALBUM</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{album.title}</h1>
          
          <div className="flex items-center text-sm text-gray-300 mb-2">
            {album.profilePicture?.url && (
              <img
                src={album.profilePicture.url}
                alt={album.artistName}
                className="w-6 h-6 rounded-full mr-2"
              />
            )}
            <span className="font-semibold">{album.artistName}</span>
            <span className="mx-2">•</span>
            <span>{new Date(album.releaseDate).getFullYear()}</span>
            <span className="mx-2">•</span>
            <span>{songs.length} songs</span>
            <span className="mx-2">•</span>
            <span>{album.formattedDuration}</span>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handlePlayAlbum}
              className="bg-green-500 hover:bg-green-600 rounded-full p-3 transition-colors flex items-center justify-center"
            >
              <Play className="w-6 h-6 text-black fill-black" />
            </button>
            
            <button
              onClick={handleShuffle}
              className="text-gray-400 hover:text-white transition-colors p-2"
              title="Shuffle"
            >
              <Shuffle size={24} />
            </button>
            
            <button className="text-gray-400 hover:text-white transition-colors p-2" title="Like">
              <Heart size={24} />
            </button>
            
            <button className="text-gray-400 hover:text-white transition-colors p-2" title="More options">
              <MoreHorizontal size={24} />
            </button>
          </div>
        </div>
      </div>

 
      {album.artistId.bio&& (
        <div className="mb-8 p-6 bg-zinc-800 rounded-lg">
          <h3 className="text-xl font-bold mb-4">About {album.artistId.artistName}</h3>
          <div className="space-y-3 text-gray-300">
            {formatBio(album.artistId.bio).map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}


      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Songs</h2>
        
        {songs.length > 0 ? (
          <div className="space-y-1">
            {songs.map((song, index) => {
              const isCurrentSong = currentPlaying?.id === song.id;
              const isSongPlaying = isCurrentSong && isPlaying;
              
              return (
                <div
                  key={song.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-800 transition-colors group cursor-pointer"
                  onClick={() => handlePlaySong(song)}
                >
                  <div className="w-8 text-center text-gray-400">
                    {isCurrentSong ? (
                      <div className="flex items-center justify-center">
                        {isSongPlaying ? (
                          <div className="flex space-x-1">
                            <div className="w-1 h-3 bg-green-500 animate-pulse"></div>
                            <div className="w-1 h-3 bg-green-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-1 h-3 bg-green-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                          </div>
                        ) : (
                          <Play size={14} className="text-green-500" />
                        )}
                      </div>
                    ) : (
                      <>
                        <span className="group-hover:hidden">{index + 1}</span>
                        <Play size={14} className="hidden group-hover:block text-gray-400" />
                      </>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-medium ${isCurrentSong ? 'text-green-500' : 'text-white'}`}>
                      {song.title}
                    </h3>
                    <p className="text-sm text-gray-400">{album.artistName}</p>
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    {song.audioFile?.duration ? formatDuration(song.audioFile.duration) : song.formattedDuration || '0:00'}
                  </div>
                  
                  <button 
                    className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    onClick={(e) => {
                      e.stopPropagation();

                    }}
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            No songs available in this album
          </div>
        )}
      </div>
    </div>
  );
}


const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default AlbumPage;