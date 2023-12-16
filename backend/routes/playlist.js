const express = require('express')
const router = express.Router()
const { createPlaylist, getPlaylistById, getPlaylistOfSpecificArtist, addSongToPlaylist, getPlaylistByMe, getAllPlaylist } = require('../controllers/Playlist')
const passport = require('passport')

router.post('/createPlaylist', passport.authenticate("jwt", {session:false}), createPlaylist)
router.get('/getPlaylistByPlaylistId/:playlistId', passport.authenticate("jwt", {session:false}), getPlaylistById)
router.get('/getPlaylistByMe', passport.authenticate("jwt", {session:false}), getPlaylistByMe)
router.get('/getAllPlaylist', getAllPlaylist)
router.get('/getPlaylistByArtistId/:artistId', passport.authenticate("jwt", {session:false}), getPlaylistOfSpecificArtist)
router.post('/addSongToPlaylist', passport.authenticate("jwt", {session:false}), addSongToPlaylist)

module.exports = router