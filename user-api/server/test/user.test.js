

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists
} = require('sequelize-test-helpers')

const UserModel = require('../model/User')

describe('users', () => {

    // Check our db model table name
    describe('models/user - Table Name Check', () => {
        const Comm = UserModel(sequelize, dataTypes)
        checkModelName(Comm)('user')
    })

    // Check table properties
    describe('models/Communications - Properties Check', () => {
        const Comm = UserModel(sequelize, dataTypes)
        const instance = new Comm()
            ;['id', 'username', 'user_name', 'user_surname', 'user_password','user_email','user_type'].forEach(
                checkPropertyExists(instance)
                
            )
    })

})