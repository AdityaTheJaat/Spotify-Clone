import React, { useContext } from "react";
import addToPlaylist from '../../resources/addToPlaylist.svg'
import SongContext from "../../context/SongContext";

const AddToPlaylistBtn = () => {
  const {setCurrentModal} = useContext(SongContext);
  const clickHandler = async () => {
    setCurrentModal(true);
  }
	return (
		<div>
			<button onClick={clickHandler} className="flex-col">
				<img src={addToPlaylist} alt="" className="w-8 h-8 mx-auto" />
				<p className="text-xs">Add to Playlist</p>
			</button>
		</div>
	);
};

export default AddToPlaylistBtn;
