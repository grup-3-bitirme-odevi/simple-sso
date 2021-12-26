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
        type: DataTypes.TEXT,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ttl: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
       }
      }
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );

  return Token;
};
