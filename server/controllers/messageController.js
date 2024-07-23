const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const SendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const recieverId = req.params.id;

    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });
    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      recieverId,
      message,
    });
    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }
    const reciever = await User.findById({ _id: recieverId });
    await gotConversation.save();

    res.status(200).json({
      success: true,
      message: `You sent a message to ${reciever.fullName}`,
      newMessage,
    });
    //SOCKET IO
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const recieverId = req.params.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(401).json({
        message: "Not messages yet!",
        success: false,
      });
    }
    return res.status(200).json(conversation?.messages);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  SendMessage,
  getMessage,
};
