import React from 'react'
import logo from '../resources/logo.svg'
import home from '../resources/home.svg'
import search from '../resources/search.svg'
import library from '../resources/library.svg'
import like from '../resources/like.svg'
import add from '../resources/add.svg'
import music from '../resources/music.svg'
import globe from '../resources/globe.svg'
import { Link, matchPath, useLocation } from 'react-router-dom'

const sideBar = [
  {
    id:1,
    name: "Home",
    iconName:home,
    linkTo:"/home/playlistsPage"
  },
  {
    id:2,
    name: "Search",
    iconName:search,
    linkTo:"/home/search"
  },
  {
    id:3,
    name: "Your Library",
    iconName:library,
    linkTo:"/home/myLibrary"
  },
  {
    id:4,
    name: "My Music",
    iconName:music,
    linkTo:"/home/myMusic"
  },
  {
    id:5,
    name: "Create Playlist",
    iconName:add,
    linkTo:"/home/createPlaylist"
  },
  // {
  //   id:6,
  //   name: "Liked Songs",
  //   iconName:like,
  //   linkTo:"/home/likedSongs"
  // },
]

const Sidebar = () => {
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({path:route}, location.pathname)
  }
  return (
    <div className='h-full w-[23%] bg-[#131618] rounded-xl flex flex-col justify-between p-3'>
        <div >
          <div className='p-6'>
            <img src={logo} alt="Spotify" width={125} />
          </div>
          {
            sideBar.map((btn)=>(
              <Link to={btn.linkTo} key={btn.id} className={`flex ${matchRoute(btn.linkTo) ? "text-white" : "text-slate-400" } ${btn.id === 3 ? "mb-10" : ""} hover:text-white items-center gap-3 p-6`}>
                <img src={btn.iconName} alt='' className='h-9 w-9' />
                <p className='font-semibold'>{btn.name}</p>
              </Link>
            ))
          }
        </div>
        <button className='text-white border-gray-500 ml-7 mb-20 w-[40%] hover:border-white hover:scale-105 transition-all flex items-center justify-center gap-3 border-2 rounded-2xl py-1 px-3'>
          <img src={globe} alt="" className='h-6 w-6' />
          <p className='font-semibold'>English</p>
        </button>
      </div>
  )
}

export default Sidebar