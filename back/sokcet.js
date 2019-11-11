const socketIo = require("socket.io");

module.exports = (server, app) => {
  const io = socketIo(server);

  app.set("io", io);
  const room = io.of("/room");
  const chat = io.of("/chat");

  room.on("connect", socket => {
    console.log("room 네임스페이스 연결 성공", socket.id);
    socket.on("disconnect", () => {
      console.log("room 네임스페이스 연결 해제", socket.id);
    });

    socket.on("enter_room_request", room => {
      socket.join(room.id);
      socket.emit("enter_room_success", room);
    });

    socket.on("out_room_request", room => {
      socket.leave(room.id);
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
