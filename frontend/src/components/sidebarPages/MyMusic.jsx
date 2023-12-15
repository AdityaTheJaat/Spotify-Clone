import React, { useEffect, useState } from 'react';
import SingleSongCard from '../common/SingleSongCard';
import { getMySongs } from '../../apiCalling/song';
import { useCookies } from 'react-cookie';
import { Howl } from 'howler';
import { Link } from 'react-router-dom';

const MyMusic = () => {
  const [cookie] = useCookies(["token"]);
  const [songsData, setSongsData] = useState([]);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const playSound = (songSrc) => {
    if(soundPlayed){
      soundPlayed.stop()
    }
    let sound = new Howl({
      src:[songSrc],
      html5:true
    })
    setSoundPlayed(sound);
    sound.play();
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMySongs(cookie.token);
        const songsArray = response || [];
        setSongsData(songsArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if(cookie.token) fetchData();
  }, [cookie.token]);
  return (
    <div className='p-8 overflow-auto'>
      <div className='text-white text-xl font-semibold pb-4 pl-2'>My Songs</div>
      <div className='space-y-2 overflow-auto'>
        {
          songsData.length === 0 ? (<div className='ml-96 mt-80 font-extrabold text-6xl text-white'>No Songs to display!<br /><span className='text-xl font-bold ml-48'><Link className="underline" to="/home/uploadSong">ClickHere</Link> to upload</span></div>) :
          (songsData.map((item, index) => (
            <SingleSongCard key={index} info={item} playSound={playSound} song={songsData} />
          )))
        }
      </div>
    </div>
  );
};

export default MyMusic