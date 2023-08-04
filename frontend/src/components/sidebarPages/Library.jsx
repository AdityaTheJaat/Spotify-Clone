import React, { useContext, useEffect, useState } from 'react'
import Card from '../common/Card'
import { getMyPlaylist } from '../../apiCalling/playlist';
import { useCookies } from 'react-cookie';
import SongContext from '../../context/SongContext';

const Library = () => {
  const [playlists, setPlaylists] = useState([]);
  const [cookie, setCookie] = useCookies(["token"])
  const {setCurrentPlaylist, setPlaylistOpen} = useContext(SongContext)
  useEffect(()=> {
    const getData = async () => {
      const response = await getMyPlaylist(cookie.token)
      setPlaylists(response.data.playlistDetails)
    }
    getData()
  }, [])
  console.log(playlists)
  return (
    <div className='py-5 px-3 grid gap-5 grid-cols-5'>
      {
        playlists.map((item, index)=>(
          <div key={index} onClick={()=> {setCurrentPlaylist(item); setPlaylistOpen(true)}}>
            <Card
              title={item.name}
              imgUrl={item.thumbnail}
              description=""
            />
          </div>
        ))
      }
    </div>
  )
}

export default Library