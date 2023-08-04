const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('./models/User')
const cors = require("cors");
const authRoutes = require('./routes/auth')
const songRoutes = require('./routes/song')
const playlistRoutes = require('./routes/playlist')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
require('dotenv').config();

const app = express()
app.use(cors({
  origin:"https://spotify-clone-frontend-puce.vercel.app",
	credentials:true,
}));
app.use(express.json())

app.get('/', (req, res)=> {
  res.send("Hosted Successfully!")
})

//Env imports
const PORT = 8000;
const MONGODB_URL = process.env.MONGODB_URL;
const SECRET_KEY = process.env.SECRET_KEY;

//MongoDB Connection
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{console.log("MongoDB Connected!")})
.catch((err)=>{console.error(`Error connecting to MongoDB ${err}`)});

//Passport Setup
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = SECRET_KEY
//New Approach and Correct one
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({_id: jwt_payload.identifier });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

app.use('/auth', authRoutes);
app.use('/songs', songRoutes)
app.use('/playlist', playlistRoutes)

//Server Running
app.listen(PORT, () => {
  console.log("Server Running:", PORT);
})
