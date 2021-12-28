require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  process.env.ENV_DB_NAME,
  process.env.ENV_DB_USER,
  process.env.ENV_DB_PASS,
  {
    host: process.env.ENV_DB_HOST,
    dialect: process.env.ENV_DB_DIALECT,
    logging: false,
  }
);

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

db.sequelize.sync({ 
  force: false 
}).then(() => {
  console.log(`Database & tables created!`);
});

db.sequelize.query("DROP PROCEDURE IF EXISTS createUser;");
db.sequelize.query("DROP PROCEDURE IF EXISTS updateUser;");
db.sequelize.query("DROP PROCEDURE IF EXISTS deleteUser;");
db.sequelize.query("DROP PROCEDURE IF EXISTS getListOfUsers;");

db.sequelize.query(`
CREATE PROCEDURE createUser(
  IN _username VARCHAR(45),
  IN _user_name VARCHAR(45),
  IN _user_surname VARCHAR(45),
  IN _user_password VARCHAR(300),
  IN _user_email VARCHAR(45),
  IN _user_type VARCHAR(45)
  )
  BEGIN
  DECLARE _resId INT;
  INSERT INTO users(username, user_name, user_surname, user_password, user_email, user_type)
  VALUES (_username, _user_name, _user_surname, _user_password, _user_email, _user_type);
  SELECT * FROM users WHERE id = LAST_INSERT_ID();
  END
`);

db.sequelize.query(`
CREATE PROCEDURE updateUser(
  IN _user_id INT,
  IN _username VARCHAR(45),
  IN _user_name VARCHAR(45),
  IN _user_surname VARCHAR(45),
  IN _user_password VARCHAR(300),
  IN _user_email VARCHAR(45),
  IN _user_type VARCHAR(45)
  )
  BEGIN
  UPDATE users 
    SET 
    username=_username, 
    user_name=_user_name, 
    user_surname=_user_surname, 
    user_password= IF(NULLIF(_user_password, '') IS NULL, user_password, _user_password),
    user_email=_user_email,
    user_type=_user_type
  WHERE id=_user_id;
  SELECT * FROM users WHERE id = _user_id;
  END
`);

db.sequelize.query(`
CREATE PROCEDURE deleteUser(
  IN _user_id INT
  )
  BEGIN
  DELETE FROM users WHERE id = _user_id;
  END
`);

db.sequelize.query(`
CREATE PROCEDURE getListOfUsers()
  BEGIN
  SELECT * FROM users;
  END
`);

module.exports = db;
