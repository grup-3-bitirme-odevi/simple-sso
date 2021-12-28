require('dotenv').config()
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.ENV_DB_NAME, process.env.ENV_DB_USER, process.env.ENV_DB_PASS, {
  host: process.env.ENV_DB_HOST,
  dialect: process.env.ENV_DB_DIALECT,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connection Success");
  })
  .catch(() => {
    console.log("DB Connection Fail");
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User")(sequelize, DataTypes);
db.url = require("./Url")(sequelize, DataTypes);
db.token = require("./Token")(sequelize, DataTypes);
db.log = require("./Log")(sequelize, DataTypes);

db.sequelize.sync({ force: false });

module.exports = db;
