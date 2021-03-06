const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "id", // req.body의 값
        passwordField: "password"
      },
      async (userId, password, done) => {
        // done에서 넘긴 값은 serializable의 매개변수로 받음
        try {
          const user = await db.User.findOne({ where: { userId } });

          if (!user) {
            return done(null, false, { reason: "존재하지 않는 사용자입니다!" });
          }
          const result = await bcrypt.compare(password, user.userPw);
          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: "비밀번호가 틀립니다." });
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};
