const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

const TokenModel = require('../model/Token')

describe('Token Check', () => {
  const Token = TokenModel(sequelize, dataTypes)
  const token = new Token()

  checkModelName(Token)('token')

  describe('properties', () => {
    ;['id', 'ip', 'url', 'token', 'ttl', 'user_id'].forEach(checkPropertyExists(token))
  })
})