const localStrategy = require('passport-local').Strategy
const User = require('../models/User')
const bcrypt = require('bcryptjs')

//https://www.faqcode4u.com/faq/61648/display-passport-js-authentication-error-message-in-view

module.exports = function(passport) {
    passport.use(new localStrategy ( {
        username: 'email',
        password: 'password'
  },
    
        function(username, password, done) {
      
        User.findOne ({email: username}, function(err, user) {
       
            if(err) console.log(err)

            if(!user) {
                return done (null, false, {message: 'no user found'})
            }

            bcrypt.compare(password, user.password, function(err, isMatch){
                if(err) console.log(err)
                if(isMatch){
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Wrong password.'})
                }
            })
        })
    }))


    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });

}