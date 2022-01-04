module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define(
    "log",
    {
      id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
      },
      module: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      ip: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      method: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      res_length: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      res_ms: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      createdAt: true,
      updatedAt: false,
    }
  );

  return Log;
};
