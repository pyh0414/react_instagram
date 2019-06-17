module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      userPw: {
        type: DataTypes.STRING(100), // 100글자 이하
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );

  User.associate = db => {
    db.User.hasMany(db.Poast, { as: "Posts" });
    db.User.hasMany(db.Comment);
  };

  return User;
};
