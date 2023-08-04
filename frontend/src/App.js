import { Toaster } from 'react-hot-toast';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { useCookies } from 'react-cookie';
import DefaultPage from './components/DefaultPage';
import UploadSong from './components/UploadSong';
import PlaylistCardPage from './components/PlaylistCardPage';
import MyMusic from './components/sidebarPages/MyMusic';
import SongContext from './context/SongContext';
import { useState } from 'react';
import SongFooter from './components/common/SongFooter';
import Library from './components/sidebarPages/Library';
import Search from './components/sidebarPages/Search';
import LikedSongs from './components/sidebarPages/LikedSongs';
import CreatePlaylist from './components/sidebarPages/CreatePlaylist';
import Model from './components/common/Model';

function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [currentModal, setCurrentModal] = useState(false);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  return (
    <div className='w-screen h-screen relative'>
      <Toaster />
      <BrowserRouter>
        {
          cookie.token ? (
            <SongContext.Provider value={{ currentSong, setCurrentSong, currentModal, setCurrentModal, playlistOpen, setPlaylistOpen, currentPlaylist, setCurrentPlaylist }}>
              <Routes>
                <Route path='/' element={<DefaultPage />} />
                <Route path='/home' element={<HomePage />} >
                  <Route path='/home/uploadSong' element={<UploadSong />} />
                  <Route path='/home/playlistsPage' element={<PlaylistCardPage />} />
                  <Route path='/home/myMusic' element={<MyMusic />} />
                  <Route path='/home/myLibrary' element={<Library />} />
                  <Route path='/home/search' element={<Search />} />
                  <Route path='/home/likedSongs' element={<LikedSongs />} />
                  <Route path='/home/createPlaylist' element={<CreatePlaylist />} />
                </Route>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/model' element={<Model />} />
                <Route path='/*' element={<Navigate to='/home' />} />
              </Routes>
              {
                currentSong && (<SongFooter />) 
              }
            </SongContext.Provider>
          ) :
          (
            <>
            <Routes>
              <Route path='/' element={<DefaultPage />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/*' element={<Navigate to='/login' />} />
            </Routes>
              <SongFooter />
            </>
          )
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
