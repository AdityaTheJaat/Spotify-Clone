import React, { useEffect, useState } from 'react';
import SingleSongCard from '../common/SingleSongCard';
import { getMySongs } from '../../apiCalling/song';
import { useCookies } from 'react-cookie';
import { Howl } from 'howler';

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
    fetchData();
  }, [cookie.token]);
  return (
    <div className='p-8 overflow-auto'>
      <div className='text-white text-xl font-semibold pb-4 pl-2'>My Songs</div>
      <div className='space-y-2 overflow-auto'>
        {songsData.map((item, index) => (
          <SingleSongCard key={index} info={item} playSound={playSound} song={songsData} />
        ))}
      </div>
    </div>
  );
};

export default MyMusic