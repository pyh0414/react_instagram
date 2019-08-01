module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    "Chat",
    {
      content: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );

  Chat.associate = db => {
    db.Chat.belongsTo(db.Room);
  };

  return Chat;
};
