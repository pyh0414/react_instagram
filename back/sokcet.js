const socketIo = require("socket.io");
const axios = require("axios");
const passportSocketIo = require("passport.socketio");
const session = require("express-session");
const mysqlStore = require("connect-mysql")(session);

module.exports = (server, app, sessionMiddleware) => {
  const io = socketIo(server);

  // const sessionMiddleware = session({
  //   resave: false,
  //   saveUninitialized: false,
  //   secret: "process.env.COOKIE_SECRET",
  //   cookie: {
  //     httpOnly: true, // 자바스크립트에서 쿠키게 접근 못함
  //     secure: false // https쓸때 true
  //   }
  // });

  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  app.set("io", io);
  const room = io.of("/room");
  const chat = io.of("/chat");

  room.on("connect", socket => {
    console.log("room 네임스페이스 연결 성공", socket.id);
    socket.on("disconnect", () => {
      console.log("room 네임스페이스 연결 해제", socket.id);
    });

    socket.on("enter_room_request", room => {
      console.log("enter_room_request", socket.id);
      socket.join(room.data.room.id);
      socket.emit("enter_room_success", room);
    });

    socket.on("out_room_request", roomId => {
      console.log("out_room_request", socket.id);
      socket.leave(roomId);
      socket.emit("out_room_success");
    });
  });

  chat.on("connect", socket => {
    console.log("chat 네임스페이스 연결 성공", socket.id);
    socket.on("disconnect", () => {
      console.log("chat 네임스페이스 연결 해제", socket.id);
    });
  });
};
