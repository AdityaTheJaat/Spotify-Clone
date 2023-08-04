import axios from "axios"
import { toast } from "react-hot-toast"
import { BACKEND_URL } from "../secrets";

const URL = BACKEND_URL;

export const unAuthenticatedPostRequest = async (route, body, navigate, text) => {
  const toastId = toast.loading("Loading...")
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