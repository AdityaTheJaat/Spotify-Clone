import React from "react";
import home from "../resources/home.svg";
import download from "../resources/download.svg";
import upload from "../resources/upload.svg";
import user from "../resources/user.svg";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
	const location = useLocation();
	const matchRoute = (route) => {
		return matchPath({ path: route }, location.pathname);
	};
	const [cookie, setCookie] = useCookies(["token"]);
	return (
		<div className="flex justify-between p-2 text-white bg-[#131618]">
			<div className="flex items-center justify-center">
				<Link
					to='/home/playlistsPage'
					className={`flex text-white hover:text-white items-center p-3`}>
					<img src={home} alt="" className="h-9 w-9" />
				</Link>
			</div>
			{cookie.token ? (
				<div className="text-sm font-semibold flex justify-center items-center gap-5">
					<Link
						to="/home"
						className="bg-white text-black rounded-3xl px-7 py-2">
						Explore Premium
					</Link>
					<Link
						to="/"
						className="flex gap-2 bg-slate-700 rounded-3xl px-7 py-2">
						<img src={download} alt="" className="w-5" />
						<p>Install App</p>
					</Link>
					<div className="bg-slate-500 text-black w-[1px]">n</div>
					{matchRoute("/home/uploadSong") ? (
						<Link
							to="/home/playlistsPage"
							className="flex bg-slate-700 rounded-3xl px-7 py-2">
							<p>Back to Home</p>
						</Link>
					) : (
						<Link
							to="/home/uploadSong"
							className="flex gap-2 bg-slate-700 rounded-3xl px-7 py-2">
							<img src={upload} alt="" className="w-5" />
							<p>Upload Song</p>
						</Link>
					)}
					<Link
						to="/home/myProfile"
						className="bg-white rounded-full text-black flex justify-center items-center text-lg cursor-pointer h-10 w-10"
					>
						<img src={user} alt="" />
					</Link>
				</div>
			) : (
				<div className="text-lg font-semibold flex justify-center items-center gap-5">
					<Link to="/signup" className="">
						Sign up
					</Link>
					<Link
						to="/login"
						className="bg-white text-black rounded-3xl px-7 py-2">
						Log in
					</Link>
				</div>
			)}
		</div>
	);
};

export default Navbar;
