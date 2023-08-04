const express = require('express')
const router = express.Router()
const { createSong, getMySongs, getAllSongsOfSpecificArtist, getSongByName, likeSong, unLikeSong, getLikedSongs } = require('../controllers/Song')
const passport = require('passport')

router.post('/createSong', passport.authenticate("jwt", {session:false}), createSong)
router.post('/likeSong', passport.authenticate("jwt", {session:false}), likeSong)
router.post('/unLikeSong', passport.authenticate("jwt", {session:false}), unLikeSong)
router.get('/getMySongs', passport.authenticate("jwt", {session:false}), getMySongs)
router.get('/getLikedSongs', passport.authenticate("jwt", {session:false}), getLikedSongs)
router.get('/getAllSongsOfSpecificArtist/:artistId', passport.authenticate("jwt", {session:false}), getAllSongsOfSpecificArtist)
router.get('/getSongByName/:songName', passport.authenticate("jwt", {session:false}), getSongByName)

module.exports = router