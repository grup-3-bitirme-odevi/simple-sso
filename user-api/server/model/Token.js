module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    "token",
    {
      id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
      },
      ip: {
        type: DataTypes.STRING(16),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ttl: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );

  return Token;
};
