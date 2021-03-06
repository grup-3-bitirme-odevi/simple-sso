const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists
} = require('sequelize-test-helpers')

const LogModel = require('../model/Log')

describe('Log Check', () => {

    // Check our db model table name
    describe('models/Log - Table Name Check', () => {
        const Comm = LogModel(sequelize, dataTypes)
        checkModelName(Comm)('log')
    })

    // Check table properties
    describe('models/Log - Properties Check', () => {
        const Comm = LogModel(sequelize, dataTypes)
        const instance = new Comm()
            ;['id', 'module', 'ip', 'method', 'url', 'status', 'res_length', 'res_ms'].forEach(
                checkPropertyExists(instance)

            )
    })

})