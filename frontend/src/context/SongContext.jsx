import { createContext } from "react";

const SongContext = createContext({
  currentSong:null,
  setCurrentSong:(createSong) => {},
  currentPlaylist:null,
  setCurrentPlaylist:(createPlaylist) => {},
  currentModal:false,
  setCurrentModal:() => {},
  playlistOpen:false,
  setPlaylistOpen:() => {}
})

export default SongContext