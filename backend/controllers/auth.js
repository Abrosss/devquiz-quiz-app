const passport = require("passport");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const {registerValidation, loginValidation, verifyToken} = require('../config/validation')



const createToken = user => {
  console.log(user)
  // Sign the JWT
  return jwt.sign(
    {
      _id: user._id,
      isAdmin: user.isAdmin,
    },
    "12345645",
    { algorithm: 'HS256', expiresIn: '1h' }
  );
};

exports.postLogin = (req, res, next) => {
  const {error} = loginValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  passport.authenticate("local", (err, user, info) => {
 
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(400).send("No user found")
   
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      
      const token = createToken(req.user)
      res.json({
        token:token,
        username:req.user.username,
        isAdmin:req.user.isAdmin,
        id:req.user._id,
      })
  

    });
  })(req, res, next);
};

exports.postSignup = async (req, res) => {
  console.log(req.body)
     const {error} = registerValidation(req.body, req.body.confirm_password)

     if(error) return res.status(400).send(error.details[0].message)
   
       
 
      //check if username exists

      const usernameExists = await User.findOne({username:req.body.username})
      if(usernameExists) 
       return res.status(400).send('Create a unique username')

     
     
     //HASH THE PW
 
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
 
      //CREATE USER
     
      let user = new User({
       username:req.body.username, 
       password:hashPassword,
        isAdmin: false

   })

            //SAVE USER
     try{
       const savedUser = await user.save()
       res.status(200).send(req.user)
   } catch(err){
       res.status(400).send(err)
   }
};

