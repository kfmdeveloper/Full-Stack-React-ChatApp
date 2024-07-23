const express = require("express")
const MsgContoller = require("../controllers/messageController")
const isAuthenticated = require("../middlewares/isAuthenticated")
const MsgRouter = express.Router()

MsgRouter.post("/send/:id",isAuthenticated,MsgContoller.SendMessage)
MsgRouter.get("/:id",isAuthenticated,MsgContoller.getMessage)
module.exports = MsgRouter