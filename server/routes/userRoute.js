
const express = require("express")
const { Register, Login, Logout, getOtherUsers } = require("../controllers/userController")
const isAuthenticated = require("../middlewares/isAuthenticated")
const router = express.Router()

 
router.post("/register",Register)
router.post("/login", Login)
router.get("/logout",isAuthenticated, Logout)
router.get("/",isAuthenticated,getOtherUsers)


module.exports=router

