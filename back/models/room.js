module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      master: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );

  Room.associate = db => {
    db.Room.belongsToMany(db.User, { through: "RoomUser" });
    db.Room.hasMany(db.Chat);
  };

  return Room;
};
