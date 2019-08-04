const express = require("express");

const db = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middleware");

const router = express.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const io = req.app.get("io");

    const { text } = req.body;

    const newRoom = await db.Room.create({
      name: text,
      master: req.user.id
    });
    if (newRoom) {
      io.of("/room").emit("make_room_success", newRoom);
    }
    res.json(newRoom);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const io = req.app.get("io");

    const room = await db.Room.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!room) {
      return res.status(404).send("해당 채팅방이 존재하지 않습니다.");
    }
    await db.Room.destroy({
      where: {
        id: req.params.id
      }
    });
    io.of("/room").emit("remove_room_success", req.params.id);
    res.send(req.params.id);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
