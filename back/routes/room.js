const express = require("express");

const db = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middleware");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const io = req.app.get("io");

    const { text } = req.body;

    const newRoom = await db.Room.create({
      name: text,
      master: req.user.id
    });
    if (newRoom) {
      io.of("/room").emit("room_make_success", newRoom);
    }
    res.json(newRoom);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
module.exports = router;
