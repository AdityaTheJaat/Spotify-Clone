import axios from "axios"
import { toast } from "react-hot-toast"

const URL = process.env.REACT_APP_BACKEND_URL + "/playlist";

export const createPlaylist = async (body, token) => {
  const toastId = toast.loading("Loading...")
  try{
    const response = await axios.post(URL+"/createPlaylist", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(response)
    console.log("Playlist Created!")
    toast.dismiss(toastId)
    return response
  } catch(err){
    console.log(err)
    console.log("Error while creating playlist!")
  }
  toast.dismiss(toastId)
}

export const getMyPlaylist = async (token) => {
  try{
    const response = await axios.get(URL+"/getPlaylistByMe", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch(err){
    console.log(err)
    console.log("Error while fetching playlist!")
  }
}

export const addToPlaylist = async (token, playlistId, songId) => {
  const toastId = toast.loading("Loading...")
  const body = { playlistId, songId }
  try{
    const response = await axios.post(URL+"/addSongToPlaylist", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    toast.dismiss(toastId)
    return response
  } catch(err){
    console.log(err)
    console.log("Error while adding song to playlist!")
  }
  toast.dismiss(toastId)
}