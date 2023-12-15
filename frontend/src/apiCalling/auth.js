import axios from "axios"
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast"

const URL = process.env.REACT_APP_BACKEND_URL;

export const unAuthenticatedPostRequest = async (route, body, navigate, text) => {
  const toastId = toast.loading("Loading...")
  try{
    const response = await axios.post(URL+route, body)
    console.log("Authentication Done!")
    toast.dismiss(toastId)
    if(text === "login"){
      localStorage.setItem("firstName", response.data.userToReturn.firstName);
      localStorage.setItem("lastName", response.data.userToReturn.lastName);
      localStorage.setItem("emailId", response.data.userToReturn.email);
      localStorage.setItem("displayPicture", response.data.userToReturn.displayPicture);
    }
    text === "login" ? (navigate('/home/playlistsPage')) : (navigate('/login'))
    return response
  } catch(err){
    console.log(err)
    console.log("Error while Authentication!")
    toast.dismiss(toastId)
    toast.error(err.response.data.message)
  }
}

export const logout = async () => {
  const toastId = toast.loading("Loading...")
  // const [cookie, setCookie] = useCookies(["token"]);
  try{
    // await axios.post(URL + '/auth/logout')
    // toast.success('Logged Out Successfully')
    // toast.dismiss(toastId)
    // setCookie(null);
    //window.location="/login";
  } catch(err){
    console.log(err)
    console.log("Error while Logging Out!")
  }
  toast.dismiss(toastId)
}