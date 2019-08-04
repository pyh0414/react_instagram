const express = require("express");
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require("./middleware");

const db = require("../models");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const chatRooms = await db.Room.findAll({ order: [["createdAt", "desc"]] });
    res.json(chatRooms);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
