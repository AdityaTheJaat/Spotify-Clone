import React, { useContext, useState, useEffect } from 'react'
import PlaylistView from './PlaylistView'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import SinglePlaylistCard from './common/SinglePlaylistCard';
import SongContext from '../context/SongContext'
import { getMyPlaylist } from '../apiCalling/playlist';
import SingleSongCard from './common/SingleSongCard'

const focusData = [
  {
    id: "1",
    title: "Peaceful Piano",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    imgUrl: "data:image/jpeg;base64,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"
  },
  {
    id: "2",
    title: "Deep Focus",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    imgUrl: "data:image/jpeg;base64,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"
  },
  {
    id: "3",
    title: "Instrumental Stud",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT12MpeMiHZTNPWhGB4OdbVGPNcbNeAlylkZA&usqp=CAU"
  },
  {
    id: "4",
    title: "Focus Flow",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    imgUrl: "data:image/jpeg;base64,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"
  },
  {
    id: "5",
    title: "Workday Lounge",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    imgUrl: "data:image/jpeg;base64,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"
  },
]


const HomePage = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const getData = async () => {
      if(cookie.token){
        const response = await getMyPlaylist(cookie.token)
        setPlaylists(response?.data?.playlistDetails)
      }
    }
    if(cookie.token) getData();
  }, [cookie.token])
  const { currentModal, setCurrentModal, currentSong, currentPlaylist, playlistOpen, setPlaylistOpen } = useContext(SongContext)
  const clickHandler = () => {
    setCurrentModal(false)
  }
  return (
    <div className='w-full h-full flex bg-black p-3 gap-2'>
      <Sidebar />
      <div className='h-full w-[77%] overflow-auto rounded-xl bg-gradient-to-b from-[#1f2728] via-[#131618] to-[#070808]'>
        <Navbar />
        {
          currentModal ?
            (<div className='bg-slate-900 w-full h-[80%] bg-opacity-70 p-8'>
              <button onClick={clickHandler} className='text-white'>Back</button>
              <div className='bg-slate-600 w-[50%] h-[50%] overflow-auto rounded-lg m-auto'>
                <p className='text-white p-5 text-xl font-bold'>Select Playlist</p>
                {
                  playlists.map((item) => (
                    <SinglePlaylistCard key={item._id} item={item} song={currentSong} />
                  ))
                }
              </div>
            </div>) :
            (
              <div>
                {
                  playlistOpen ? (<div>
                    <button className='text-white text-lg p-5' onClick={() => { setPlaylistOpen(false) }}>Back</button>
                    {
                      currentPlaylist.songs.map((song, index) => (
                        <SingleSongCard key={index} info={song} />
                      ))
                    }
                  </div>) : (<Outlet />)
                }
              </div>
            )
        }

        {
          !cookie.token &&
          (
            <div className='h-full w-full overflow-auto rounded-xl bg-gradient-to-b from-[#1f2728] via-[#131618] to-[#070808]'>
              <PlaylistView title="Focus" data={focusData} />
              <PlaylistView title="Spotify Playlist" data={focusData} />
              <PlaylistView title="Sound of India" data={focusData} />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default HomePage