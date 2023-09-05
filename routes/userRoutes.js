const express = require('express');
const { register,login,getprofile,logout } = require('../controllers/userController');
const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/profile",getprofile)
router.post("/logout",logout)

module.exports=router