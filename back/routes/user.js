const express = require("express");
const brcypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");

const db = require("../models");

router.post("/", async (req, res, next) => {
  const { id, password, name } = req.body;
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: id
      }
    });
    if (exUser) {
      return res.status(403).send("이미 가입된 아이디입니다.");
    }

    const encodedPasspord = await brcypt.hash(password, 12);
    const newUser = await db.User.create({
      userId: id,
      userPw: encodedPasspord,
      name
    });
    return res.status(200).json(newUser);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(403).send(info.reason);
    }

    return req.login(user, async local => {
      try {
        const fullUser = await db.User.findOne({
          userId: user.id
        });
        return res.json(fullUser);
      } catch (err) {
        console.error(err);
        return next(err);
      }
    });
  })(req, res, next);
});

module.exports = router;
