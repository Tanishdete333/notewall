const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    enum: ["yellow", "pink", "blue", "green"],
    default: "yellow",
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const noteModel = mongoose.model("note", noteSchema);
module.exports = noteModel;
