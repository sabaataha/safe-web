const mongoose = require("mongoose");
const Gameroom = require('../models/Gameroom');

// const Gameroom = mongoose.model("Gameroom");

exports.createGameroom = async (req, res) => {
  const { pin } = req.body;

  const pinRegex = /^[1-9]+$/;

  if (!pinRegex.test(pin)) throw "Gameroom name can contain only numerics characters.";

  const chatroomExists = await Gameroom.findOne({ pin });

  if (chatroomExists) throw "Gameroom with that name already exists!";

  const chatroom = new Gameroom({
    pin,
  });

  await chatroom.save();

  res.json({
    message: "Gameroom created!",
  });
};

exports.getAllGamerooms = async (req, res) => {
  const gamerooms = await Gameroom.find({});

  res.json(chatrooms);
};