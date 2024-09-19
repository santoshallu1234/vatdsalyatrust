// controllers/chatController.js
const Chat = require('../models/chatModel');

// Send message
exports.sendMessage = async (req, res) => {
  const { roomId, sender, message } = req.body;

  try {
    const chat = await Chat.findOne({ roomId });

    if (chat) {
      // Add new message to existing chat
      chat.messages.push({ sender, message });
      await chat.save();
    } else {
      // Create a new chat if it doesn't exist
      const newChat = new Chat({
        roomId,
        messages: [{ sender, message }],
      });
      await newChat.save();
    }

    res.status(200).json({ msg: 'Message sent' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get messages by room ID
exports.getMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const chat = await Chat.findOne({ roomId });
    if (!chat) return res.status(404).json({ msg: 'Chat not found' });

    res.status(200).json(chat.messages);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};
