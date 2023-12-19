import React, { useEffect, useState } from 'react'
import SingleSongCard from '../common/SingleSongCard';
import { getLikedSongs } from '../../apiCalling/song';
import { useCookies } from 'react-cookie';

const LikedSongs = () => {
  const [data, setData] = useState([]);
  const [cookie, setCookie] = useCookies(["token"])
  useEffect(()=> {
    const getData = async () => {
      const response = await getLikedSongs(cookie.token);
      setData(response.data.songsDetails[0].likedSongs);
    }
    getData()
  }, [])
  return (
    <div className='text-white'>
      {
        data.length === 0 ? (<div className='ml-96 mt-80 font-extrabold text-6xl text-white'>No Liked Song</div>) : (data.map((item, index) => (
          <SingleSongCard key={index} info={item} />
        )))
      }
    </div>
  )
}

export default LikedSongs