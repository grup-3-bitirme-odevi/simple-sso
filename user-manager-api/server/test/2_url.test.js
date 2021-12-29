

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

const UrlModel = require('../model/url')

describe('Url Check', () => {
  const Url = UrlModel(sequelize, dataTypes)
  const url= new Url()

  checkModelName(Url)('url')

  describe('properties', () => {
    ;['id','url'].forEach(checkPropertyExists(url))
  })
})
