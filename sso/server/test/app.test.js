const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect
chai.use(chaiHttp);
const server = require("../app")

describe("SSO contoller", async () => {
    // before(function( done ) {
    //     server.listen(3100, function(err) {
    //         done(err);
    //     })
    // });
    
    // afterAll(function( done ) {
    //     server.close(function(err) {
    //         done(err);
    //     });
    // });
    
    it("Post isAuthorized", done => {
        chai.request(server).post("?redirectURL=http://localhost:3020")
            .send({
                username: "admin",
                password: "123456",
                pass_hash: true
            })
            .end((error, res) => {
                console.log(res.body.stat)
                const token = res.body.access_token
                global.token = token

            
                expect(res.status).to.be.equal(200)
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8')
                expect(res.body.stat).to.be.equal('success')
                expect(res.body.message).to.be.equal('login success')
                expect(res.body.access_token).to.be.equal(token)

                done()
            });
    });
    it("Get isAccessTokenValid", done => {
        chai.request(server).get("/validate")
            .set("Authorization", "Bearer " + token)
            .end(function (err, res) {
                console.log(res.body.stat)
                expect(res.status).to.be.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8')
                expect(res.body.stat).to.be.equal('success')
                done()
            });
    });
});

describe("SSO negative contoller", async () => {

it("When using wrong url ", done => {
    chai.request(server).post("?redirectURL=")
        .send({
            username: "admin",
            password: "123456",
            pass_hash: true
        })
        .end((error, res) => { 
            console.log("Redirect URL is reqiured.")       
            expect(res.status).to.be.equal(409)
            expect(res.headers['content-type']).to.equal('application/json; charset=utf-8')
            expect(res.body.stat).to.be.equal('fail')

            done()
        });
});

it("When password does not match", done => {
    chai.request(server).post("?redirectURL=http://localhost:3020")
        .send({
            username: "admin",
            password: "123456",
            pass_hash: false && null
        })
        .end((error, res) => { 
            console.log("Password not match.")       
            expect(res.status).to.be.equal(409)
            expect(res.headers['content-type']).to.equal('application/json; charset=utf-8')
            expect(res.body.stat).to.be.equal('fail')

            done()
        });
});

it("When using missing username & password", done => {
    chai.request(server).post("?redirectURL=http://localhost:3020")
        .send({
            username: "",
            password: "",
            pass_hash: true
        })
        .end((error, res) => { 
            console.log("All inputs are required.")       
            expect(res.status).to.be.equal(409)
            expect(res.headers['content-type']).to.equal('application/json; charset=utf-8')
            expect(res.body.stat).to.be.equal('fail')

            done()
        });
});

it("Whe username is wrong ", done => {
    chai.request(server).post("?redirectURL=http://localhost:3020")
        .send({
            username: "admin1",
            password: "123456",
            pass_hash: true
        })
        .end((error, res) => { 
            console.log("User not found.")       
            expect(res.status).to.be.equal(409)
            expect(res.headers['content-type']).to.equal('application/json; charset=utf-8')
            expect(res.body.stat).to.be.equal('fail')

            done()
        });
});

it("When the password does not match", done => {
    chai.request(server).post("?redirectURL=http://localhost:3020")
        .send({
            username: "admin",
            password: "12345",
            pass_hash: true
        })
        .end((error, res) => { 
            console.log("Password not match.")       
            expect(res.status).to.be.equal(409)
            expect(res.headers['content-type']).to.equal('application/json; charset=utf-8')
            expect(res.body.stat).to.be.equal('fail')

            done()
        });
});


it("When regex does not match", done => {
    chai.request(server).post("?redirectURL=http://localhost:3020/test")
        .send({
            username: "admin",
            password: "123456",
            pass_hash: true
        })
        .end((error, res) => { 
            console.log("You are not authorized.")       
            expect(res.status).to.be.equal(409)
            expect(res.headers['content-type']).to.equal('application/json; charset=utf-8')
            expect(res.body.stat).to.be.equal('fail')

            done()
        });
});
it("When wrong bearer", done => {
    chai.request(server).get("/validate")
    .set("Authorization" + token)
        .end(function (err, res) {
            console.log(res.body.message)
            console.log(res.status)
            expect(res.status).to.be.equal(409);
            expect(res.headers['content-type']).to.equal('application/json; charset=utf-8')
            expect(res.body.stat).to.be.equal('fail')
            done()
        });
});

it("When token does not match", done => {
    chai.request(server).get("/validate")
    .set("Authorization", "Bearer " + token + "a")
        .end(function (err, res) {
            console.log("Token not found.")
            expect(res.status).to.be.equal(409);
            expect(res.headers['content-type']).to.equal('application/json; charset=utf-8')
            expect(res.body.stat).to.be.equal('fail')
            done()
        });
});

it("When there is no token", done => {
    chai.request(server).get("/validate")
        .end(function (err, res) {
            console.log("Token input required.")
            expect(res.status).to.be.equal(409);
            expect(res.headers['content-type']).to.equal('application/json; charset=utf-8')
            expect(res.body.stat).to.be.equal('fail')
            done()
        });
});
});