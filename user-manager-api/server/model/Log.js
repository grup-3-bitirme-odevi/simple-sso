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
  
  // Logger::  ::1 - - [27/Dec/2021:09:52:56 +0000] "GET /validate HTTP/1.1" 200 18 "-" "PostmanRuntime/7.28.4"
  // Module: sso-auth :  Date :
  