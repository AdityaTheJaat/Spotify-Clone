const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  userName:{
    type:String,
    required:true
  },
  displayPicture:{
    type:String,
  },
  likedSongs:[{
    // type:String,
    // default:""
    type:mongoose.Schema.Types.ObjectId,
    ref:"Song"
  }],
  likedPlaylist:[{
    type:String,
    default:""
  }],
  subscribedArtist:[{
    type:String,
    default:""
  }]
})

module.exports = mongoose.model("User", userSchema)