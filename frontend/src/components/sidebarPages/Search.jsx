import React, { useState } from 'react'
import search from '../../resources/search.svg'
import { getSong } from '../../apiCalling/song'
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import SingleSongCard from '../common/SingleSongCard';

const Search = () => {
  const [text, setText] = useState("")
  const [cookie, setCookie] = useCookies(["token"])
  const [songData, setSongData] = useState(null)
  const searchSong = async () => {
    const response = await getSong(cookie.token, text);
    setText("")
    const data = response.data.song
    if(!data){
      toast.error("No song with this name!")
      return
    }
    setSongData(data);
    toast.success("Song Fetched")
  }
  const handleKeyDown = (event) => {
    if(event.key === "Enter"){
      event.preventDefault();
      searchSong();
    }
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex w-full relative justify-center items-center'>
        <img src={search} alt="" className='w-6 h-6 absolute mr-[500px] mt-5' />
        <input 
          type='text'
          placeholder='What do you want to listen?'
          value={text}
          onKeyDown={handleKeyDown}
          onChange={(e) => {setText(e.target.value)}}
          className='rounded-full w-1/2 p-5 mt-5 pl-12 bg-slate-700 text-white '
        />
      </div>
      <div className='mt-10 w-full px-5 rounded-full hover:bg-gray-400 hover:bg-opacity-20'>
        <SingleSongCard info={songData} />
      </div>
    </div>
  )
}

export default Search