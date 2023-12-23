import React from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const MyProfilePage = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const logoutHandler = async () => {
		setCookie("token", "", {path:'/'});
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("emailId");
    localStorage.removeItem("displayPicture");
    navigate('/home/playlistsPage')
	};
  const fn =  localStorage.getItem("firstName");
  const ln =  localStorage.getItem("lastName");
  const ei =  localStorage.getItem("emailId");
  const dp =  localStorage.getItem("displayPicture");
  return (
    <div className='text-white space-y-10 flex-col justify-center mx-auto items-center'>
      <img src={dp} alt='' className='rounded-full w-40 h-40 mt-20 mx-auto' />
      <div className='text-center text-5xl'>
        <p>Name: {fn} {ln} </p>
        <p>Email id: {ei}</p>
      </div>
      <button onClick={logoutHandler} className="bg-white ml-[500px] text-black rounded-3xl text-xl px-9 py-3">Logout</button>
    </div>
  )
}

export default MyProfilePage