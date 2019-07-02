const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const expressSession = require("express-session");
const dotenv = require("dotenv");

const userRouter = require("./routes/user");

const db = require("./models");
db.sequelize.sync();

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true, // 자바스크립트에서 쿠키게 접근 못함
      secure: false // https쓸때 true
    },
    name: "pyh"
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);

app.listen(3060, () => {
  console.log("server is running on 3000");
});
