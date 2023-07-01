const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const {verifyToken} = require('../config/validation')
router.post("/signIn", authController.postLogin)
router.post("/signUp", authController.postSignup)
router.post("/google-signup", authController.postGoogleSignup);
router.get('/verifyToken', verifyToken, (req, res) => {
    // If the token is valid, the user object will be available in req.user
    res.send('Token verified');
  });
module.exports = router;
