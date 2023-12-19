import axios from "axios"
import { toast } from "react-hot-toast"

const URL = process.env.REACT_APP_BACKEND_URL + "/songs";

export const createSong = async (body, navigate, token) => {
  const toastId = toast.loading("Loading...")
  try{
    const response = await axios.post(URL+"/createSong", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(response)
    console.log("Song Created!")
    toast.dismiss(toastId)
    navigate('/home/playlistsPage')
    return response
  } catch(err){
    console.log(err)
    console.log("Error while creating song!")
  }
  toast.dismiss(toastId)
}

export const getMySongs = async (token) => {
  try{
    const response = await axios.get(URL+"/getMySongs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.songsDetails
  } catch(err){
    console.log(err)
    console.log("Error while fetching songs!")
  }
}

export const getSong = async (token, text) => {
  const toastId = toast.loading("Loading...")
  try{
    const response = await axios.get(URL+"/getSongByName/" + text, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    toast.dismiss(toastId)
    return response
  } catch(err){
    console.log(err)
    console.log("Error while searching song!")
  }
  toast.dismiss(toastId)
}

export const getLikedSongs = async (token) => {
  const toastId = toast.loading("Loading...")
  try{
    const response = await axios.get(URL+"/getLikedSongs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    toast.dismiss(toastId)
    return response
  } catch(err){
    console.log(err)
    console.log("Error while getting liked songs!")
  }
  toast.dismiss(toastId)
}

export const likeSong = async (token, body) => {
  try{
    const response = await axios.post(URL+"/likeSong", body,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch(err){
    console.log(err)
    console.log("Error while liking song!")
  }
}

export const unLikeSong = async (token, body) => {
  const toastId = toast.loading("Loading...")
  try{
    const response = await axios.post(URL+"/unLikeSong", body,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    toast.dismiss(toastId)
    return response
  } catch(err){
    console.log(err)
    console.log("Error while unLiking song!")
  }
  toast.dismiss(toastId)
}