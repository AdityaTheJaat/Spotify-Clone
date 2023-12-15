import React, { useContext, useEffect, useState } from 'react'
import Card from '../common/Card'
import { getMyPlaylist } from '../../apiCalling/playlist';
import { useCookies } from 'react-cookie';
import SongContext from '../../context/SongContext';
import { Link } from 'react-router-dom';

const Library = () => {
  const [playlists, setPlaylists] = useState([]);
  const [cookie, setCookie] = useCookies(["token"])
  const {setCurrentPlaylist, setPlaylistOpen} = useContext(SongContext)
  useEffect(()=> {
    const getData = async () => {
      try{
        const response = await getMyPlaylist(cookie.token)
        setPlaylists(response?.data?.playlistDetails)
      } catch(err){
        console.log(err)
      }
    }
    if(cookie.token) getData();
  }, [cookie.token])
  return (
    <>
    {
      playlists?.length === 0 ? (<div className='ml-96 mt-80 font-extrabold text-6xl text-white'>No Playlists to display!<br /><span className='text-xl font-bold ml-48'><Link className="underline" to="/home/createPlaylist">ClickHere</Link> to upload</span></div>) :
      (<div className='py-5 px-3 grid gap-5 grid-cols-5'>
      {
        (playlists?.map((item, index)=>(
          <div key={index} onClick={()=> {setCurrentPlaylist(item); setPlaylistOpen(true)}}>
            <Card
              title={item.name}
              imgUrl={item.thumbnail}
              description=""
              />
          </div>
        )))
      }
    </div>)
    }
  </>
  )
}

export default Library