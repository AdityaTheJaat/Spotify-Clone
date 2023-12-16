const Playlist = require("../models/Playlist");
const Song = require("../models/Song");
const User = require("../models/User");
const ObjectId = require('mongoose').Types.ObjectId;


exports.createPlaylist = async (req, res) => {
  try{
    const currentUser = req.user;
    const { name, thumbnail, songs } = req.body;
    if(!name || !thumbnail ){
      return res.status(302).json({
        success:false,
        message: "Give all details",
      })
    }
    const playlistDetails = await Playlist.create({
      name, thumbnail, songs, owner:currentUser._id, collaborators:[]
    })
    console.log("Playlist created!")
    return res.status(201).json({
      success:true,
      message: "Playlist created!",
      playlistDetails
    })
  } catch(err){
    console.log("Error while creating Playlist")
    return res.status(500).json({
      success:false,
      message: "Error while creating Playlist!"
    })
  }
}

exports.getAllPlaylist = async (req, res) => {
  try{
    const playlists = await Playlist.find({}).populate("owner").populate("songs");
    return res.status(201).json({
      success:true,
      message: "Fetched Playlist",
      playlists
    })
  } catch(err){
    console.log("Error while fetching Playlist")
    return res.status(500).json({
      success:false,
      message: "Error while fetching Playlist!"
    })
  }
}

exports.getPlaylistByMe = async (req, res) => {
  try{
    const artistId = req.user._id;
    const playlistDetails = await Playlist.find({owner:artistId}).populate("owner").populate("songs")
    return res.status(201).json({
      success:true,
      message: "Fetched Playlist",
      playlistDetails
    })
  } catch(err){
    console.log("Error while fetching Playlist")
    return res.status(500).json({
      success:false,
      message: "Error while fetching Playlist!"
    })
  }
}

exports.getPlaylistById = async (req, res) => {
  try{
    const playlistId = req.params.playlistId;
    const playlistDetails = await Playlist.findOne({_id:playlistId}).populate("owner").populate("songs")
    if(!playlistDetails){
      return res.status(302).json({
        success:false,
        message: "Invalid Playlist id",
      })
    }
    console.log("Fetched Playlist")
    return res.status(201).json({
      success:true,
      message: "Fetched Playlist",
      playlistDetails
    })
  } catch(err){
    console.log("Error while fetching Playlist")
    return res.status(500).json({
      success:false,
      message: "Error while fetching Playlist!"
    })
  }
}

exports.getPlaylistOfSpecificArtist = async (req, res) => {
  try{
    const artistId = req.params.artistId;
    const artist = await User.findOne({_id:artistId});
    if(!artist){
      return res.status(400).json({
        success:false,
        message:"No such Artist exist!"
      })
    }
    const playlists = await Playlist.find({owner:artistId}).populate("owner").populate("songs")
    console.log("Fetched Playlist of artist")
    return res.status(201).json({
      success:true,
      message: "Fetched Playlist of artist",
      playlists
    })
  } catch(err){
    console.log("Error while fetching Playlist of artist")
    return res.status(500).json({
      success:false,
      message: "Error while fetching Playlist of artist!"
    })
  }
}

exports.addSongToPlaylist = async (req, res) => {
  try{
    const currentUser = req.user;
    const { playlistId, songId } = req.body;
    const playlist = await Playlist.findOne({_id:playlistId}).populate("owner").populate("songs")
    if(!playlist){
      return res.status(300).json({
        success:false,
        message: `Playlist doesn't exist`,
      })
    }
    const song = await Song.findOne({_id:songId});
    if(!song){
      return res.status(305).json({
        success:false,
        message: "Not a valid song id",
        playlist
      })
    }
    if(!playlist.owner.equals(currentUser._id) && !playlist.collaborators.includes(currentUser._id)){
      return res.status(302).json({
        success:false,
        message: "You can't add the song to this playlist because you are not a owner or collaborators",
        playlist
      })
    }
    if(playlist.songs.includes(songId)){
      return res.status(302).json({
        success:false,
        message: "Song already in the playlist",
        playlist
      })
    }
    console.log("Testing")
    playlist.songs.push(songId);
    await playlist.save();
    console.log("Song added to playlist")
    return res.status(201).json({
      success:true,
      message: `Song added to playlist`,
      playlist
    })
  } catch(err){
    console.log("Error while adding playlist")
    return res.status(500).json({
      success:false,
      message: "Error while adding playlist"
    })
  }
}