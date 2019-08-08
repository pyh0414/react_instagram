const express = require("express");

const db = require("../models");
const { isLoggedIn } = require("./middleware");

const router = express.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const io = req.app.get("io");

    const newRoom = await db.Room.create({
      name: req.body.roomName,
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

router.post("/:id/enter", isLoggedIn, async (req, res, next) => {
  try {
    const room = await db.Room.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.Chat,
          attributes: ["content", "userId", "id"],
          include: [{ model: db.User, attributes: ["profile"] }]
        }
      ],
      order: [[db.Chat, "id", "asc"]]
    });

    const user = await db.User.findOne({
      where: {
        id: req.user.id
      }
    });

    if (room && user) {
      await user.addRoomName(room);
      return res.status(200).json({ room });
    }
    return res.status(404).send("방 입장에 실패했습니다");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/:id/out", isLoggedIn, async (req, res, next) => {
  try {
    const room = await db.Room.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!room) {
      res.status(404).send("방이 존재하지 않습니다");
    }
    await room.removeUserInRoom(req.user.id);
    res.json({
      userId: req.user.id
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/:id/chat", isLoggedIn, async (req, res, next) => {
  try {
    const io = req.app.get("io");

    const { content } = req.body;
    const room = db.Room.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!room) {
      return res.status(404).send("해당 방이 없습니다.");
    }

    await db.Chat.create({
      content,
      RoomId: req.params.id,
      UserId: req.user.id
    }).then(() => {
      io.of("/room")
        .to(req.params.id)
        .emit("send_message_success", { content, userId: req.user.id });
    });
    res.json({ roomId: req.params.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
