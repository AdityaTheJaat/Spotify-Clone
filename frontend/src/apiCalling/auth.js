import axios from "axios"
import { toast } from "react-hot-toast"

const URL = process.env.REACT_APP_BACKEND_URL;

export const unAuthenticatedPostRequest = async (route, body, navigate, text) => {
  const toastId = toast.loading("Loading...")
  console.log(process.env.REACT_APP_UPLOAD_PRESET)
  try{
    const response = await axios.post(URL+route, body)
    console.log("Authentication Done!")
    toast.dismiss(toastId)
    text === "login" ? (navigate('/home/playlistsPage')) : (navigate('/login'))
    return response
  } catch(err){
    console.log(err)
    console.log("Error while Authentication!")
  }
  toast.dismiss(toastId)
}