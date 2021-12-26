const controller = require("../user-api/server/controller/appController");
var httpMocks = require('node-mocks-http');
const SequelizeMock = require('sequelize-mock');
const db = require("../model");
const { Sequelize, DataTypes } = require("sequelize");


// Sahte bir kullanıcı oluşturduk.
jest.mock('../user-api/server/model/User', () => {
  const dbMock = new SequelizeMock();
  return dbMock.define('createUser', {
    username: 'Koray123',
    user_name: 'Koray',
    user_surname: 'Koray Sarıoglu',
    user_password: '12345',
    user_email: 'koray@gmail.com',
    user_type: 'user'
  })
});

// Bu kullanıcıyı yaratmaya çalıştık.
describe('Create User', () => {
  it('Done', () => {
      var req = httpMocks.createRequest({
          params: {
            username: 'Koray'
          }
      });

      var res = httpMocks.createResponse();

      controller.createUser(req, res).then(function(createUser) {
          expect(username).toEqual('Koray123');
          expect(user_name).toEqual('Koray')
          expect(user_surname).toEqual('Koray Sarıoglu')
          expect(user_password).toEqual('12345')
          expect(user_email).toEqual('koray@gmail.com')
          expect(user_type).toEqual('user')

      })
  });

});
























/*

test('CreateUser check', async () => {
  const data = await controller.createUser();
  expect(data).not.toBeNull();
});

test('DeleteUser check', async () => {
  const data = await controller.deleteUser();
  expect(data).not.toBeNull();
});

test('updateUser check', async () => {
  const data = await updateUser();
  expect(data).not.toBeNull();
});

test('updateUser check', async () => {
  const data = await getListOfUsers();
  expect(data).not.toBeNull();
});


/*
username: req.body.username,
user_name: req.body.user_name,
user_surname: req.body.user_surname,
user_password: req.body.user_password,
user_email: req.body.user_email,
user_type: req.body.user_type,

*/




/* var expect = require('chai')
var sinon  = require('sinon');
const fullUrl = require("../user-api/server/middleware/appMiddleware");

describe('should return a 200', function(done) {

      it('should return a function(req, res, next)', function() {
        expect(Response.statusCode).to.be.a.Function;
      });
  

    })
    */