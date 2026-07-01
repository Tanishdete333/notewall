// const express = require("express");
// const noteModel = require("./models/note.model");
// const cors = require("cors");
// const { clerkMiddleware, requireAuth } = require("@clerk/express");
// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use(clerkMiddleware());

// app.post("/notes", async (req, res) => {
//   const data = req.body;
//   await noteModel.create({
//     text: data.text,
//     color: data.color,
//     userId: req.auth.userId,
//   });
//   res.status(201).json({
//     message: "note created successfully",
//   });
// });

// app.get("/notes", async (req, res) => {
//   const notes = await noteModel
//     .find({ userId: req.auth.userId })
//     .sort({ createdAt: -1 });
//   res.status(200).json({
//     message: "Note Feetched Successfully",
//     notes: notes,
//   });
// });

// app.delete("/notes/:id", async (req, res) => {
//   const deletenote = await noteModel.findOneAndDelete({
//     _id: req.params.id,
//     userId: req.auth.userId,
//   });
//   if (!deletenote) {
//     return res.status(404).json({ message: "Note not found" });
//   }
//   res.status(200).json({
//     message: "Note deleted Successfully",
//   });
// });

// module.exports = app;
const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");
const { clerkMiddleware, getAuth } = require("@clerk/express");
const app = express();
app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());

function requireUser(req, res, next) {
  const { isAuthenticated, userId } = getAuth(req);
  if (!isAuthenticated) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  req.userId = userId;
  next();
}

app.post("/notes", requireUser, async (req, res) => {
  const data = req.body;
  const note = await noteModel.create({
    text: data.text,
    color: data.color,
    userId: req.userId,
  });
  res.status(201).json({
    message: "note created successfully",
    note,
  });
});

app.get("/notes", requireUser, async (req, res) => {
  const notes = await noteModel
    .find({ userId: req.userId })
    .sort({ createdAt: -1 });
  res.status(200).json({
    message: "Note Feetched Successfully",
    notes: notes,
  });
});

app.delete("/notes/:id", requireUser, async (req, res) => {
  const deletenote = await noteModel.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId,
  });
  if (!deletenote) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.status(200).json({
    message: "Note deleted Successfully",
  });
});

module.exports = app;
