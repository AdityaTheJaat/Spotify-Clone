import React, { useContext, useEffect, useState } from 'react'
import bheart from '../../resources/b-heart.svg'
import wheart from '../../resources/w-heart.svg'
import { useCookies } from 'react-cookie';
import SongContext from '../../context/SongContext'
import { getMyPlaylist } from '../../apiCalling/playlist';
import AddToPlaylistBtn from '../button/AddToPlaylistBtn';
import { likeSong, unLikeSong } from '../../apiCalling/song';

const SingleSongCard = ({info}) => {
  const [playlists, setPlaylists] = useState([]);
  const [cookie, setCookie] = useCookies(["token"]);
  const [isLiked, setIsLiked] = useState(false)
  const clickHandler = async (e) => {
    setCurrentModal(true);
  }
  useEffect(()=> {
    const getData = async () => {
      const response = await getMyPlaylist(cookie.token)
      setPlaylists(response.data.playlistDetails)
    }
    getData()
  }, [])
  const { setCurrentSong, setCurrentModal, currentSong } = useContext(SongContext)
  // const likeHandler = async () => {
  //   if(currentSong){
  //     const response = await likeSong(cookie.token, currentSong)
  //     if(response){
  //       setLike(true)
  //     }
  //     console.log(response)
  //   }
  // }
  // const unLikeHandler = async () => {
  //   if(currentSong){
  //     const response = await unLikeSong(cookie.token, currentSong)
  //     if(response){
  //       setLike(false)
  //     }
  //     console.log(response)
  //   }
  // }
  const likeHandler = async () => {
    try {
      if (!isLiked) {
        await likeSong(cookie.token, currentSong);
      } else {
        await unLikeSong(cookie.token, currentSong);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error while liking/unLiking song:', error);
    }
  };
  if(!info){
    return
  }
  return (
    <div className='flex items-center hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm' onClick={()=>{setCurrentSong(info); }}>
      <div 
        className='w-12 h-12 bg-cover bg-center'
        style={{
          backgroundImage:`url(${info.thumbnail})`
        }}
      /> 
      <div className='flex w-full'>
        <div className='text-white flex justify-center flex-col pl-4 w-5/6'>
          <div className='hover:underline cursor-pointer'>{info.name}</div>
          {
            info.artist ? (<div className='text-xs text-gray-400 hover:underline cursor-pointer'>{info.artist.firstName} {info.artist.lastName}</div>) : 
            ( 
              info.owner ? (<div className='text-xs text-gray-400 hover:underline cursor-pointer'>{info.owner.firstName} {info.owner.lastName}</div>) : (<div className='text-xs text-gray-400 hover:underline cursor-pointer'>{info.firstName} {info.lastName}</div>)
            )
          }
          
        </div>
      </div>
      <div className='w-1/4 flex justify-end gap-5 h-full text-white my-auto'>
        <AddToPlaylistBtn onClick={clickHandler} />
        {/* <button onClick={likeHandler}>
          {
            isLiked ? (<div className='flex-col cursor-pointer'>
                        <img src={bheart} alt="" className='w-7 h-7 mx-auto' />
                        <p className="text-xs">Like</p>
                      </div>) : 
                      (<div className='flex-col cursor-pointer'>
                      <img src={wheart} alt="" className='w-7 h-7 mx-auto flex my-auto' />
                      <p className="text-xs">Unlike</p>
                    </div>)
          }
        </button> */}
      </div>
    </div>
  )
}

export default SingleSongCard