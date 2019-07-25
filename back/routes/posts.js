const express = require("express");
const router = express();

const { isLoggedIn, isNotLoggedIn } = require("./middleware");

const db = require("../models");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const mainPosts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          attributes: ["userId", "profile"]
        },
        {
          model: db.Image,
          attributes: ["src"]
        },
        {
          model: db.User,
          through: "Like",
          as: "Likers",
          attributes: ["id"]
        }
      ],
      order: [["createdAt", "desc"]]
    });
    res.json(mainPosts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
