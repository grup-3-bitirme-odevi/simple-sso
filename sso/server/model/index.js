const config = require('../config/databaseConfig');
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
	config.DB,
	config.USER,
	config.PASSWORD, {
		host: config.HOST,
		dialect: config.dialect,
		operatorsAliases: false,

		pool: {
			max: config.pool.max,
			min: config.pool.min,
			acquire: config.pool.acquire,
			idle: config.pool.idle

		}
	}
);

sequelize.authenticate()
.then(() => {
	console.log('connect')
})
.catch(() => {
	console.log('Error'+err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./User')(sequelize, DataTypes)
db.url = require('./Url')(sequelize, DataTypes)
db.token = require('./Token')(sequelize, DataTypes)

db.sequelize.sync({ force:false })
.then(() => {
	console.log('success baba')
})

module.exports = db;