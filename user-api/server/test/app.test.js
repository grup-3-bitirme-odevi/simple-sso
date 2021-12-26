const chai = require("chai");
const chaiHttp = require("chai-http");
const { response } = require("express");
const expect = chai.expect
const db = require("../model");
const axios = require("axios")

const User = db.user;
 
const should = chai.should();
 
chai.use(chaiHttp);
 

const server = require("../app")

describe("Appcontoller", async() => {
     before(async function () {
          const res=await axios.post('http://localhost:3100?redirectURL=http://localhost:3020', {
          username:"admin",
          password:"123456",
          pass_hash:true
      }, {
        }).then(res =>{ return res})
        const token = res.data.access_token
          console.log("************token something before each test************");
          global.token=token
       });
        
     it("Post Create user", done => {
          chai.request(server).post("/users")
          .send({
                       username: 'test',
                       user_name: 'test',
                       user_surname: 'test',
                       user_password: 'test',
                       user_email: 'test@test.test',
                       user_type: 'admin',
                       pass_hash:true,
                     })
          .set("Authorization", "Bearer " + token)
               .end((error, res) => {
                    console.log(res.body.stat)
                expect(res.body.stat).to.be.equal('success')
                   done()});
               
                   
             expect()
                //    response.should.have.text({"stat":"success"})

     });
     it("Put Update user", async done => {    
     const user = await User.findOne({where: {username:'test'}});
     const user_id = user.dataValues.id
        chai.request(server).put(`/users/${user_id}`)
        .send({
                     username: 'test',
                     user_name: 'test2',
                     user_surname: 'test2',
                     user_password: '',
                     user_email: 'test2@test.test',
                     user_type: 'admin',
                     pass_hash:true,
                   })
        .set("Authorization", "Bearer " + token)
             .end((error, res) => {
               console.log(res.body.stat)
                  expect(res.body.stat).to.be.equal('success')
                 done()});
   });

   it("Delete user", async done => {
     const user = await User.findOne({where: {username:'test'}});
     const user_id = user.dataValues.id 
    chai.request(server).delete(`/users/${user_id}`)
    .set("Authorization", "Bearer " + token)
         .end((error, res) => {
              console.log(res.body.stat)
          expect(res.body.stat).to.be.equal('success')
             done()});
});

it("Get list users", done => {
    chai.request(server).get("/users")
    .set("Authorization", "Bearer " + token)
         .end((error, res) => {
          console.log(res.body.stat)
              expect(res.body.stat).to.be.equal('success')
             done()});
});
});



