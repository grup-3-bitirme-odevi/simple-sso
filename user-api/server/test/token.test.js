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




//  const expect = require("chai");
// const tokenModel = require("../user-api/server/model/Token");

// const {
//   sequelize,
//   dataTypes,
//   checkPropertyExists,
// } = require("sequelize-test-helpers");

// describe("/user-api/server/model/Token", () => {
//   const Token = tokenModel(sequelize, dataTypes)
//   const token = new Token()

//   context("properties", () => {
//     ["ip", "url","token", "ttl", "user_id"].forEach(checkPropertyExists(token));
//   });
// })




// const controller = require("../user-api/server/controller/appController");
// var httpMocks = require('node-mocks-http');
// const SequelizeMock = require('sequelize-mock');
// const db = require("../model");
// const { Sequelize, DataTypes } = require("sequelize");


// Sahte bir kullanıcı oluşturduk.
// jest.mock('../user-api/server/model/User', () => {
//   const dbMock = new SequelizeMock();
//   return dbMock.define('createUser', {
//     username: 'Koray123',
//     user_name: 'Koray',
//     user_surname: 'Koray Sarıoglu',
//     user_password: '12345',
//     user_email: 'koray@gmail.com',
//     user_type: 'user'
//   })
// });

// Bu kullanıcıyı yaratmaya çalıştık.
// describe('Create User', () => {
//   it('Done', () => {
//       var req = httpMocks.createRequest({
//           params: {
//             username: 'Koray'
//           }
//       });

//       var res = httpMocks.createResponse();

//       controller.createUser(req, res).then(function(createUser) {
//           expect(username).toEqual('Koray123');
//           expect(user_name).toEqual('Koray')
//           expect(user_surname).toEqual('Koray Sarıoglu')
//           expect(user_password).toEqual('12345')
//           expect(user_email).toEqual('koray@gmail.com')
//           expect(user_type).toEqual('user')

//       })
//   });

// });




// const { expect } = require('chai')

// const {
//   sequelize,
//   dataTypes,
//   checkModelName,
//   checkPropertyExists
// } = require('sequelize-test-helpers')

// const UrlModel = require('../user-api/server/model/Url')

// describe('users', () => {

//     Check our db model table name
//     describe('models/user - Table Name Check', () => {
//         const Comm = UrlModel(sequelize, dataTypes)
//         checkModelName(Comm)('url')
//     })

//     Check table properties
//     describe('models/Communications - Properties Check', () => {
//         const Comm = UserModel(sequelize, dataTypes)
//         const instance = new Comm()
//             ;['id', 'username', 'user_name', 'user_surname', 'user_password','user_email','user_type'].forEach(
//                 checkPropertyExists(instance)
//             )
//     })