const Song = require("../models/Song");
const User = require("../models/User");

exports.createSong = async (req, res) => {
	try {
		const { name, thumbnail, track } = req.body;
		console.log("Testing");
		console.log(req.user);
		const artist = req.user._id;
		if (!name || !thumbnail || !track || !artist) {
			return res.status(400).json({
				success: false,
				message: "Please fill all the details for your Song",
			});
		}
		const songDetails = await Song.create({ name, thumbnail, track, artist });
		console.log("Song created!");
		return res.status(201).json({
			success: true,
			message: "Song created!",
			songDetails,
		});
	} catch (err) {
		console.log("Error while creating song");
		return res.status(500).json({
			success: false,
			message: "Error while creating song!",
		});
	}
};

exports.getMySongs = async (req, res) => {
	try {
		const artist = req.user._id;
		if (!artist) {
			return res.status(400).json({
				success: false,
				message: "Please Login first!",
			});
		}
		const songsDetails = await Song.find({ artist: artist }).populate("artist");
		console.log("Fetched all my songs");
		return res.status(201).json({
			success: true,
			message: "Fetched all my songs",
			songsDetails,
		});
	} catch (err) {
		console.log("Error while getMySongs");
		return res.status(500).json({
			success: false,
			message: "Error while getMySongs!",
		});
	}
};

exports.getLikedSongs = async (req, res) => {
	try {
		const userId = req.user._id;
		if (!userId) {
			return res.status(400).json({
				success: false,
				message: "Please Login first!",
			});
		}
		const songsDetails = await User.find({ _id:userId }).populate("likedSongs");
		return res.status(201).json({
			success: true,
			message: "Fetched all Liked songs",
			songsDetails,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "Error while getLikedSongs!",
		});
	}
};

exports.getAllSongsOfSpecificArtist = async (req, res) => {
	try {
		const { artistId } = req.params;
		if (!artistId) {
			return res.status(400).json({
				success: false,
				message: "Please give the artist name",
			});
		}
		const artist = await User.findOne({ _id: artistId });
		if (!artist) {
			return res.status(409).json({
				success: false,
				message: `Artist doesn't exist with id ${artistId}`,
			});
		}
		const song = await Song.find({ artist: artistId });
		return res.status(201).json({
			success: true,
			message: "Fetched all songs of artist",
			song,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "Error while fetching all songs of artist!",
		});
	}
};

exports.getSongByName = async (req, res) => {
	try {
		const { songName } = req.params;
		if (!songName) {
			return res.status(400).json({
				success: false,
				message: "Please give the song name",
			});
		}
		const song = await Song.findOne({ name: { $regex: new RegExp(songName, 'i') } }).populate("artist");
		if (!song) {
			return res.status(201).json({
				success: true,
				message: "No sound found with this name",
				song,
			});
		}
		return res.status(201).json({
			success: true,
			message: `Fetched Song-${songName}`,
			song,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "Error while fetching song",
		});
	}
};

exports.likeSong = async (req, res) => {
	try{
		const currentUser = req.user._id;
		const songId = req.body._id;
		const user = await User.findOne({ _id: currentUser }).populate("likedSongs");
		if (!user) {
			return res.status(300).json({
				success: false,
				message: `User doesn't exist`,
			});
		}
		const song = await Song.findOne({ _id: songId });
		if (!song) {
			return res.status(305).json({
				success: false,
				message: "Not a valid song id",
				user,
			});
		}
		if(user.likedSongs.some(likedSong => likedSong._id.equals(songId))){
			user.likedSongs = user.likedSongs.filter(likedSong => !likedSong._id.equals(songId));
			await user.save();
			return res.status(201).json({
				success: true,
				message: "UnLiked song",
				user
			});
		}
		user.likedSongs.push(songId);
		await user.save();
		return res.status(201).json({
			success: true,
			message: "Liked song",
			user
		});
	}	catch(err){
		return res.status(500).json({
			success: false,
			message: "Error while Liking/UnLiking song",
		});
	}
}

exports.getMyLikedSongs = async (req, res) => {
	try{
		const user = req.user._id;
		if (!user) {
			return res.status(300).json({
				success: false,
				message: `User doesn't exist`,
			});
		}
		const userDetails = await User.findOne({ _id: user }).populate("likedSongs");
		const songs = userDetails.likedSongs;
		return res.status(201).json({
			success: true,
			message: "Liked song",
			songs
		});
	}	catch(err){
		return res.status(500).json({
			success: false,
			message: "Error while fetching liked songs",
		});
	}
}

// exports.likeSong = async (req, res) => {
// 	try {
// 		const currentUser = req.user._id;
// 		const songId = req.body._id;
// 		const user = await User.findOne({ _id: currentUser }).populate("likedSongs");
// 		if (!user) {
// 			return res.status(300).json({
// 				success: false,
// 				message: `User doesn't exist`,
// 			});
// 		}
// 		const song = await Song.findOne({ _id: songId });
//     console.log(song)
// 		if (!song) {
// 			return res.status(305).json({
// 				success: false,
// 				message: "Not a valid song id",
// 				user,
// 			});
// 		}
//     if (user.likedSongs.includes(songId)) {
//       console.log("Song already liked by the user");
//       return res.status(409).json({
//         success: false,
//         message: "Song already liked by the user",
//         user,
//       });
//     }
// 		user.likedSongs.push(songId);
// 		await user.save();
// 		console.log("Song Liked");
// 		return res.status(201).json({
// 			success: true,
// 			message: `Song Liked`,
// 			user,
// 		});
// 	} catch (err) {
// 		console.log("Error while Liking song");
// 		return res.status(500).json({
// 			success: false,
// 			message: "Error while Liking song",
// 		});
// 	}
// };

exports.unLikeSong = async (req, res) => {
	try {
		const currentUser = req.user._id;
		const songId = req.body._id;
		const user = await User.findOne({ _id: currentUser }).populate("likedSongs");
		if (!user) {
			return res.status(300).json({
				success: false,
				message: `User doesn't exist`,
			});
		}
		const song = await Song.findOne({ _id: songId });
		if (!song) {
			return res.status(305).json({
				success: false,
				message: "Not a valid song id",
				user,
			});
		}
		if (!user.likedSongs.includes(songId)) {
      return res.status(400).json({
        success: false,
        message: "Song not liked by the user",
      });
    }
    user.likedSongs = user.likedSongs.filter((song) => song !== songId);
    console.log(updatedLikedSongs)
    user.likedSongs = updatedLikedSongs;
    await user.save();
		console.log("Song unLiked");
		return res.status(201).json({
			success: true,
			message: `Song unLiked`,
			user,
		});
	} catch (err) {
		console.log("Error while unLiking song");
		return res.status(500).json({
			success: false,
			message: "Error while unLiking song",
		});
	}
};

