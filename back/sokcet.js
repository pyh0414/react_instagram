const socketIo = require("socket.io");

module.exports = (server, app) => {
  const io = socketIo(server);

  app.set("io", io);
  const room = io.of("/room");
  const chat = io.of("/chat");

  room.on("connect", socket => {
    socket.on("make_room", room => {
      io.of("/room").emit("make_room", room);
    });
  });

  chat.on("connect", () => {});
};
