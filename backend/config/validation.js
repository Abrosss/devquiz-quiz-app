const Joi = require('joi');
const jwt = require('jsonwebtoken');
const secret = '12345645'; // Replace with your own secret key
const registerValidation =(data, confirm_password) =>{
    const schema = Joi.object({
        username:Joi.string().min(6),
        password:Joi.string().min(6).required(),
        confirm_password: Joi.any().valid(Joi.ref('password')).required().messages({
            "any.only" : "Password must match"
          }),
    }).with('password', 'confirm_password');
    return schema.validate(data, confirm_password);
  
}

const loginValidation =(data) =>{
    const schema = Joi.object({
        username:Joi.string().required(),
        password:Joi.string().required()
    })
    return schema.validate(data);
  
}
const PasswordValidation =(data) =>{
    const schema = Joi.object({
        password:Joi.string().min(6)
    })
    return schema.validate(data);
  
}


function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader)
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secret, (err, user) => {
        console.log(user)
      if (err) {
        return res.status(403).send('Invalid or expired token');
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send('Unauthorized');
  }
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.PasswordValidation = PasswordValidation
module.exports.verifyToken = verifyToken;