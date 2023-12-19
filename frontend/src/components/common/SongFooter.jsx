import React, { useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { Howl } from "howler";
import shuffle from "../../resources/shuffle.svg";
import previous from "../../resources/previous.svg";
import bheart from "../../resources/b-heart.svg";
import "./ProgressBar.css";
import next from "../../resources/next.svg";
import repeat from "../../resources/repeat.svg";
import play from "../../resources/play.svg";
import pausee from "../../resources/pause.svg";
import SongContext from "../../context/SongContext";
import AddToPlaylistBtn from "../button/AddToPlaylistBtn";
import { likeSong } from "../../apiCalling/song";

const SongFooter = () => {
	const [cookie, setCookie] = useCookies(["token"]);
	const token = cookie.token;
	const [soundPlayed, setSoundPlayed] = useState(null);
	const [pause, setPause] = useState(false);
	const [progress, setProgress] = useState(0);
	const { currentSong, setCurrentSong } = useContext(SongContext);
	const playSound = () => {
		if (!soundPlayed) {
			return;
		}
		soundPlayed.play();
		setPause(false);
	};
	const changeSound = (songSrc) => {
		if (soundPlayed) {
			soundPlayed.stop();
		}
		let sound = new Howl({
			src: [songSrc],
			html5: true,
		});
		setSoundPlayed(sound);
		sound.play();
		setPause(false);
	};
	const pauseSong = () => {
		soundPlayed.pause();
		setPause(true);
	};
	const clickHandler = async () => {};
	useEffect(() => {
		if (!currentSong) {
			return;
		}
		changeSound(currentSong.track);
	}, [currentSong]);
	if (!currentSong) {
		return;
	}

	const updateProgress = (event) => {
		const newValue = event.target.value;
		setProgress(newValue);
		if (soundPlayed) {
			soundPlayed.seek(soundPlayed.duration() * (newValue / 100));
		}
	};

  const likeHandler = async () => {
		if (currentSong) {
			const response = await likeSong(cookie.token, currentSong);
			if (response) {
				// setIsLiked(true);
			}
		}
	};

	return (
		<div
			className={`w-full flex justify-between items-center h-1/10 p-4 ${
				token
					? "bg-black bg-opacity-80"
					: "bg-gradient-to-r from-[#8d369d] via-[#a55897] to-[#6789a0]"
			} text-white overflow-hidden absolute z-10 bottom-0`}>
			{token ? (
				<div className="w-full flex justify-between items-center h-full ">
					<div className="w-1/4 flex items-center">
						<img
							className="h-14 w-14 rounded"
							src={currentSong.thumbnail}
							alt=""
						/>
						<div className="pl-4">
							<p className="text-sm">{currentSong.name}</p>
							{currentSong.artist ? (
								<p className="text-xs text-gray-500">
									{currentSong.artist.firstName +
										" " +
										currentSong.artist.lastName}
								</p>
							) : (
								<p className="text-xs text-gray-500">
									{currentSong.firstName + " " + currentSong.lastName}
								</p>
							)}
						</div>
					</div>
					<div className="w-1/2 flex flex-col items-center space-y-2 justify-center">
						<div className="flex gap-5 items-center">
							<img
								src={shuffle}
								alt=""
								className="w-7 h-7 opacity-60 cursor-pointer"
							/>
							<img src={previous} alt="" className="w-7 h-7 cursor-pointer" />
							{!pause ? (
								<img
									src={pausee}
									alt=""
									className="w-10 h-10 bg-white rounded-full p-1 cursor-pointer"
									onClick={() => {
										pauseSong();
									}}
								/>
							) : (
								<img
									src={play}
									alt=""
									className="w-10 h-10 bg-white rounded-full p-1 cursor-pointer"
									onClick={() => {
										playSound();
									}}
								/>
							)}
							<img src={next} alt="" className="w-7 h-7 cursor-pointer" />
							<img
								src={repeat}
								alt=""
								className="w-7 h-7 opacity-60 cursor-pointer"
							/>
						</div>
						<div>
							<input
								type="range"
								value={progress}
								onChange={updateProgress}
								className="w-full"
							/>
						</div>
					</div>
					<div className="w-1/4 flex justify-end gap-3 h-full">
						<AddToPlaylistBtn />
						<button onClick={likeHandler}>
							<div className="flex-col cursor-pointer">
								<img src={bheart} alt="" className="w-7 h-7 mx-auto" />
							</div>
							{/* {
            isLiked ? (<div className='flex-col cursor-pointer'>
                        <img src={bheart} alt="" className='w-7 h-7 mx-auto' />
                        <p className="text-xs">Like</p>
                      </div>) : 
                      (<div className='flex-col cursor-pointer'>
                      <img src={wheart} alt="" className='w-7 h-7 mx-auto flex my-auto' />
                      <p className="text-xs">Unlike</p>
                    </div>)
          } */}
						</button>
					</div>
				</div>
			) : (
				<div className="w-full flex justify-between items-center h-1/10 p-2">
					<div className="flex flex-col  justify-center">
						<p className="">PREVIEW OF SPOTIFY</p>
						<p>
							Sign up to get unlimited songs and podcasts with occasional ads.
							No credit card needed.
						</p>
					</div>
					<div>
						<Link
							to="/signup"
							className="bg-white text-black rounded-3xl px-7 py-2">
							Sign up for free
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default SongFooter;
