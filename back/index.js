const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv");

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const roomRouter = require("./routes/room");
const roomsRouter = require("./routes/rooms");

const passportConfig = require("./passport");
const db = require("./models");

const socket = require("./sokcet");
db.sequelize.sync();
dotenv.config();

const app = express();

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: "process.env.COOKIE_SECRET",
  cookie: {
    httpOnly: true, // 자바스크립트에서 쿠키게 접근 못함
    secure: false // https쓸때 true
  }
});
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use("/", express.static("uploads"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/room", roomRouter);
app.use("/rooms", roomsRouter);

const server = app.listen(3060, () => {
  console.log("express server in running on 3060 port");
});

socket(server, app);
