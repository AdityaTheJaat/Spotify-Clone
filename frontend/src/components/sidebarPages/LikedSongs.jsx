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
      console.log(response)
      setData(response.data.songsDetails[0].likedSongs);
    }
    getData()
  }, [])
  return (
    <div className='text-white'>
      {
        data.map((item, index) => (
          <SingleSongCard key={index} info={item} />
        ))
      }
    </div>
  )
}

export default LikedSongs