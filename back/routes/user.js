const express = require("express");
const brcypt = require("bcrypt");
const passport = require("passport");
const multer = require("multer");

const router = express.Router();
const db = require("../models");

const { isLoggedIn, isNotLoggedIn } = require("./middleware");

const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, done) {
      done(null, "uploads/");
    },
    filename: function(req, file, done) {
      const fileName = file.originalname.replace(/ /gi, ""); // 공백제거
      const extension = fileName.slice(-4); // 확장자
      const baseName = fileName.slice(0, -4); // 확장자 제거된 파일명
      done(null, baseName + new Date().valueOf() + extension);
    }
  })
});

router.post("/", async (req, res, next) => {
  const { id, password, name, profileImage } = req.body;
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
      name,
      profile: profileImage
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

    return req.login(user, async () => {
      try {
        // 로그인 성공했을 때 로직 처리
        const fullUser = await db.User.findOne({
          where: {
            userId: user.userId
          }
        });

        return res.json(fullUser);
      } catch (err) {
        console.error(err);
        return next(err);
      }
    });
  })(req, res, next);
});

router.get("/check", async (req, res, next) => {
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.query.userId
      }
    });
    if (exUser) {
      return res.status(200).json(exUser);
    }
    return res.status(204).json(null);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.post("/image", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.json(req.file.filename);
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("로그아웃 성공");
});

module.exports = router;
