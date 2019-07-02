const passport = require("passport");
const db = require("../models");
const local = require("./localStrategy");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("serialzable");
    return done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    console.log("deserialzable");
    try {
      const user = await db.User.findOne({
        where: {
          userId: id
        }
      });
      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(err);
    }
  });
  local();
};
