const passport = require("passport");
const db = require("../models");
const local = require("./localStrategy");

module.exports = () => {
  passport.serializeUser((user, done) => {
    // localStrategy의 done으로 넘어온 값
    console.log("serialzable");
    return done(null, user.userId);
  });
  passport.deserializeUser(async (id, done) => {
    // id는 serializeUser에서 done의 두번째 값
    console.log("deserialzable");
    try {
      const user = await db.User.findOne({
        where: {
          userId: id
        }
      });
      return done(null, user); // req.user에 저장
    } catch (err) {
      console.error(err);
      return done(err);
    }
  });
  local();
};
