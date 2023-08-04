import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import CloudinaryUpload from '../utils/CloudinaryUpload';
import { useCookies } from 'react-cookie';
import { createSong } from '../apiCalling/song';

const UploadSong = () => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [track, setTrack] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState("");
  const [uploadedImgFileName, setUploadedImgFileName] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {name, thumbnail, track};
    console.log(data)
    const response = await createSong(data, navigate, cookie.token);
    if(response){
      toast.success("Uploaded Successful!")
    }
    else{
      toast.error("Upload failed!")
    }
  }
  return (
    <div className='h-full w-full bg-gradient-to-b from-[#1f2728] via-[#131618] to-[#070808]'>
      <form onSubmit={submitHandler} className='md:w-[80%] md:mt-10 bg-[#070808] space-y-5 text-white rounded-xl mx-auto flex flex-col items-center justify-center p-20'>
        <p className='text-3xl md:text-5xl font-bold'>UPLOAD YOUR MUSIC</p>
        <div className='h-[1px] w-96 bg-gray-700 my-3'></div>
        <div>
          <label htmlFor='name'>Name</label>
          <input 
            name='name'
            type='text'
            id='name'
            placeholder='Song Name'
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            className="w-full rounded-[0.5rem] bg-slate-800 p-[12px]"
          />
        </div>
        {/* <div>
          <label htmlFor='thumbnail'>Thumbnail</label>
          <input 
            name='thumbnail'
            type="text"
            id='thumbnail'
            placeholder='Thumbnail'
            value={thumbnail}
            onChange={(e)=>{setThumbnail(e.target.value)}}
            className="w-full rounded-[0.5rem] bg-slate-800 p-[12px]"
          />
        </div> */}
        {
          uploadedImgFileName ? (<p className='bg-gray-500 rounded-2xl py-3 px-5 text-center text-lg text-white'>Thumbnail Uploaded: {uploadedImgFileName.substring(0, 20)}...</p>) : (<CloudinaryUpload setUrl={setThumbnail} setName={setUploadedImgFileName} text="Thumbnail" />)
        }
        {
          uploadedSongFileName ? (<p className='bg-gray-500 rounded-2xl py-3 px-5 text-center text-lg text-white'>Song Uploaded: {uploadedSongFileName.substring(0, 20)}....mp3</p>) : (<CloudinaryUpload setUrl={setTrack} setName={setUploadedSongFileName} text="Track" />)
        }
        <button type='submit' className='bg-green-500 rounded-2xl py-3 w-[30%] px-2'>Upload</button>
      </form>
    </div>
  )
}

export default UploadSong