import axios from "axios"
import { toast } from "react-hot-toast"

const URL = process.env.REACT_APP_BACKEND_URL;

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

export const logout = async () => {
  const toastId = toast.loading("Loading...")
  try{
    await axios.post(URL + '/auth/logout')
    toast.success('Logged Out Successfully')
    toast.dismiss(toastId)
    //window.location="/login";
  } catch(err){
    console.log(err)
    console.log("Error while Logging Out!")
  }
  toast.dismiss(toastId)
}