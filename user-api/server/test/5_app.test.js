const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect
const db = require("../model");
const axios = require("axios")
const User = db.user;
chai.use(chaiHttp);
const server = require("../app")

describe("Appcontoller", async () => {
     before(async function () {
          const res = await axios.post('http://localhost:3100?redirectURL=http://localhost:3020', {
               username: "admin",
               password: "123456",
               pass_hash: true
          }, {
          }).then(res => { return res })
          const token = res.data.access_token
          console.log("************token something before each test************");
          global.token = token
     });

     it("Post Create user", done => {
          chai.request(server).post("/users")
               .send({
                    username: 'test',
                    user_name: 'test',
                    user_surname: 'test',
                    user_password: 'test',
                    user_email: 'teasta@test.test',
                    user_type: 'admin',
                    pass_hash: true,
               })
               .set("Authorization", "Bearer " + token)
               .end((error, res) => {
                    console.log(res.body.message)
                    expect(res.body.stat).to.be.equal('success')
                    done()
               });
     });
     it("Put Update user", async () => {
          const user = await User.findOne({ where: { username: 'test' } });
          const user_id = user.dataValues.id
          chai.request(server).put(`/users/${user_id}`)
               .send({
                    username: "user",
                    user_name: "John",
                    user_surname: "Doe",
                    user_password: "",
                    user_email: "user@mail.com",
                    user_type: "user",
                    pass_hash: true
               })
               .set("Authorization", "Bearer " + token)
               .end((error, res) => {
                    console.log(res.body.message)
                    expect(res.body.stat).to.be.equal('success')
               });
     });

     it("Delete user", async () => {
          const user = await User.findOne({ where: { username: 'test' } });
          const user_id = user.dataValues.id
          chai.request(server).delete(`/users/${user_id}`)
               .set("Authorization", "Bearer " + token)
               .end((error, res) => {
                    console.log(res.body.message)
                    expect(res.body.stat).to.be.equal('success')
               });
     });

     it("Get list users", () => {
          chai.request(server).get("/users")
               .set("Authorization", "Bearer " + token)
               .end((error, res) => {
                    console.log(res.body.message)
                    expect(res.body.stat).to.be.equal('success')
               });
     });

     it("When using missing username", done => {
          chai.request(server).post("/users")
               .send({
                    username: '',
                    user_name: 'test1',
                    user_surname: 'test1',
                    user_password: 'test1',
                    user_email: 'test21@test.test',
                    user_type: 'admin',
                    pass_hash: true,
               })
               .set("Authorization", "Bearer " + token)
               .end((error, res) => {
                    console.log(res.body.message)
                    expect(res.body.stat).to.be.equal('fail')
                    done()
               });
     });

     it("When using missing user_name", done => {
          chai.request(server).post("/users")
               .send({
                    username: 'test2',
                    user_name: '',
                    user_surname: 'test2',
                    user_password: 'test2',
                    user_email: 'test21@test.test',
                    user_type: 'admin',
                    pass_hash: true,
               })
               .set("Authorization", "Bearer " + token)
               .end((error, res) => {
                    console.log(res.body.message)
                    expect(res.body.stat).to.be.equal('fail')
                    done()
               });
     });

     it("When using missing user_surname", done => {
          chai.request(server).post("/users")
               .send({
                    username: 'test3',
                    user_name: 'test3',
                    user_surname: '',
                    user_password: 'test3',
                    user_email: 'test21@test.test',
                    user_type: 'admin',
                    pass_hash: true,
               })
               .set("Authorization", "Bearer " + token)
               .end((error, res) => {
                    console.log(res.body.message)
                    expect(res.body.stat).to.be.equal('fail')
                    done()
               });
     });

     it("When using missing user_email", done => {
          chai.request(server).post("/users")
               .send({
                    username: 'test4',
                    user_name: 'test4',
                    user_surname: 'test4',
                    user_password: 'test4',
                    user_email: '',
                    user_type: 'admin',
                    pass_hash: true,
               })
               .set("Authorization", "Bearer " + token)
               .end((error, res) => {
                    console.log(res.body.message)
                    expect(res.body.stat).to.be.equal('fail')
                    done()
               });
     });

     it("When username is same", done => {
          chai.request(server).post("/users")
               .send({
                    username: 'admin',
                    user_name: 'TEST',
                    user_surname: 'TEST',
                    user_password: 'TEST',
                    user_email: 'TEST4@TEST.TEST',
                    user_type: 'admin',
                    pass_hash: true,
               })
               .set("Authorization", "Bearer " + token)
               .end((error, res) => {
                    console.log(res.body.message)
                    expect(res.body.stat).to.be.equal('fail')
                    done()
               });
     });

     it("When email is same", done => {
          chai.request(server).post("/users")
               .send({
                    username: 'test123456',
                    user_name: 'test45',
                    user_surname: 'test45',
                    user_password: 'test45',
                    user_email: 'admin@email.com',
                    user_type: 'admin',
                    pass_hash: true,
               })
               .set("Authorization", "Bearer " + token)
               .end((error, res) => {
                    console.log(res.body.message)
                    expect(res.body.stat).to.be.equal('fail')
                    done()
               });
     });

     it("Try to delete non-existent username", async () => {

          chai.request(server).delete(`/users/95965965652`)
               .set("Authorization", "Bearer " + token)
               .end((error, res) => {
                    console.log(res.body.message)
                    expect(res.body.stat).to.be.equal('fail')
               });
     });

     it("Try to update non-existent username", async () => {
          chai.request(server).put(`/users/5`)
               .send({
                    username: "user",
                    user_name: "John",
                    user_surname: "Doe",
                    user_password: "",
                    user_email: "user@mail.com",
                    user_type: "user",
                    pass_hash: true
               })
               .set("Authorization", "Bearer " + token)
               .end((error, res) => {
                    console.log(res.body.message)
                    expect(res.body.stat).to.be.equal('fail')
               });
     });

     it("When using missing username for update", done => {
          chai.request(server).post("/users")
               .send({
                    username: '',
                    user_name: 'test1',
                    user_surname: 'test1',
                    user_password: 'test1',
                    user_email: 'test21@test.test',
                    user_type: 'admin',
                    pass_hash: true,
               })
               .set("Authorization", "Bearer " + token)
               .end((error, res) => {
                    console.log(res.body.message)
                    expect(res.body.stat).to.be.equal('fail')
                    done()
               });
     });

     it("When using missing user_name for update", done => {
          chai.request(server).post("/users")
               .send({
                    username: 'test2',
                    user_name: '',
                    user_surname: 'test2',
                    user_password: 'test2',
                    user_email: 'test21@test.test',
                    user_type: 'admin',
                    pass_hash: true,
               })
               .set("Authorization", "Bearer " + token)
               .end((error, res) => {
                    console.log(res.body.message)
                    expect(res.body.stat).to.be.equal('fail')
                    done()
               });
     });

     it("When using missing user_surname for update", done => {
          chai.request(server).post("/users")
               .send({
                    username: 'test3',
                    user_name: 'test3',
                    user_surname: '',
                    user_password: 'test3',
                    user_email: 'test21@test.test',
                    user_type: 'admin',
                    pass_hash: true,
               })
               .set("Authorization", "Bearer " + token)
               .end((error, res) => {
                    console.log(res.body.message)
                    expect(res.body.stat).to.be.equal('fail')
                    done()
               });
     });

     it("When using missing user_email for update", done => {
          chai.request(server).post("/users")
               .send({
                    username: 'test4',
                    user_name: 'test4',
                    user_surname: 'test4',
                    user_password: 'test4',
                    user_email: '',
                    user_type: 'admin',
                    pass_hash: true,
               })
               .set("Authorization", "Bearer " + token)
               .end((error, res) => {
                    console.log(res.body.message)
                    expect(res.body.stat).to.be.equal('fail')
                    done()
               });
     });

     it("When using missing user_type for update", done => {
          chai.request(server).post("/users")
               .send({
                    username: 'test4',
                    user_name: 'test4',
                    user_surname: 'test4',
                    user_password: 'test4',
                    user_email: 'test4',
                    user_type: '',
                    pass_hash: true,
               })
               .set("Authorization", "Bearer " + token)
               .end((error, res) => {
                    console.log(res.body.message)
                    expect(res.body.stat).to.be.equal('fail')
                    done()
               });
     });

});






















