import React, { useContext, useEffect, useState } from 'react'
import add from '../../resources/add.svg'
import { useCookies } from 'react-cookie';
import SongContext from '../../context/SongContext'
import { addToPlaylist } from '../../apiCalling/playlist';

const SinglePlaylistCard = ({item, song}) => {
  const [cookie, setCookie] = useCookies(["token"])
  const AddToPlaylist = async () => {
    await addToPlaylist(cookie.token, item._id, song._id)
  }
  console.log(item)
  const { setCurrentPlaylist } = useContext(SongContext)
  if(!item || !song){
    return
  }
  const clickHandler = () => {
    setCurrentPlaylist(item)
  }
  return (
    <div className='flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm' onClick={clickHandler}>
      <div 
        className='w-12 h-12 bg-cover bg-center'
        style={{
          backgroundImage:`url(${item.thumbnail})`
        }}
      /> 
      <div className='flex w-full'>
        <div className='text-white flex justify-center flex-col pl-4 w-5/6'>
          <div className='hover:underline cursor-pointer'>{item.name}</div>
          <div className='text-xs text-gray-400 hover:underline cursor-pointer'>{item.owner.firstName} {item.owner.lastName}</div>
        </div>
        <div className='w-1/6 text-gray-400 text-sm flex items-center justify-center'>
          <img src={add} alt='' onClick={AddToPlaylist} />
        </div>
      </div>
    </div>
  )
}

export default SinglePlaylistCard